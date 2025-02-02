export interface EmailCodeGetResponseBody {
  email: string;
}
export interface EmailCodeSendRequestBody {
  email: string;
}

export interface EmailCodeSendResponseBody {
  email: string;
}

export interface SignUpRequestBody {
  email: string;
  password: string;
  nickname: string;
}

export interface SignInRequestBody {
  email: string;
  password: string;
}
