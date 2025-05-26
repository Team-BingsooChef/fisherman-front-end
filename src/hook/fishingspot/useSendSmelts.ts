import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendSmelts } from "../../api/fishingspot/apis";
import { useSmeltStore } from "../../hook/fishingspot/useSmeltStore";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gtag?: (...args: any[]) => void;
  }
}

export function useSendSmelts(fishingSpotId: number) {
  const queryClient = useQueryClient();
  const { smeltTypeId, content, senderName, quiz, resetForm } = useSmeltStore();

  return useMutation({
    mutationFn: () =>
      sendSmelts(fishingSpotId, {
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

      //  GA4 이벤트 전송
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "send_smelt", {
          fishing_spot_id: fishingSpotId,
          smelt_type_id: smeltTypeId,
          has_quiz: !!quiz,
          content_length: content.length,
        });
      }
    },

    onError: (error) => {
      console.error("Smelts 전송 실패:", error);
      resetForm();

      // 실패도 추적
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "send_smelt_error", {
          fishing_spot_id: fishingSpotId,
          error_message: String(error),
        });
      }
    },
  });
}
