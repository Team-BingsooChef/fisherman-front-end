import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { WhiteLeftHeader } from "../../components/common/Header";
import { WhiteInput } from "../../components/user/CustomedInput";
import { Search } from "lucide-react";
import { Flex, Text, VStack, Image } from "@chakra-ui/react";

import { useSearchFishingSpot } from "../../hook/fishingspot/useSerachFishingSpot";
import { useGetFishingSpotId } from "../../hook/fishingspot/useGetFishingSpotId";

export default function SearchPage() {
  const navigate = useNavigate();
  const [otherNickname, setOtherNickname] = useState<string>("");

  const { data, isLoading } = useSearchFishingSpot(otherNickname);
  const { data: fishingSpotData } = useGetFishingSpotId();

  return (
    <Wrapper>
      <WhiteLeftHeader
        text="낚시꾼 찾기"
        onBackClick={() => navigate(`/${fishingSpotData?.fishingSpotId}`)}
      />

      <Flex align="center" w="full" gap="8px">
        <WhiteInput
          icon={<Search size={24} color="#000000" />}
          value={otherNickname}
          placeholder="낚시꾼 이름으로 찾기"
          handleChange={(e) => setOtherNickname(e.target.value)}
        ></WhiteInput>
      </Flex>
      {/* 검색 결과 */}
      <VStack align="center" mt="20px" w="full" spacing="8px">
        {/* {data?.map((user) => ( */}
        {data && (
          <Flex
            key={data.fishingSpotId}
            p="12px"
            w="90%"
            borderWidth="1px"
            borderRadius="16px"
            borderColor="#E2E8F0"
            bg="#F7FAFC"
            align="center"
            cursor="pointer"
            onClick={() => navigate(`/${data.fishingSpotId}`)}
          >
            {/* <Image
              src={user.profileImg}
              boxSize="40px"
              borderRadius="full"
              objectFit="contain"
            /> */}
            <Text
              ml="8px"
              fontSize="20px"
              fontWeight="semibold"
              color="#737373"
            >
              {data.nickname}
            </Text>
          </Flex>
        )}
        {!data && (
          <Text fontSize="14px" color="#777C89">
            검색 결과가 없습니다.
          </Text>
        )}
      </VStack>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: calc(100% - 60px);
  display: flex;
  flex-direction: column;
  align-items: center;
`;
