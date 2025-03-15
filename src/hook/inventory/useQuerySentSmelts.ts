import {
  querySentSmelts,
  queryMyInventory,
  MyInventoryResponse,
} from "../../api/inventory/apis";
import { SentSmeltsQueryResponseBody } from "../../api/inventory/types";
import { useQuery } from "@tanstack/react-query";

export const useQuerySentSmelts = (page: number = 0, size: number = 1) => {
  const { data: inventoryData } = useQuery<MyInventoryResponse>({
    queryKey: ["myInventory"],
    queryFn: queryMyInventory,
  });

  const InventoryId = inventoryData?.id;

  const { data, error, isLoading } = useQuery<
    SentSmeltsQueryResponseBody,
    Error
  >({
    queryKey: ["sentSmelts", page, size],
    queryFn: () => querySentSmelts(InventoryId as number, page, size),
    enabled: !!InventoryId,
  });

  return { data, error, isLoading };
};
