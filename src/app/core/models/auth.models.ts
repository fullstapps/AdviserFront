export interface ILogin {
  email: string;
  password: string;
}
export interface ISignup {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
}

export interface ITokenResponse {
  token: string;
}
export interface IProfile {
  email: string;
  first_name: string;
  last_name: string;
  bio: string | null;
  skills: string | null;
}
