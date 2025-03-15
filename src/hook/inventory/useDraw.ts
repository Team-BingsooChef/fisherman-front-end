import { drawSmelts } from "../../api/inventory/apis";
import { SmeltsDrawResponseBody } from "../../api/inventory/types";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export const useDrawSmelts = () => {
  const queryClient = useQueryClient();

  return useMutation<SmeltsDrawResponseBody, Error, number>({
    mutationFn: (inventoryId: number) => drawSmelts(inventoryId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["myInventory"] });
      return data;
    },
  });
};
