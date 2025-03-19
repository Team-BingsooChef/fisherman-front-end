import { useQuery } from "@tanstack/react-query";
import { querySmeltsCategory } from "../../api/smelts/apis";
import { SmeltsCategoryQueryResponseBody } from "../../api/smelts/types";

export const useSmeltsImg = () => {
  const { data, error } = useQuery<SmeltsCategoryQueryResponseBody, Error>({
    queryKey: ["smeltsCategory"],
    queryFn: () => querySmeltsCategory(),
  });

  const getImageUrl = (
    smeltTypeId: number,
    isIce: boolean = false
  ): string | undefined => {
    if (!data) {
      return undefined;
    }

    const smeltType = data.smeltTypes.find((type) => type.id === smeltTypeId);

    // 일치하는 항목이 있으면 isIce 값에 따라 iceImageUrl 또는 imageUrl 반환
    return smeltType
      ? isIce
        ? smeltType.iceImageUrl
        : smeltType.imageUrl
      : undefined;
  };

  return { data, error, getImageUrl };
};
