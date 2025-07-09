import { useQuery } from "@tanstack/react-query";
import { queryFishingSpot } from "../../api/fishingspot/apis";
import { FishingSpotQueryResponseBody } from "../../api/fishingspot/types";
import { useState } from "react";

export type Smelt = {
  id: number;
  smeltTypeId: number;
  status: string;
};
interface UseSmeltPaginationReturn {
  data: FishingSpotQueryResponseBody | undefined;
  currentPage: number;
  totalPages: number;
  isFetching: boolean;
  nextPage: () => void;
  prevPage: () => void;
}

export default function useFishingSpot(
  fishingSpotId: number
): UseSmeltPaginationReturn {
  const [currentPage, setCurrentPage] = useState(0);

  const { data, isFetching } = useQuery({
    queryKey: ["fishingSpot", fishingSpotId, currentPage],
    queryFn: () =>
      queryFishingSpot(fishingSpotId, {
        page: currentPage,
        size: 8,
        sort: "id,asc",
      }),
  });

  const totalPages =
    data?.totalPages && data.totalPages > 0 ? data.totalPages : 1;

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return {
    data,
    currentPage,
    totalPages,
    isFetching,
    nextPage,
    prevPage,
  };
}
