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
        width={200}
        height={200}
        mb="-32px"
        zIndex="1"
        css={{
          "@media (min-height: 768px)": {
            width: "220px",
            height: "220px",
          },
          "@media (min-height: 900px)": {
            width: "250px",
            height: "250px",
          },
          "@media (min-height: 1100px)": {
            width: "320px",
            height: "320px",
          },
        }}
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
  height: 42dvh;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (min-height: 730px) {
    height: 46dvh;
  }
  @media (min-height: 900px) {
    height: 48dvh;
  }
`;
