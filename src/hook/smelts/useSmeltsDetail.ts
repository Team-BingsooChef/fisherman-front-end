import { useQuery } from "@tanstack/react-query";
import { querySmeltsDetail } from "../../api/smelts/apis";
import { SmeltsLetterQueryResponseBody } from "../../api/smelts/types";

export const useSmeltsDetail = (smeltId: number) => {
  const { data, error } = useQuery<SmeltsLetterQueryResponseBody, Error>({
    queryKey: ["smeltsDetail", smeltId],
    queryFn: () => querySmeltsDetail(smeltId),
    enabled: !!smeltId,
  });

  return { data, error };
};
