import { useQuery } from "@tanstack/react-query";
import { queryQuiz } from "../../api/smelts/apis";
import { QuizQueryResponseBody } from "../../api/smelts/types";

export const useQueryQuiz = (smeltId: number) => {
  const { data, error } = useQuery<QuizQueryResponseBody, Error>({
    queryKey: ["quiz", smeltId],
    queryFn: () => queryQuiz(smeltId),
    enabled: !!smeltId,
  });

  return { data, error };
};
