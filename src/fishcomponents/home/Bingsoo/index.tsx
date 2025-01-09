import styled from "@emotion/styled";
import { Flex } from "@chakra-ui/react";
import fishingspotImg from  "../../../assets/background/fishing_spot.png";
import { Toppings } from "../FloatToppings";
import { ToppingsPagination } from "../FloatToppings";



export const FishingSpot = () => {
  return (
    <Flex w="100%" flexDirection="column" alignItems="center" justifyContent="flex-end" >
      <FishingspotContainer bgImage={(fishingspotImg)}>
      <Toppings />
      <Flex mb="10px" justify="center" alignItems="center" >
      <ToppingsPagination/>
      </Flex>
    
      </FishingspotContainer>
    </Flex>
  );
};

const FishingspotContainer = styled.div<{ bgImage: string }>`
  position: relative;
  overflow: visible;
  width: 100%;
  height: 55vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${(props) => props.bgImage});
  background-repeat: no-repeat; /* 배경화면 반복 없음 */
  //background-size: contain; /* 배경화면을 컨테이너에 맞게 조정 */
  background-position: center; /* 배경화면을 중앙 정렬 */
`;
