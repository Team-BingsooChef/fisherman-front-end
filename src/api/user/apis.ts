import { api } from "../../config/axios";

import { CoinQueryResponseBody, UserInfoQueryResponseBody } from "./types";

export async function queryCoin(
  userId: number
): Promise<CoinQueryResponseBody> {
  const res = await api.get(`/users/${userId}/coins`);
  return res.data;
}

export function deleteUser(userId: number): Promise<void> {
  return api.delete(`/users/${userId}`);
}

export async function queryUserInfo(
  userId: number
): Promise<UserInfoQueryResponseBody> {
  const res = await api.get(`/users/${userId}`);
  return res.data;
}

export async function getUserId(): Promise<number> {
  const res = await api.get(`/users/heath_check`);
  return res.data;
}

export interface ChangePasswordRequest {
  originPassword: string;
  newPassword: string;
}

export function changePassword(
  userId: number,
  req: ChangePasswordRequest
): Promise<void> {
  return api.patch(`/users/${userId}/password`, req);
}

export function changeNickName(
  userId: number,
  nickname: string
): Promise<void> {
  return api.patch(`/users/${userId}/nickname`, { nickname });
}
