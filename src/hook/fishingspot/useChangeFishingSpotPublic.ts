import {
  changeFishingSpotPublic,
  getFishingSpotId,
} from "../../api/fishingspot/apis";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useChangeFishingSpotPublic = () => {
  const { data: fishingSpotId } = useQuery<number>({
    queryKey: ["fishingSpotId"],
    queryFn: getFishingSpotId,
  });

  const changeFishingSpotPublicMutation = useMutation<void, Error, boolean>({
    mutationFn: (isPublic: boolean) =>
      changeFishingSpotPublic(fishingSpotId as number, isPublic),
  });

  return {
    changeFishingSpotPublic: changeFishingSpotPublicMutation.mutate,
  };
};
