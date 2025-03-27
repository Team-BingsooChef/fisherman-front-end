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

  const translateSmeltTypeName = (smeltTypeName: string): string => {
    switch (smeltTypeName) {
      case "Betta":
        return "베타";
      case "Bungeoppang":
        return "붕어빵";
      case "GoldenSmelt":
        return "황금빙어";
      case "Koi":
        return "비단잉어";
      case "PufferFish":
        return "복어";
      case "RibbonFish":
        return "갈치";
      case "Shark":
        return "상어";
      case "Smelt":
        return "빙어";
      case "Trout":
        return "송어";
      default:
        return smeltTypeName; // 알 수 없는 경우 원본 이름 반환
    }
  };

  const detailedSmeltsStatistics = (smeltsCategory.data?.smeltTypes ?? []).map(
    (smeltType) => {
      const matchingSmelt = smeltsStatistics.data?.counts.find(
        (smelt) => smelt.smeltTypeId === smeltType.id
      );

      return {
        smeltTypeId: smeltType.id,
        smeltTypeName: translateSmeltTypeName(smeltType.name),
        smeltImageUrl: smeltType.imageUrl,
        count: matchingSmelt ? matchingSmelt.count : 0,
        starRating: getStarRating(smeltType.probability),
      };
    }
  );

  return {
    data: detailedSmeltsStatistics,
  };
}

const getStarRating = (probability: number): number => {
  if (probability >= 20) {
    return 1;
  }
  if (probability >= 17) {
    return 2;
  }
  if (probability >= 10) {
    return 3;
  }
  if (probability >= 6) {
    return 4;
  }
  return 5; // 4% 이하
};
