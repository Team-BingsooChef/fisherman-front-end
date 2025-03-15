import { api } from "../../config/axios";

import {
  EmailCodeSendRequest,
  EmailSignUpRequest,
  EmailSignInRequest,
} from "./types";
import { AxiosError } from "axios";

export function getEmailCode(req: EmailCodeSendRequest): Promise<void> {
  return api.post(`/auth/email`, req);
}

export function verifyEmailCode(
  auth_code: string,
  req: EmailCodeSendRequest
): Promise<void> {
  return api.post(`/auth/email/verify`, req, {
    params: { auth_code },
  });
}

export function signUpEmail(req: EmailSignUpRequest): Promise<void> {
  return api.post(`/users/sign-up`, req);
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export async function emailLogin(req: EmailSignInRequest): Promise<void> {
  const formData = new FormData();
  formData.append("email", req.email);
  formData.append("password", req.password);

  try {
    const res = await api.post("/login", formData, {
      headers: { "Content-Type": "multipart/form-data" },

      maxRedirects: 0,
    });

    // console.log(res.headers);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // console.error("로그인 실패:", error);
    // console.log("err", error);
    // console.log(JSON.stringify(error));
    if (error.response && error.response.data && error.response.data.location) {
      console.log("location", error.response.data.location);
      window.location = error.response.data.location; // 서버에서 제공한 로그인 URL로 이동
    } else {
      return Promise.reject(error);
    }
    if (error instanceof AxiosError) {
      console.log("-----");
      console.log(error.response?.headers["location"]);
    }

    console.log(error);
    throw error;
  }
}
