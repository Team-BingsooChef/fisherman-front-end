import { WhiteLeftHeader } from "../../components/common/Header";
import styled from "@emotion/styled";
import { Box, SimpleGrid, Flex, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { StarIcon } from "@chakra-ui/icons";
import useSmeltsStatistics from "../../hook/inventory/useSmeltsStatistics";

export default function FishBagPage() {
  const navigate = useNavigate();
  const { data: fishData } = useSmeltsStatistics();

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
        borderRadius="8px"
        px={{ base: 4, md: 6 }}
        py={4}
      >
        <SimpleGrid
          columns={3}
          spacing={{ base: "16px", md: "24px" }}
          width="100%"
          maxW="500px"
        >
          {fishData?.map((item) => (
            <Box key={item.smeltTypeId} w="100%" position="relative">
              {/* 별 등급 */}
              <Box
                position="absolute"
                top="0"
                left="0"
                bg="yellow.400"
                color="white"
                px={2}
                py={1}
                fontSize="xs"
                fontWeight="bold"
                borderBottomRightRadius="md"
                zIndex="1"
                transform="translate(-10%, -10%) rotate(-15deg)"
                boxShadow="md"
                display="flex"
                alignItems="center"
                gap="1px"
              >
                {Array.from({ length: item.starRating }).map((_, i) => (
                  <StarIcon key={i} boxSize={3} />
                ))}
              </Box>

              <Box
                bg="#d9d9d9"
                width="100%"
                aspectRatio="1/1"
                position="relative"
                display="flex"
                flexDir="column"
                alignItems="center"
                justifyContent="center"
                borderRadius="8px"
                boxShadow="sm"
                _hover={{ transform: "translateY(-2px)", boxShadow: "md" }}
                transition="all 0.2s"
              >
                <img
                  src={item.smeltImageUrl}
                  alt="fish"
                  style={{
                    width: "70%",
                    height: "70%",
                    objectFit: "contain",
                  }}
                />
              </Box>
              <Text
                fontSize={{ base: "12px", sm: "14px" }}
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
  height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
