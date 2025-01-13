import styled from "@emotion/styled";
import { Tooltip } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { WhiteLeftHeader } from "../../components/common/Header";
import { BlueDrawingButton } from "../../components/common/CustomedButton";
import lotterymachine from "../../assets//pictures/lotterymachine.svg";
import coin from "../../assets/pictures/coin.svg";
import fishbag from "../../assets/pictures/fishbag.svg";
import { Flex, Text, Box } from "@chakra-ui/react";
import { FaInfoCircle } from "react-icons/fa";

export default function FishDrawingPage() {
  const [otherNickname, setOtherNickname] = useState<string>("");
  const [coinCount, setCoinCount] = useState<number>(0);
  const navigate = useNavigate();

  return (
    <Wrapper>
      <WhiteLeftHeader text="빙어 뽑기" onBackClick={() => navigate("/")} />
      <Flex direction="column" align="flex-end" w="full" gap="13px">
        <Flex w="140px" h="44px" borderRadius="8px" justify="center" align="center" gap="13px" position="relative">
    {/* 툴팁을 아이콘 근처에 표시 */}
    <Tooltip
      label="코인의 개수를 확인하세요!"
      hasArrow
      bg="gray.700" // 말풍선 배경색
      color="white" // 글자 색
      offset={[0, 8]} // 아이콘과 툴팁 간격 조정
    >
    <FaInfoCircle size="24px"color="#7c7c7c"/>
  </Tooltip>
          <img src={coin} alt="coin" width="40px" height="40px" />
          <Text fontSize="24px" fontWeight="semibold" letterSpacing="-1px">
            X {coinCount}
            </Text>
        </Flex>
        <Flex w="110px" h="46px" bgColor="#AFD5F4" borderRadius="8px" justify="center" align="center" gap="13px">
          <img src={fishbag} alt="fishbag" width="40px" height="40px" />
          <Text fontSize="20px" fontWeight="semibold">가방</Text>
        </Flex>
      </Flex>
      <Flex w="full" justify="center" position="relative">
      <Box position="absolute" top="10px" left="30px">
      <Tooltip label='Hover me' placement="right">
    <FaInfoCircle size="24px" color="#7c7c7c" position="absolute" top="0" />
  </Tooltip>
  </Box>
        <img src={lotterymachine} alt="lotterymachine" />
      </Flex>
      <Box w="200px" mt="24px">
        <BlueDrawingButton>
            뽑기
        </BlueDrawingButton>
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
