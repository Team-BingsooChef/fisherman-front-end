import { api } from "../../config/axios";

import { SmeltsPostRequestBody, FishingSpotQueryResponseBody } from "./types";

export function sendSmelts(
  fishingSpotId: number,
  req: SmeltsPostRequestBody
): Promise<void> {
  return api.post(`/fishing-spots/${fishingSpotId}/smelts`, req);
}

export async function queryFishingSpot(
  fishingSpotId: number
): Promise<FishingSpotQueryResponseBody> {
  const res = await api.get(`/fishing-spots/${fishingSpotId}/smelts`);
  return res.data;
}
