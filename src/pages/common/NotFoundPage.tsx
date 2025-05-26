import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { BlueRectangleButton } from "../../components/common/CustomedButton";
import { Text, Box, Flex, Image } from "@chakra-ui/react";
import fisherman_big from "../../assets/pictures/fisherman_small.svg";

import { useGetFishingSpotId } from "../../hook/fishingspot/useGetFishingSpotId";

export default function NotFoundPage() {
  const { refetch } = useGetFishingSpotId({
    enabled: false,
  });

  const navigate = useNavigate();

  const handleStart = async () => {
    const resultId = await refetch();

    const fishingSpotId = resultId?.data?.fishingSpotId;
    if (fishingSpotId) {
      navigate(`/${fishingSpotId}`);
    } else {
      navigate("/login");
    }
  };

  return (
    <Wrapper>
      <Text>
        <Box
          fontSize="80px"
          fontWeight="bold"
          color="#3A84BF"
          textAlign="center"
          mt="80px"
        >
          404
        </Box>
      </Text>
      <Text fontSize="l" fontWeight="Bold" color="#03526B" textAlign="center">
        요청하신 페이지를 찾을 수 없어요.
        <br />
        홈으로 돌아가 볼까요?
      </Text>
      <Box w="calc(100% - 200px)" mt="20px">
        <BlueRectangleButton onClick={handleStart}>
          메인으로
        </BlueRectangleButton>
      </Box>

      <Flex
        w="100%"
        flexDirection="column"
        alignItems="center"
        justifyContent="flex-end"
        mt="40px"
      >
        <Image
          src={fisherman_big}
          alt="fisherman"
          width={280}
          height={280}
          css={{
            "@media (max-height: 750px)": {
              width: "200px",
              height: "200px",
            },
          }}
        />
      </Flex>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
