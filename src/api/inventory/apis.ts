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

export async function querySmeltsInventory(
  inventoryId: number
): Promise<SmeltsInventoryQueryResponseBody> {
  const res = await api.get(`/inventories/${inventoryId}/smelts/statistics`);
  return res.data;
}

export async function querySentSmelts(
  inventoryId: number
): Promise<SentSmeltsQueryResponseBody> {
  const res = await api.get(`/inventories/${inventoryId}/smelts/sent`);
  return res.data;
}
