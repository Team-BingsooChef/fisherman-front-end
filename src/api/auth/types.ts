export interface EmailCodeSendRequestBody {
  email: string;
}

export interface EmailSignUpRequestBody {
  email: string;
  password: string;
  nickname: string;
}

export interface EmailSignInRequestBody {
  email: string;
  password: string;
}
