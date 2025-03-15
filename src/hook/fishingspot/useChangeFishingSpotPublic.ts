import { changeFishingSpotPublic } from "../../api/fishingspot/apis";
import { useMutation } from "@tanstack/react-query";

export const useChangeFishingSpotPublic = () => {
  const changeFishingSpotPublicMutation = useMutation<
    void,
    Error,
    { fishingSpotId: number; isPublic: boolean }
  >({
    mutationFn: ({
      fishingSpotId,
      isPublic,
    }: {
      fishingSpotId: number;
      isPublic: boolean;
    }) => changeFishingSpotPublic(fishingSpotId, isPublic),
  });

  return {
    changeFishingSpotPublic: changeFishingSpotPublicMutation.mutate,
  };
};
