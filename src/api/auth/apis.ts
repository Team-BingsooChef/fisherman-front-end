import { api } from "../../config/axios";

import { EmailCodeSendRequestBody, EmailSignUpRequestBody } from "./types";

export function getEmailCode(req: EmailCodeSendRequestBody): Promise<void> {
  return api.post(`/auth/email`, req);
}

export function sendEmailCode(
  auth_code: string,
  req: EmailCodeSendRequestBody
): Promise<void> {
  return api.post(`/auth/email/verify`, req, {
    params: { auth_code },
  });
}

export function signUpEmail(req: EmailSignUpRequestBody): Promise<void> {
  return api.post(`/users/sing-up`, req);
}
