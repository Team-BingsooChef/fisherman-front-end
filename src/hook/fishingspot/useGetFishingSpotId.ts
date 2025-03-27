import {
  getFishingSpotId,
  FishingSpotIdResponse,
} from "../../api/fishingspot/apis";
import { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";

interface UseGetFishingSpotIdOptions {
  enabled?: boolean;
}

export const useGetFishingSpotId = ({
  enabled = true,
}: UseGetFishingSpotIdOptions = {}) => {
  const { data, error } = useQuery<FishingSpotIdResponse, AxiosError>({
    queryKey: ["fishingSpotId"],
    queryFn: getFishingSpotId,
    enabled,
  });

  return { data, error };
};
