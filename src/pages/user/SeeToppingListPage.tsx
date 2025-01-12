import styled from "@emotion/styled";
import { SettingHeader } from "../../components/user/SettingHeader";
import { Text } from "@chakra-ui/react";
import { SeeToppingsByMe } from "../../components/user/SeeToppingsByMe";
export default function SeeToppnigListPage() {

    return(
        <Wrapper color="#13353B">
            <SettingHeader  text="내가 보낸 빙어" />
            <Text fontSize="14px" color="#777C89" mt="10px">
            물고기를 누르면, 물고기 주인의 페이지를 방문할 수 있어요
            </Text>
            <SeeToppingsByMe />
        </Wrapper>
    );
}


const Wrapper = styled.div`
    width: calc(100% - 60px);
    display: flex;
    flex-direction: column;
    align-items: center;
`;
