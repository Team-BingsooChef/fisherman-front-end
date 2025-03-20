import {
  getFishingSpotId,
  FishingSpotIdResponse,
} from "../../api/fishingspot/apis";
import { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";

export const useGetFishingSpotId = () => {
  const { data, error } = useQuery<FishingSpotIdResponse, AxiosError>({
    queryKey: ["fishingSpotId"],
    queryFn: getFishingSpotId,
  });

  const status = error?.response?.status ?? null;

  return { data, error, status };
};
