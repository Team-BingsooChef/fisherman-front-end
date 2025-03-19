import { useMutation } from "@tanstack/react-query";
import { solveQuiz } from "../../api/smelts/apis";
import {
  QuizSolveRequestBody,
  QuizSolveResponseBody,
} from "../../api/smelts/types";

export const useSolveQuiz = (smeltId: number) => {
  return useMutation<QuizSolveResponseBody, Error, QuizSolveRequestBody>({
    mutationFn: (req: QuizSolveRequestBody) => solveQuiz(smeltId, req),
  });
};
