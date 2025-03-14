import { useQuery } from "@tanstack/react-query";
import { queryFishingSpot } from "../../api/fishingspot/apis";
import { FishingSpotQueryResponseBody } from "../../api/fishingspot/types";
import { useState, useEffect } from "react";
import { querySmeltsDetail } from "../../api/smelts/apis";

export type Smelt = {
  id: number;
  smeltTypeId: number;
  status: string;
};
interface UseSmeltPaginationReturn {
  data: FishingSpotQueryResponseBody | undefined;
  smeltsWithSender: (Smelt & { senderName?: string })[]; // senderName 추가된 smelts
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
  const [smeltsWithSender, setSmeltsWithSender] = useState<
    (Smelt & { senderName?: string })[]
  >([]);

  const { data, isFetching } = useQuery({
    queryKey: ["fishingSpot", fishingSpotId, currentPage],
    queryFn: () =>
      queryFishingSpot(fishingSpotId, {
        page: currentPage,
        size: 10,
        sort: ["id,asc"],
      }),
  });

  const totalPages = data?.totalPages ?? 1;

  // smelts 데이터 가져오면 개별 smelt의 상세 정보 호출하여 senderName 추가
  useEffect(() => {
    if (!data?.smelts) {
      return;
    }

    const fetchSmeltDetails = async () => {
      try {
        const detailsPromises = data.smelts.map((smelt) =>
          querySmeltsDetail(smelt.id).then((detailRes) => ({
            ...smelt,
            senderName: detailRes.letter.senderName, // senderName 추가
          }))
        );

        const smeltsWithSenderData = await Promise.all(detailsPromises);
        setSmeltsWithSender(smeltsWithSenderData);
      } catch (error) {
        console.error("Error fetching smelt details:", error);
      }
    };

    fetchSmeltDetails();
  }, [data?.smelts]);

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
    smeltsWithSender,
    currentPage,
    totalPages,
    isFetching,
    nextPage,
    prevPage,
  };
}
