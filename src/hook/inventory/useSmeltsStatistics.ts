import { querySmeltsStatistics } from "../../api/inventory/apis";
import { querySmeltsCategory } from "../../api/smelts/apis";
import { useQueries } from "@tanstack/react-query";

export default function useSmeltsStatistics(inventoryId: number) {
  const results = useQueries({
    queries: [
      {
        queryKey: ["smeltsStatistics", inventoryId],
        queryFn: () => querySmeltsStatistics(inventoryId),
      },
      {
        queryKey: ["smeltsCategory"],
        queryFn: querySmeltsCategory,
      },
    ],
  });

  const [smeltsStatistics, smeltsCategory] = results;
  const detailedSmeltsStatistics = smeltsStatistics.data?.counts.map(
    (smelt) => {
      const smeltTypesMap = new Map(
        (smeltsCategory.data?.smeltTypes ?? []).map((smeltType) => [
          smeltType.id,
          smeltType,
        ])
      );

      const matchingSmeltType = smeltTypesMap.get(smelt.smeltTypeId);

      return {
        ...smelt,
        smeltTypeName: matchingSmeltType?.name ?? "알 수 없음",
        smeltImageUrl: matchingSmeltType?.imageUrl ?? "default.jpg",
      };
    }
  );

  return {
    data: detailedSmeltsStatistics,
  };
}
