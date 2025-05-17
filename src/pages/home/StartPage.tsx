import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { BlueRectangleButton } from "../../components/common/CustomedButton";
import { Text, Box, Flex, Image } from "@chakra-ui/react";
import fisherman_big from "../../assets/pictures/fisherman_small.svg";
import shark from "../../assets/fish/Shark.svg";
import Bungeoppang from "../../assets/fish/Bungeoppang.svg";
import RibbonFish from "../../assets/fish/RibbonFish.svg";
import PufferFish from "../../assets/fish/PufferFish.svg";

import { useGetFishingSpotId } from "../../hook/fishingspot/useGetFishingSpotId";
export default function StartPage() {
  const { data: fishingSpotData } = useGetFishingSpotId();
  const fishingSpotId = fishingSpotData?.fishingSpotId;
  const navigate = useNavigate();

  const handleStart = () => {
    if (fishingSpotId) {
      navigate(`/${fishingSpotId}`);
    } else {
      navigate("/login");
    }
  };

  return (
    <Wrapper>
      <Text mt="60px" fontSize="l" fontWeight=" Bold" color="#03526B">
        친구들과 함께 빙어를 주고받아 보세요!
      </Text>
      <Box w="calc(100% - 200px)" mt="16px">
        <BlueRectangleButton onClick={handleStart}>
          시작하기
        </BlueRectangleButton>
      </Box>
      <Box h="60px" />
      <Flex
        w="100%"
        flexDirection="column"
        alignItems="center"
        justifyContent="flex-end"
        h="calc(100dvh - 200px)" // 화면 높이에서 상단 컨텐츠 높이를 뺀 값
      >
        <Image
          src={fisherman_big}
          alt="fisherman"
          width={260}
          height={260}
          mb="-32px"
          zIndex="1"
          css={{
            "@media (min-height: 950px)": {
              width: "360px",
              height: "360px",
            },
          }}
        />
        <FishingspotContainer>
          <FishImage
            src={shark}
            boxSize="100px"
            objectFit="contain"
            top="10%"
            left="10%"
            duration="3s"
            distance="10px"
          />
          <FishImage
            src={Bungeoppang}
            boxSize="100px"
            objectFit="contain"
            top="26%"
            left="70%"
            duration="4s"
            distance="15px"
          />
          <FishImage
            src={RibbonFish}
            boxSize="100px"
            objectFit="contain"
            top="60%"
            left="50%"
            duration="5s"
            distance="20px"
          />
          <FishImage
            src={PufferFish}
            boxSize="100px"
            objectFit="contain"
            top="40%"
            left="20%"
            duration="2.5s"
            distance="12px"
          />
        </FishingspotContainer>
      </Flex>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FishingspotContainer = styled.div`
  position: relative;
  background-color: #78b8ec;
  border-start-start-radius: 20px;
  border-start-end-radius: 20px;
  border-end-start-radius: 20px;
  border-end-end-radius: 20px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

interface FishImageProps {
  top: string;
  left: string;
  duration: string;
  distance: string;
}

const FishImage = styled(Image)<FishImageProps>`
  position: absolute;
  top: ${({ top }) => top};
  left: ${({ left }) => left};
  animation: float ${({ duration }) => duration} infinite ease-in-out;

  @keyframes float {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-${({ distance }) => distance});
    }
    100% {
      transform: translateY(0);
    }
  }
`;
