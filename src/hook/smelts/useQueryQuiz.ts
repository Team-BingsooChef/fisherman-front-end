import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { queryQuiz } from "../../api/smelts/apis";
import { QuizQueryResponseBody } from "../../api/smelts/types";

export const useQueryQuiz = (
  smeltId: number,
  options?: Omit<
    UseQueryOptions<QuizQueryResponseBody, Error>,
    "queryKey" | "queryFn"
  >
) => {
  const { data, error } = useQuery<QuizQueryResponseBody, Error>({
    queryKey: ["quiz", smeltId],
    queryFn: () => queryQuiz(smeltId),
    enabled: !!smeltId && (options?.enabled ?? true),
    ...options,
  });

  return { data, error };
};
