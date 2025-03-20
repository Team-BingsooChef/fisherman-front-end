import { useNavigate, useParams } from "react-router-dom";

import { BlueRectangleButton } from "../../common/CustomedButton";
import { Box, useToast } from "@chakra-ui/react";
import { useGetFishingSpotId } from "../../../hook/fishingspot/useGetFishingSpotId";

export const AddToppingButton = () => {
  const navigate = useNavigate();
  const { status } = useGetFishingSpotId();
  const fishingSpotId = useParams();
  const currentFishingSpotId = fishingSpotId.fishingSpotId;

  const handleClickAddToppping = () => {
    if (status === 401 || status === 500) {
      localStorage.setItem("redirectUrl", `/${currentFishingSpotId}`);
      navigate("/login");
    } else {
      navigate("/sending");
    }
  };

  return (
    <Box w="calc(100% - 180px)" mt="16px">
      <BlueRectangleButton onClick={handleClickAddToppping}>
        빙어 보내기
      </BlueRectangleButton>
    </Box>
  );
};

export const CopyLink = () => {
  const { data: fishingSpotData } = useGetFishingSpotId();
  const toast = useToast();

  const handleCopyLink = async () => {
    if (!fishingSpotData?.fishingSpotId) {
      toast({
        title: "오류",
        description: "Fishing Spot ID를 불러오지 못했습니다.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const link = `https://www.smelt-fishing.com/${fishingSpotData.fishingSpotId}`;

    try {
      await navigator.clipboard.writeText(link);
      toast({
        title: "링크 복사 완료",
        description: "링크가 클립보드에 복사되었습니다.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch {
      toast({
        title: "오류",
        description: "링크 복사에 실패했습니다.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box w="calc(100% - 200px)" mt="16px">
      <BlueRectangleButton onClick={handleCopyLink}>
        공유하기
      </BlueRectangleButton>
    </Box>
  );
};
