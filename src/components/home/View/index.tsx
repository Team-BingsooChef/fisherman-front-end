import { Menu } from "../Menu";
import { FishingSpot } from "../Bingsoo";
import { ToppingsPagination } from "../FloatToppings/FloatToppings";
import { AddToppingButton, CopyLink } from "../HomeBottomButton";
import { Text, Flex, IconButton, Box } from "@chakra-ui/react";
import { House } from "lucide-react";
import { useQueryOwnerName } from "../../../hook/fishingspot/useQueryOwnerName";
import { useGetFishingSpotId } from "../../../hook/fishingspot/useGetFishingSpotId";
import { useNavigate } from "react-router-dom";
import useFishingSpot from "../../../hook/fishingspot/useFishingSpot";

export const OwnerView = ({
  currentFishingSpotId,
}: {
  currentFishingSpotId: number;
}) => {
  const {
    data: fishingSpotFishData,
    currentPage,
    totalPages,
    nextPage,
    prevPage,
  } = useFishingSpot(currentFishingSpotId);
  return (
    <>
      <Menu />
      <Text mt="10px" fontSize="l" fontWeight=" Bold" color="#03526B">
        친구들에게 공유해 빙어를 추가해 보세요!
      </Text>
      <CopyLink />
      <Box h="60px" />
      {fishingSpotFishData && (
        <FishingSpot fishingSpotFishData={fishingSpotFishData} />
      )}
      <Flex
        mt="8px"
        mb="8px"
        justify="center"
        alignItems="center"
        css={{
          "@media (min-height: 920px)": {
            marginTop: "16px",
          },
        }}
      >
        <ToppingsPagination
          currentPage={currentPage}
          totalPages={totalPages}
          nextPage={nextPage}
          prevPage={prevPage}
        />
      </Flex>
    </>
  );
};

export const ChefView = ({
  currentFishingSpotId,
}: {
  currentFishingSpotId: number;
}) => {
  const nickname = useQueryOwnerName();
  const navigate = useNavigate();
  const { data: fishingSpotData } = useGetFishingSpotId();
  const {
    data: fishingSpotFishData,
    currentPage,
    totalPages,
    nextPage,
    prevPage,
  } = useFishingSpot(currentFishingSpotId);

  const clickGoHome = () => {
    if (!fishingSpotData?.fishingSpotId) {
      navigate("/login");
    } else {
      navigate(`/spot/${fishingSpotData?.fishingSpotId}`);
    }
  };

  return (
    <>
      <Flex w="100%" justify="space-between" mt="8px">
        <IconButton
          icon={<House size={28} />}
          variant="ghost"
          aria-label="goMine"
          color="#777C89"
          onClick={clickGoHome}
        />
      </Flex>
      <Text fontSize="l" fontWeight="Bold" color="#03526B">
        사랑하는 {nickname}의 호수를 채워주세요
      </Text>
      <AddToppingButton />
      <Box h="60px" />
      {fishingSpotFishData && (
        <FishingSpot fishingSpotFishData={fishingSpotFishData} />
      )}
      <Flex
        mt="8px"
        mb="8px"
        justify="center"
        alignItems="center"
        css={{
          "@media (min-height: 920px)": {
            marginTop: "16px",
          },
        }}
      >
        <ToppingsPagination
          currentPage={currentPage}
          totalPages={totalPages}
          nextPage={nextPage}
          prevPage={prevPage}
        />
      </Flex>
    </>
  );
};
