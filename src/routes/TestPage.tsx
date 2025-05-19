import { WhiteLeftHeader } from "../components/common/Header";
import { Box, SimpleGrid, Flex, Text, Button } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { mockSmeltsStatistics } from "./mockSmeltsStatistics";
import styled from "@emotion/styled";

export const TestPage = () => {
  return (
    <Wrapper>
      <WhiteLeftHeader text="빙어 보내기" />
      <Flex gap="15px" m="14px 0 40px 0">
        <div
          style={{ width: "60px", height: "1px", backgroundColor: "black" }}
        />
        <div
          style={{ width: "60px", height: "1px", backgroundColor: "#B5B5B5" }}
        />
        <div
          style={{ width: "60px", height: "1px", backgroundColor: "#B5B5B5" }}
        />
      </Flex>

      <Text
        fontSize="16px"
        fontWeight="bold"
        mb="6px"
        w="full"
        textAlign="left"
      >
        빙어 선택
      </Text>

      <Flex
        w="full"
        h="66%"
        maxH="66dvh"
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
          {mockSmeltsStatistics?.map((item) => (
            <Box
              key={item.smeltTypeId}
              w="100%"
              position="relative"
              css={{
                "@media (min-height: 830px) and (max-height: 920px) and (min-width: 600px)":
                  {
                    width: "90%",
                  },
                "@media (min-height: 760px) and (max-height: 830px) and (min-width: 600px)":
                  {
                    width: "86%",
                  },
                "@media (min-height: 600px) and (max-height: 700px) and (min-width: 600px)":
                  {
                    width: "76%",
                    paddingLeft: "20px",
                  },
                "@media (min-height: 700px) and (max-height: 760px) and (min-width: 600px)":
                  {
                    width: "86%",
                    paddingLeft: "20px",
                  },
              }}
            >
              {/* 별 등급 표시 */}
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
                width="100%"
                aspectRatio="1/1"
                position="relative"
                display="flex"
                flexDir="column"
                alignItems="center"
                justifyContent="center"
                borderRadius="8px"
                boxShadow="sm"
                _hover={{
                  transform: item.count > 0 ? "translateY(-2px)" : "none",
                  boxShadow: item.count > 0 ? "md" : "sm",
                }}
                cursor={item.count === 0 ? "not-allowed" : "pointer"}
                transition="all 0.2s"
                opacity={item.count === 0 ? 0.6 : 1}
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
                color={item.count === 0 ? "gray.500" : "black"}
              >
                {item.smeltTypeName} {item.count} 개
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      </Flex>

      <Button
        bg="#03526B"
        color="white"
        fontSize="20px"
        fontWeight="semiBold"
        borderRadius="16px"
        h="45px"
        w="140px"
        position="absolute"
        bottom="23px"
        _hover={{ bg: "#03526B" }}
      >
        다음
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: calc(100% - 40px);
  height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;
