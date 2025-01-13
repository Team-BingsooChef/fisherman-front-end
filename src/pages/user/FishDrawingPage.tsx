import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { WhiteLeftHeader } from "../../components/common/Header";
import { BlueDrawingButton } from "../../components/common/CustomedButton";
import lotterymachine from "../../assets//pictures/lotterymachine.svg";
import coin from "../../assets/pictures/coin.svg";
import fishbag from "../../assets/pictures/fishbag.svg";
import { Flex, Text, Box, VStack, Image } from "@chakra-ui/react";
import { users } from "../../__mocks__/search/data";

export default function FishDrawingPage() {
  const [otherNickname, setOtherNickname] = useState<string>("");
  const [coinCount, setCoinCount] = useState<number>(0);
  const navigate = useNavigate();

  return (
    <Wrapper>
      <WhiteLeftHeader text="빙어 뽑기" onBackClick={() => navigate("/")} />
      <Flex direction="column" align="flex-end" w="full" gap="13px">
        <Flex w="120px" h="44px" bgColor="#AFD5F4" borderRadius="8px"> 
          <img src={coin} alt="coin" />
          <Text fontSize="20px" fontWeight="semibold">X {coinCount}</Text>
        </Flex>
        <Flex w="120px" h="44px" bgColor="#AFD5F4" borderRadius="8px">
          <img src={fishbag} alt="fishbag" />
          <Text fontSize="20px" fontWeight="semibold">가방</Text>
        </Flex>
      </Flex>
      <Box>
        <img src={lotterymachine} alt="lotterymachine" />
      </Box>
      <Box w="200px">
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
