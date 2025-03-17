import { api } from "../../config/axios";
import { pageableParams } from "../global/types";

import {
  SmeltsPostRequestBody,
  FishingSpotQueryResponseBody,
  FishingSpotSearchResponseBody,
} from "./types";
export function sendSmelts(
  fishingSpotId: number,
  req: SmeltsPostRequestBody
): Promise<void> {
  return api.post(`/fishing-spots/${fishingSpotId}/smelts`, req);
}

export async function searchFishingSpot(
  keyword: string
): Promise<FishingSpotSearchResponseBody> {
  const res = await api.get(`/fishing-spots`, {
    params: keyword,
  });
  return res.data;
}

export async function queryFishingSpot(
  fishingSpotId: number,
  pageable: pageableParams
): Promise<FishingSpotQueryResponseBody> {
  const res = await api.get(`/fishing-spots/${fishingSpotId}/smelts`, {
    params: pageable,
  });
  return res.data;
}

export interface FishingSpotIdResponse {
  fishingSpotId: number;
  nickname: string;
}
export async function getFishingSpotId(): Promise<FishingSpotIdResponse> {
  const res = await api.get(`/fishing-spots/mine`);
  return res.data;
}

export function changeFishingSpotPublic(
  fishingSpotId: number,
  isPublic: boolean
): Promise<void> {
  return api.patch(`/fishing-spots/${fishingSpotId}/public`, { isPublic });
}
