import { api } from "../../config/axios";

import {
  EmailCodeSendRequest,
  EmailSignUpRequest,
  EmailSignInRequest,
} from "./types";

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
  return api.post(`/users/sing-up`, req);
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export async function emailLogin(
  req: EmailSignInRequest
): Promise<LoginResponse> {
  const formData = new FormData();
  formData.append("email", req.email);
  formData.append("password", req.password);

  const res = await api.post("/api/login", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
}
