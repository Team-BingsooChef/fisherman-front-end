import styled from "@emotion/styled";
import { Popover, PopoverTrigger, PopoverContent, PopoverBody, Button, useDisclosure } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { WhiteLeftHeader } from "../../components/common/Header";
import { BlueDrawingButton } from "../../components/common/CustomedButton";
import { LotteryMachine, InfoBox } from "../../components/user/FishDrawing";
import coin from "../../assets/pictures/coin.svg";
import fishbag from "../../assets/pictures/fishbag.svg";
import { Flex, Text, Box } from "@chakra-ui/react";
import { FaInfoCircle } from "react-icons/fa";

export default function FishDrawingPage() {
  const [coinCount, setCoinCount] = useState<number>(0);
  const navigate = useNavigate();

  return (
    <Wrapper>
      <WhiteLeftHeader text="빙어 뽑기" onBackClick={() => navigate("/")} />

      <Flex direction="column" align="flex-end" w="full" gap="13px">
        {/* 코인 정보 */}
        <InfoBox
          icon={
            <FaInfoCircle size="24px" color="#7c7c7c" />
          }
          label={`코인은 빙어를 뽑을 때 사용됩니다.\n 친구에게 빙어를 보내거나 친구에게서 빙어를 받을 때 3개의 코인을 받을 수 있어요!`}
        >
          <img src={coin} alt="coin" width="40px" height="40px" />
          <Text fontSize="24px" fontWeight="semibold" letterSpacing="-1px">
            X {coinCount}
          </Text>
        </InfoBox>

        {/* 가방 */}
        <Flex w="110px" h="46px" bgColor="#AFD5F4" borderRadius="8px" justify="center" align="center" gap="13px">
          <img src={fishbag} alt="fishbag" width="40px" height="40px" />
          <Text fontSize="20px" fontWeight="semibold">가방</Text>
        </Flex>
      </Flex>
          <LotteryMachine />
   

      {/* 뽑기 버튼 */}
      <Box w="200px" mt="24px">
        <BlueDrawingButton>뽑기</BlueDrawingButton>
      </Box>
    </Wrapper>
  );
}


const Wrapper = styled.div`
  width: calc(100% - 60px);
  display: flex;
  flex-direction: column;
  align-items: center;
`;
