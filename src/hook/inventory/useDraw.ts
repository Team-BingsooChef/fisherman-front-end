import {
  drawSmelts,
  queryMyInventory,
  MyInventoryResponse,
} from "../../api/inventory/apis";
import { SmeltsDrawResponseBody } from "../../api/inventory/types";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

export const useDrawSmelts = () => {
  const queryClient = useQueryClient();

  const { data: inventoryData } = useQuery<MyInventoryResponse>({
    queryKey: ["myInventory"],
    queryFn: queryMyInventory,
  });

  const inventoryId = inventoryData?.id;

  const drawSmeltsMutation = useMutation<SmeltsDrawResponseBody, Error, number>(
    {
      mutationFn: (inventoryId: number) => drawSmelts(inventoryId),
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["myInventory"] });
        return data;
      },
    }
  );

  return {
    mutate: () => drawSmeltsMutation.mutate(inventoryId as number),
    data: drawSmeltsMutation.data,
  };
};
