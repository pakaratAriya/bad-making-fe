export type AuthenticationFunctions = {
  signIn?: (phoneNo: string) => Promise<void>;
  signOut?: () => Promise<void>;
  signUp?: (
    phoneNo: string,
    nickname: string,
    birthdate: Date,
    gender: "male" | "female" | "others"
  ) => Promise<void>;
};

export type AuthenticationType = {
  nickname?: string | null;
  phoneNo?: string | null;
  token?: string | null;
  gender?: "male" | "female" | "others";
  birthDate?: Date;
  status: "none" | "loading" | "failed" | "no_user";
} & AuthenticationFunctions;
