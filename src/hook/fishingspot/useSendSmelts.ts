import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendSmelts } from "../../api/fishingspot/apis";
import { SmeltsPostRequestBody } from "../../api/fishingspot/types";

export function useSendSmelts(fishingSpotId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (req: SmeltsPostRequestBody) => sendSmelts(fishingSpotId, req),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["fishingSpot", fishingSpotId],
      });
    },
    onError: (error) => {
      console.error("Smelts 전송 실패:", error);
    },
  });
}
