import { createContext, useState, type PropsWithChildren } from "react";
import {
  AuthenticationType,
  SignInRequestType,
  SignUpRequestType,
} from "./types/auth";
import { decodeToken } from "react-jwt";

const initialAuthValue: AuthenticationType = {
  nickname: null,
  phoneNo: null,
  token: null,
  gender: "M",
  status: "success",
};

const baseUrl: string = process.env.EXPO_PUBLIC_URL ?? "http://localhost:3111:";

export const AuthContext = createContext<AuthenticationType>(initialAuthValue);

export function AuthProvider({ children }: PropsWithChildren) {
  const [authState, setAuthState] = useState<AuthenticationType>({
    ...initialAuthValue,
  });

  const signInFn = async (phoneNo: string) => {
    const url = baseUrl + "/auth/login";

    // _retrieveData({ ...mockUser, phoneNo: phoneNo });
    if (process.env.EXPO_PUBLIC_ENV === "MOCK") {
      setAuthState((prevState) => ({ ...prevState, status: "success" }));
      return;
    }
    try {
      const signInRequest: SignInRequestType = {
        phoneNumber: phoneNo,
      };
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signInRequest),
      });
      const data = await response.json();
      const token = data.data.access_token;
      console.log(data);
      const decodedData = decodeToken<SignUpRequestType>(token);

      setAuthState({
        phoneNo: phoneNo,
        nickname: decodedData?.name,
        gender: decodedData?.gender,
        birthDate: new Date(decodedData?.birthDate ?? ""),
        token: token,
        status: "success",
      });
      console.log(authState);
    } catch (e) {
      console.error("error: " + e);

      setAuthState((prevState) => {
        return {
          ...prevState,
          token: null,
          phoneNo: null,
          nickname: null,
          status: "no_user",
        };
      });
    }
  };

  const signUpFn = async (
    phoneNo: string,
    nickname: string,
    birthdate: Date,
    gender: "M" | "F" | "O"
  ) => {
    const url = baseUrl + "/auth/signup";
    // console.log(
    //   `phoneNo = ${phoneNo}, nickname = ${nickname}, birthdate = ${birthdate.toDateString()}, gender = ${gender}`
    // );
    if (process.env.EXPO_PUBLIC_ENV === "MOCK") {
      _retrieveData({
        phoneNo,
        nickname,
        birthdate,
        gender,
        token: "test_token",
      });
      setAuthState((prevState) => ({
        ...prevState,
        status: "success",
      }));
      return;
    }
    try {
      const signUpRequest: SignUpRequestType = {
        phoneNumber: phoneNo,
        name: nickname,
        birthDate: birthdate.toDateString(),
        gender: gender,
      };
      console.log(url);
      console.log(signUpRequest);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUpRequest),
      });
      const data = await response.json();
      console.log(data);
      // _retrieveData(data);
      // setAuthState((prevState) => ({ ...prevState, status: "success" }));
    } catch (e) {
      console.log(e);
      setAuthState((prevState) => {
        return {
          ...prevState,
          token: null,
          phoneNo: null,
          nickname: null,
          status: "failed",
        };
      });
    }
  };

  const signOutFn = async () => {
    const url = "";
    setAuthState((prevState) => {
      return { ...prevState, status: "loading" };
    });
    if (process.env.EXPO_PUBLIC_ENV === "MOCK") {
      setAuthState((prevState) => {
        return { ...initialAuthValue };
      });
      return;
    }
    // await fetch(url, {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${authState.token}`,
    //   },
    // });
    setAuthState({ ...initialAuthValue });
  };

  const _retrieveData = (data: any) => {
    setAuthState((prevState) => {
      const finalResult = prevState;
      if (data["token"]) {
        finalResult.token = data["token"];
      }
      if (data["phoneNo"]) {
        finalResult.phoneNo = data["phoneNo"];
      }
      if (data["nickname"]) {
        finalResult.nickname = data["nickname"];
      }
      if (data["birthDate"]) {
        finalResult.birthDate = data["birthDate"];
      }
      if (data["gender"]) {
        finalResult.gender = data["gender"];
      }
      return finalResult;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        signIn: signInFn,
        signUp: signUpFn,
        signOut: signOutFn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
