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

  let role = "chef"; // 기본값으로 "chef" 설정
  if (parsedFishingSpotId === data) {
    role = "owner"; // 조건이 참이면 "owner"로 변경
  }

  return role;
};
