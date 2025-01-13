import { WhiteLeftHeader } from "../../components/common/Header";
import styled from "@emotion/styled";
import { Box, SimpleGrid, Flex, Text, Container } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function FishBagPage() {
  const navigate = useNavigate();

  const data = [
    { id: 1, color: "#D9D9D9", text: "빙어", count: 3, status: "available" },
    { id: 2, color: "tomato", text: "송어", count: 2, status: "available" },
    { id: 3, color: "tomato", text: "복어", count: 1, status: "available" },
    { id: 4, color: "tomato", text: "비단잉어", count: 1, status: "rare" },
    { id: 5, color: "tomato", text: "베타", count: 1, status: "rare" },
    { id: 6, color: "tomato", text: "갈치", count: 1, status: "available" },
    { id: 7, color: "tomato", text: "황금 빙어", count: 1, status: "legendary" },
    { id: 8, color: "tomato", text: "상어", count: 1, status: "legendary" },
    { id: 9, color: "tomato", text: "붕어빵", count: 1, status: "funny" },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "available":
        return "green.400";
      case "rare":
        return "blue.400";
      case "legendary":
        return "yellow.400";
      case "funny":
        return "gray.400";
      default:
        return "gray.200";
    }
  };

  return (
    <Wrapper>
      <WhiteLeftHeader text="내 빙어" onBackClick={() => navigate("/fishdrawing")} />
      <Container maxW="container.xl" pb={8}>
        <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacing={10} mt={4}>
          {data.map((item) => (
            <Box
              key={item.id}
              bg="gray.100"
              maxW="160px"
              w="100%"
              position="relative"
              borderRadius="md"
              overflow="hidden"
              boxShadow="sm"
              _hover={{ transform: "translateY(-2px)", boxShadow: "md" }}
              transition="all 0.2s"
              onClick={() => console.log(`${item.text} clicked!`)}
            >
              {/* 상태 표시 */}
              <Box
                position="absolute"
                top="0"
                left="0"
                bg={getStatusColor(item.status)}
                color="white"
                px={2}
                py={1}
                fontSize="xs"
                fontWeight="bold"
                borderBottomRightRadius="md"
                zIndex="1"
                transform="translate(-10%, -10%) rotate(-25deg)"
              >
                {item.status}
              </Box>

              {/* 물고기 이미지와 정보 */}
              <Flex direction="column" align="center" p={4}>
                <Box
                  bg={item.color}
                  boxSize="84px"
                  borderRadius="full"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  mb={3}
                >
                  <Text fontWeight="bold" color="white">
                    {item.text}
                  </Text>
                </Box>
                <Text fontSize="14px" fontWeight="semibold" textAlign="center">
                  {item.text} {item.count} 개
                </Text>
              </Flex>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
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
