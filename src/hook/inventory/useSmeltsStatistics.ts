import { querySmeltsStatistics } from "../../api/inventory/apis";
import { SmeltsInventoryQueryResponseBody } from "../../api/inventory/types";
import { useQuery } from "@tanstack/react-query";

interface UseSmeltsStatisticsReturn {
  data: SmeltsInventoryQueryResponseBody | undefined;
  isFetching: boolean;
}

export default function useSmeltsStatistics(
  inventoryId: number
): UseSmeltsStatisticsReturn {
  const { data, isFetching } = useQuery({
    queryKey: ["smeltsStatistics", inventoryId],
    queryFn: () => querySmeltsStatistics(inventoryId),
  });

  return {
    data,
    isFetching,
  };
}
