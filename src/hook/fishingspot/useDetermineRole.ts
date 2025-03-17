import { getFishingSpotId } from "../../api/fishingspot/apis";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export const useDetermineRole = () => {
  const { fishingSpotId } = useParams();
  const parsedFishingSpotId = fishingSpotId ? Number(fishingSpotId) : null;
  const { data } = useQuery<number, Error>({
    queryKey: ["fishingSpotId"],
    queryFn: getFishingSpotId,
  });

  if (parsedFishingSpotId === data) {
    return "owner";
  }
  return "chef";
};
