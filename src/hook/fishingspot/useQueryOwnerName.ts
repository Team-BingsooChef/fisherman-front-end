import { queryFishingSpot } from "../../api/fishingspot/apis";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export const useQueryOwnerName = () => {
  const { fishingSpotId } = useParams();

  const { data } = useQuery<string, Error>({
    queryKey: ["fishingSpot", fishingSpotId],
    queryFn: async () => {
      const response = await queryFishingSpot(Number(fishingSpotId), {
        page: 1,
        size: 10,
        sort: ["id,asc"],
      });
      return response.nickname;
    },
  });

  return data;
};
