import { IUser } from "@/shared/interfaces";

export interface ILoginInput {
  email: string;
  password: string;
}

export interface IRegisterInput {
  name: string;
  email: string;
  password: string;
}

export interface ITokens {
  access: string;
  refresh: string;
}

export interface IJwtPayload extends IUser {}
