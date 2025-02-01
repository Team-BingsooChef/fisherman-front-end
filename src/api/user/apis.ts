import { api } from "../../config/axios";

import {
  FishingSpotSearchResponseBody,
  CoinQueryResponseBody,
  UserInfoChangeParams,
  UserInfoChangeRequestBody,
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

export function changeUserInfo(
  userId: number,
  req: UserInfoChangeRequestBody,
  params: UserInfoChangeParams
): Promise<void> {
  return api.patch(`/users/${userId}`, req, { params });
}

export async function queryUserInfo(
  userId: number
): Promise<UserInfoQueryResponseBody> {
  const res = await api.get(`/users/${userId}`);
  return res.data;
}
