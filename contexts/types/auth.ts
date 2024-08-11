export type SignInRequestType = {
  _id?: string;
  phoneNumber: string;
};

export type SignInResponseType = {
  access_token: string;
};

export type SignUpRequestType = {
  _id?: string;
  phoneNumber: string;
  name: string;
  gender: "M" | "F" | "O";
  birthDate: string;
};

export type AuthenticationFunctions = {
  signIn?: (phoneNo: string) => Promise<void>;
  signOut?: () => Promise<void>;
  signUp?: (
    phoneNo: string,
    nickname: string,
    birthdate: Date,
    gender: "M" | "F" | "O"
  ) => Promise<void>;
};

export type AuthenticationType = {
  nickname?: string | null;
  phoneNo?: string | null;
  token?: string | null;
  gender?: "M" | "F" | "O";
  birthDate?: Date;
  status: "success" | "loading" | "failed" | "no_user";
} & AuthenticationFunctions;
