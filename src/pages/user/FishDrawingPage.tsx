import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { WhiteLeftHeader } from "../../components/common/Header";
import lotterymachine from "../../assets//pictures/lotterymachine.svg";
import coin from "../../assets/pictures/coin.svg";
import fishbag from "../../assets/pictures/fishbag.svg";
import { Flex, Text, Box, VStack, Image } from "@chakra-ui/react";
import { users } from "../../__mocks__/search/data";

export default function FishDrawingPage() {
    const [otherNickname, setOtherNickname] = useState<string>("");
    const navigate = useNavigate();
    // 검색 결과 필터링
    const filteredUsers = otherNickname.trim()
        ? users.filter((user) =>
              user.nickname.includes(otherNickname.trim())
          )
        : [];

    return (
        <Wrapper>
            <WhiteLeftHeader text="빙어 뽑기" onBackClick={()=> (navigate("/"))}/>
                <Flex direction="column">
        <Box>
            <img src=
        </Box>
                </Flex>
          <Box>
            <img src={lotterymachine} alt="lotterymachine" />
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
