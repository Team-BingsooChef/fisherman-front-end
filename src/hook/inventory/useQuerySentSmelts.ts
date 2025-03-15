import {
  querySentSmelts,
  queryMyInventory,
  MyInventoryResponse,
} from "../../api/inventory/apis";
import { SentSmeltsQueryResponseBody } from "../../api/inventory/types";
import { useQuery } from "@tanstack/react-query";

export const useQuerySentSmelts = (
  page: number = 0,
  size: number = 1,
  sort: string[] = ["string"]
) => {
  const { data: inventoryData } = useQuery<MyInventoryResponse>({
    queryKey: ["myInventory"],
    queryFn: queryMyInventory,
  });

  const InventoryId = inventoryData?.id;

  const { data, error } = useQuery<SentSmeltsQueryResponseBody, Error>({
    queryKey: ["sentSmelts", page, size, sort],
    queryFn: () => querySentSmelts(InventoryId as number, page, size, sort),
    enabled: !!InventoryId,
  });

  return { data, error };
};
