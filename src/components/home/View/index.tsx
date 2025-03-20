import { Menu } from "../Menu";
import { FishingSpot } from "../Bingsoo";
import { ToppingsPagination } from "../FloatToppings/FloatToppings";
import { AddToppingButton, CopyLink } from "../HomeBottomButton";
import { Text, Flex, IconButton, Box } from "@chakra-ui/react";
import { House } from "lucide-react";
import { useQueryOwnerName } from "../../../hook/fishingspot/useQueryOwnerName";
import { useGetFishingSpotId } from "../../../hook/fishingspot/useGetFishingSpotId";
import { useNavigate } from "react-router-dom";

export const OwnerView = () => {
  return (
    <>
      <Menu />
      <Text mt="10px" fontSize="l" fontWeight=" Bold" color="#03526B">
        친구들에게 공유해 빙어를 추가해 보세요!
      </Text>
      <CopyLink />
      <Box h="60px" />
      <FishingSpot />
      <Flex mt="8px" mb="8px" justify="center" alignItems="center">
        <ToppingsPagination />
      </Flex>
    </>
  );
};

export const ChefView = () => {
  const nickname = useQueryOwnerName();
  const navigate = useNavigate();
  const { data: fishingSpotData } = useGetFishingSpotId();
  return (
    <>
      <Flex w="100%" justify="space-between" mt="8px">
        <IconButton
          icon={<House size={28} />}
          variant="ghost"
          aria-label="goMine"
          color="#777C89"
          onClick={() => navigate(`/${fishingSpotData?.fishingSpotId}`)}
        />
      </Flex>
      <Text fontSize="l" fontWeight="Bold" color="#03526B">
        사랑하는 {nickname}의 호수를 채워주세요
      </Text>
      <AddToppingButton />
      <Box h="60px" />
      <FishingSpot />
      <Flex mt="8px" mb="8px" justify="center" alignItems="center">
        <ToppingsPagination />
      </Flex>
    </>
  );
};
