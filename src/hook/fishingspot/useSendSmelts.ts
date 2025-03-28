import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendSmelts } from "../../api/fishingspot/apis";
import { useSmeltStore } from "../../hook/fishingspot/useSmeltStore"; // zustand 스토어 import

export function useSendSmelts(fishingSpotId: number) {
  const queryClient = useQueryClient();
  const { smeltTypeId, content, senderName, quiz, resetForm } = useSmeltStore();

  return useMutation({
    mutationFn: () =>
      sendSmelts(fishingSpotId, {
        //zustand
        smeltTypeId,
        content,
        senderName,
        quiz,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["fishingSpot", fishingSpotId],
      });
      resetForm();
    },
    onError: (error) => {
      console.error("Smelts 전송 실패:", error);
      resetForm();
    },
  });
}
