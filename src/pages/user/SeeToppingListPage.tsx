import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { WhiteLeftHeader } from "../../components/common/Header";
import { Text, Box } from "@chakra-ui/react";
import { SeeToppingsByMe } from "../../components/user/SeeToppingsByMe";

import { useGetFishingSpotId } from "../../hook/fishingspot/useGetFishingSpotId";

export default function SeeToppnigListPage() {
  const navigate = useNavigate();
  const { data: fishingSpotData } = useGetFishingSpotId();
  return (
    <Wrapper color="#13353B">
      <Box w="calc(100% - 60px)">
        <WhiteLeftHeader
          text="내가 보낸 빙어"
          onBackClick={() =>
            navigate(`/spot/${fishingSpotData?.fishingSpotId}`)
          }
        />
        <Text fontSize="14px" fontWeight="semibold" color="#777C89">
          물고기를 누르면, 물고기 주인의 페이지를 방문할 수 있어요
        </Text>
      </Box>
      <SeeToppingsByMe />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: hidden;
`;
