import { queryMyInventory } from "../../api/inventory/apis";
import { querySmeltsStatistics } from "../../api/inventory/apis";
import { querySmeltsCategory } from "../../api/smelts/apis";
import { useQueries, useQuery } from "@tanstack/react-query";

export default function useSmeltsStatistics() {
  const { data: myInventory } = useQuery({
    queryKey: ["myInventory"],
    queryFn: queryMyInventory,
  });

  const inventoryId = myInventory?.id;

  const results = useQueries({
    queries: [
      {
        queryKey: ["smeltsStatistics", inventoryId],
        queryFn: () =>
          inventoryId !== undefined
            ? querySmeltsStatistics(inventoryId)
            : Promise.reject("Inventory ID is undefined"),
      },
      {
        queryKey: ["smeltsCategory"],
        queryFn: querySmeltsCategory,
      },
    ],
  });

  const [smeltsStatistics, smeltsCategory] = results;

  const detailedSmeltsStatistics = (smeltsCategory.data?.smeltTypes ?? []).map(
    (smeltType) => {
      const matchingSmelt = smeltsStatistics.data?.counts.find(
        (smelt) => smelt.smeltTypeId === smeltType.id
      );

      return {
        smeltTypeId: smeltType.id,
        smeltTypeName: smeltType.name,
        smeltImageUrl: smeltType.imageUrl,
        count: matchingSmelt ? matchingSmelt.count : 0,
      };
    }
  );

  return {
    data: detailedSmeltsStatistics,
  };
}
