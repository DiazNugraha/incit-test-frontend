export interface SignInPayload {
  email: string;
  password: string;
}

export interface SignUpPayload {
  name: string;
  email: string;
  password: string;
  retypePassword: string;
}
