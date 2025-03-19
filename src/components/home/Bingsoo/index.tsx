import styled from "@emotion/styled";
import { Flex } from "@chakra-ui/react";
import { Toppings } from "../FloatToppings/FloatToppings";

export const FishingSpot = () => {
  return (
    <Flex
      w="100%"
      flexDirection="column"
      alignItems="center"
      justifyContent="flex-end"
    >
      <FishingspotContainer>
        <Toppings />
      </FishingspotContainer>
    </Flex>
  );
};

const FishingspotContainer = styled.div`
  position: relative;
  overflow: visible;
  width: 100%;
  height: 55vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
