import { searchFishingSpot } from "../../api/fishingspot/apis";
import { FishingSpotSearchResponse } from "../../api/fishingspot/types";
import { useQuery } from "@tanstack/react-query";

export const useSearchFishingSpot = (keyword: string) => {
  const { data, error, isLoading } = useQuery<FishingSpotSearchResponse, Error>(
    {
      queryKey: ["searchFishingSpot", keyword],
      queryFn: () => searchFishingSpot(keyword),
    }
  );
  return { data, error, isLoading };
};
