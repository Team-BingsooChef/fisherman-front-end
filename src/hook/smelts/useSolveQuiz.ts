import { useMutation, useQueryClient } from "@tanstack/react-query";
import { solveQuiz } from "../../api/smelts/apis";
import {
  QuizSolveRequestBody,
  QuizSolveResponseBody,
} from "../../api/smelts/types";
import { useGetFishingSpotId } from "../fishingspot/useGetFishingSpotId";

export const useSolveQuiz = (smeltId: number) => {
  const queryClient = useQueryClient();
  const { data: fishingSpotData } = useGetFishingSpotId();
  const fishingSpotId = fishingSpotData?.fishingSpotId;

  return useMutation<QuizSolveResponseBody, Error, QuizSolveRequestBody>({
    mutationFn: (req: QuizSolveRequestBody) => solveQuiz(smeltId, req),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["fishingSpot", fishingSpotId],
      });
    },
  });
};
