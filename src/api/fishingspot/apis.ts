import { api } from "../../config/axios";

import { PostSmeltsRequestBody, QuerysmeltsResponseBody } from "./types";

export function PostSmelts(
  fishingSpotId: number,
  req: PostSmeltsRequestBody
): Promise<void> {
  return api.post(`/fishing-spots/${fishingSpotId}/smelts`, req);
}

export async function QuerySmelts(
  fishingSpotId: number
): Promise<QuerysmeltsResponseBody> {
  const res = await api.get(`/fishing-spots/${fishingSpotId}/smelts`);
  return res.data;
}
