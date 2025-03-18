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

export async function emailLogin(req: EmailSignInRequest): Promise<void> {
  const formData = new FormData();
  formData.append("email", req.email);
  formData.append("password", req.password);

  try {
    const res = await api.post("/login", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      maxRedirects: 0,
      validateStatus: (status) => status < 400,
    });

    if (res.status === 302) {
      const redirectUrl = res.headers.location;
      if (redirectUrl) {
        window.location.href = redirectUrl;
      }
    }

    return res.data;
  } catch (error) {
    console.error("로그인 요청 실패:", error);
    throw error;
  }
}
