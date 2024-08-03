import { mockUser } from "@/mocks/user";
import { createContext, useState, type PropsWithChildren } from "react";
import { AuthenticationType } from "./types/auth";

const initialAuthValue: AuthenticationType = {
  nickname: null,
  phoneNo: null,
  token: null,
  gender: "others",
  status: "none",
};

export const AuthContext = createContext<AuthenticationType>(initialAuthValue);

export function AuthProvider({ children }: PropsWithChildren) {
  const [authState, setAuthState] = useState<AuthenticationType>({
    ...initialAuthValue,
  });

  const signInFn = async (phoneNo: string) => {
    const url = "";

    _retrieveData({ ...mockUser, phoneNo: phoneNo });
    if (process.env.EXPO_PUBLIC_ENV === "MOCK") {
      setAuthState((prevState) => ({ ...prevState, status: "none" }));
      return;
    }
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNo: phoneNo,
        }),
      });
      const data = await response.json();

      _retrieveData(data);
      setAuthState((prevState) => ({ ...prevState, status: "no_user" }));
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
    gender: "male" | "female" | "others"
  ) => {
    const url = "";
    console.log(
      `phoneNo = ${phoneNo}, nickname = ${nickname}, birthdate = ${birthdate.toDateString()}, gender = ${gender}`
    );
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
        status: "none",
      }));
      return;
    }
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNo: phoneNo,
          nickname: nickname,
          birthdate: birthdate,
          gender: gender,
        }),
      });
      const data = await response.json();

      _retrieveData(data);
      setAuthState((prevState) => ({ ...prevState, status: "none" }));
    } catch (e) {
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
    await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${authState.token}`,
      },
    });
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
