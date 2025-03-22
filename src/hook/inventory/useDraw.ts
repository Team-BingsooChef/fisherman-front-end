import {
  drawSmelts,
  queryMyInventory,
  MyInventoryResponse,
} from "../../api/inventory/apis";
import { SmeltsDrawResponseBody } from "../../api/inventory/types";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useState } from "react";

export const useDrawSmelts = () => {
  const queryClient = useQueryClient();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
        setErrorMessage(null);
        return data;
      },
      onError: (error) => {
        if (error instanceof Error && error.message) {
          try {
            const errorResponse = JSON.parse(error.message);
            if (errorResponse.status === 400) {
              setErrorMessage(errorResponse.detail);
            }
          } catch {
            setErrorMessage("알 수 없는 오류가 발생했습니다.");
          }
        } else {
          setErrorMessage("알 수 없는 오류가 발생했습니다.");
        }
      },
    }
  );

  return {
    mutate: () => drawSmeltsMutation.mutate(inventoryId as number),
    data: drawSmeltsMutation.data,
    errorMessage,
    isError: drawSmeltsMutation.isError,
  };
};
