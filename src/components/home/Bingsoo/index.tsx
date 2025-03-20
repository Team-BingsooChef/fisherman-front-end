import styled from "@emotion/styled";
import { Flex, Image } from "@chakra-ui/react";
import { Toppings } from "../FloatToppings/FloatToppings";
import fisherman_big from "../../../assets/pictures/fisherman_small.svg";
export const FishingSpot = () => {
  return (
    <Flex
      w="100%"
      flexDirection="column"
      alignItems="center"
      justifyContent="flex-end"
      h="100%"
    >
      <Image
        src={fisherman_big}
        alt="fisherman"
        width={260}
        height={260}
        mb="-32px"
        zIndex="1"
      />
      <FishingspotContainer>
        <Toppings />
      </FishingspotContainer>
    </Flex>
  );
};

const FishingspotContainer = styled.div`
  position: relative;
  background-color: #78b8ec;
  border-start-start-radius: 20px;
  border-start-end-radius: 20px;
  border-end-start-radius: 20px;
  border-end-end-radius: 20px;
  width: 100%;
  height: 50dvh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
