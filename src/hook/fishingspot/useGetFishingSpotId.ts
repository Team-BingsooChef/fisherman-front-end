import {
  getFishingSpotId,
  FishingSpotIdResponse,
} from "../../api/fishingspot/apis";
import { useQuery } from "@tanstack/react-query";

export const useGetFishingSpotId = () => {
  const { data } = useQuery<FishingSpotIdResponse, Error>({
    queryKey: ["fishingSpotId"],
    queryFn: getFishingSpotId,
  });

  return { data };
};
