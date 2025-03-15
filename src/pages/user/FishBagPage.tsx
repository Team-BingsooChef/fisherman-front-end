import { WhiteLeftHeader } from "../../components/common/Header";
import styled from "@emotion/styled";
import { Box, SimpleGrid, Flex, Text } from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
import useSmeltsStatistics from "../../hook/inventory/useSmeltsStatistics";
export default function FishBagPage() {
  const navigate = useNavigate();
  const inventoryId = Number(localStorage.getItem("InventoryId"));
  const { data: fishData } = useSmeltsStatistics(inventoryId);
  return (
    <Wrapper>
      <WhiteLeftHeader
        text="내 빙어"
        onBackClick={() => navigate("/fishdrawing")}
      />
      <Flex
        w="full"
        h="full"
        flexDir="column"
        align="center"
        bg="white"
        border={1}
        borderColor="gray.400"
        borderRadius="8px"
      >
        <SimpleGrid columns={3} spacing="20px" mt={4}>
          {fishData?.map((item) => (
            <Box key={item.smeltTypeId}>
              <Box
                bg="#d9d9d9"
                boxSize="100px"
                position="relative"
                display="flex"
                flexDir="column"
                alignItems="center"
                borderRadius="8px"
                boxShadow="sm"
                _hover={{ transform: "translateY(-2px)", boxShadow: "md" }}
                transition="all 0.2s"
              >
                {/* 물고기 이미지와 정보 */}

                <Box
                  boxSize="90px"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <img
                    src={item.smeltImageUrl}
                    alt="fish"
                    width="70px"
                    height="70px"
                  />
                </Box>
              </Box>
              <Text
                fontSize="14px"
                fontWeight="semibold"
                textAlign="center"
                mt="4px"
              >
                {item.smeltTypeName} {item.count} 개
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      </Flex>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: calc(100% - 60px);
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
