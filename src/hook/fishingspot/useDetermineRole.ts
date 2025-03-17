import { getFishingSpotId } from "../../api/fishingspot/apis";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { FishingSpotIdResponse } from "../../api/fishingspot/apis";

export const useDetermineRole = () => {
  const { fishingSpotId } = useParams();
  const parsedFishingSpotId = fishingSpotId ? Number(fishingSpotId) : null;
  const { data } = useQuery<FishingSpotIdResponse, Error>({
    queryKey: ["fishingSpotId"],
    queryFn: getFishingSpotId,
  });

  let role = "chef";
  if (parsedFishingSpotId === data?.fishingSpotId) {
    role = "owner";
  }

  return role;
};
