import {
  changeFishingSpotPublic,
  getFishingSpotId,
  FishingSpotIdResponse,
} from "../../api/fishingspot/apis";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useChangeFishingSpotPublic = () => {
  const { data: fishingSpotData } = useQuery<FishingSpotIdResponse>({
    queryKey: ["fishingSpotId"],
    queryFn: getFishingSpotId,
  });

  const changeFishingSpotPublicMutation = useMutation<void, Error, boolean>({
    mutationFn: (isPublic: boolean) =>
      changeFishingSpotPublic(
        fishingSpotData?.fishingSpotId as number,
        isPublic
      ),
  });

  return {
    changeFishingSpotPublic: changeFishingSpotPublicMutation.mutate,
  };
};
