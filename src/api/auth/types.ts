export interface EmailCodeSendRequest {
  email: string;
}

export interface EmailSignUpRequest {
  email: string;
  password: string;
  nickname: string;
}

export interface EmailSignInRequest {
  email: string;
  password: string;
}

export interface EmailSignInResponse {
  freshUser: boolean;
}
