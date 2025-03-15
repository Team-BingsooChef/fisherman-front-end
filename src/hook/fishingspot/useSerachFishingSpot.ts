import { searchFishingSpot } from "../../api/fishingspot/apis";
import { FishingSpotSearchResponseBody } from "../../api/fishingspot/types";
import { useQuery } from "@tanstack/react-query";

export const useSearchFishingSpot = (keyword: string) => {
  const { data, error, isLoading } = useQuery<
    FishingSpotSearchResponseBody,
    Error
  >({
    queryKey: ["searchFishingSpot", keyword],
    queryFn: () => searchFishingSpot(keyword),
  });
  return { data, error, isLoading };
};
