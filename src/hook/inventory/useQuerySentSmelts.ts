import {
  querySentSmelts,
  queryMyInventory,
  MyInventoryResponse,
} from "../../api/inventory/apis";
import { SentSmeltsQueryResponseBody } from "../../api/inventory/types";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export const useQuerySentSmelts = (size: number = 10) => {
  const { data: inventoryData } = useQuery<MyInventoryResponse>({
    queryKey: ["myInventory"],
    queryFn: queryMyInventory,
  });

  const InventoryId = inventoryData?.id;

  return useInfiniteQuery<SentSmeltsQueryResponseBody, Error>({
    queryKey: ["sentSmelts"],
    queryFn: ({ pageParam = 0 }) => {
      if (typeof InventoryId !== "number") {
        return Promise.reject(new Error("Invalid InventoryId"));
      }
      return querySentSmelts(InventoryId, pageParam as number, size);
    },
    initialPageParam: 0,

    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.currPage + 1;

      return nextPage < lastPage.totalPages ? nextPage : undefined;
    },
    enabled: !!InventoryId,
  });
};
