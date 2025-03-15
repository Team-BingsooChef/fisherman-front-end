import { api } from "../../config/axios";

import {
  FishingSpotSearchResponseBody,
  CoinQueryResponseBody,
  UserInfoQueryResponseBody,
} from "./types";

export async function searchFishingSpot(
  keyword: string
): Promise<FishingSpotSearchResponseBody> {
  const res = await api.get(`/fishing-spots?keyword=${keyword}`);
  return res.data;
}

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
  const res = await api.get(`/users/mine`);
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
