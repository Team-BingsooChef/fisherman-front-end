import { api } from "../../config/axios";
import {
  SmeltsDrawResponseBody,
  SmeltsInventoryQueryResponseBody,
  SentSmeltsQueryResponseBody,
} from "./types";

export async function drawSmelts(
  inventoryId: number
): Promise<SmeltsDrawResponseBody> {
  const res = await api.post(`/inventories/${inventoryId}/smelts`);
  return res.data;
}

export async function querySmeltsStatistics(
  inventoryId: number
): Promise<SmeltsInventoryQueryResponseBody> {
  const res = await api.get(`/inventxories/${inventoryId}/smelts/statistics`);
  return res.data;
}

export async function querySentSmelts(
  inventoryId: number,
  page: number = 0,
  size: number = 1,
  sort: string = "id,asc"
): Promise<SentSmeltsQueryResponseBody> {
  const params = {
    page,
    size,
    sort,
  };
  const res = await api.get(`/inventories/${inventoryId}/smelts/sent`, {
    params,
  });
  return res.data;
}

export interface MyInventoryResponse {
  id: number;
  coin: number;
}

//inventory id랑 coin
export async function queryMyInventory(): Promise<MyInventoryResponse> {
  const res = await api.get(`/inventories/mine`);
  return res.data;
}
