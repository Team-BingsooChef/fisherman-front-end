import { WhiteLeftHeader } from "../../components/common/Header";
import styled from "@emotion/styled";
import { Box, SimpleGrid, Flex, Text, Container } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function FishBagPage() {
  const navigate = useNavigate();

  const data = [
    { id: 1, color: "#D9D9D9", text: "빙어", count: 3, status: "common", image: "/src/assets/toppings/oreo.svg" },
    { id: 2, color: "tomato", text: "송어", count: 2, status: "common", image: "/src/assets/toppings/oreo.svg" },
    { id: 3, color: "tomato", text: "복어", count: 1, status: "common", image: "/src/assets/toppings/oreo.svg" },
    { id: 4, color: "tomato", text: "비단잉어", count: 1, status: "rare", image: "/src/assets/toppings/oreo.svg" },
    { id: 5, color: "tomato", text: "베타", count: 1, status: "rare", image: "/src/assets/toppings/oreo.svg" },
    { id: 6, color: "tomato", text: "갈치", count: 1, status: "rare", image: "/src/assets/toppings/oreo.svg" },
    { id: 7, color: "tomato", text: "황금 빙어", count: 1, status: "legendary", image: "/src/assets/toppings/oreo.svg" },
    { id: 8, color: "tomato", text: "상어", count: 1, status: "legendary", image: "/src/assets/toppings/oreo.svg" },
    { id: 9, color: "tomato", text: "붕어빵", count: 1, status: "funny", image: "/src/assets/toppings/oreo.svg" },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "common":
        return "green.400";
      case "rare":
        return "pink.300";
      case "legendary":
        return "red.500";
      case "funny":
        return "yellow.400";
      default:
        return "gray.200";
    }
  };

  return (
    <Wrapper>
      <WhiteLeftHeader text="내 빙어" onBackClick={() => navigate("/fishdrawing")} />
        <Flex w="full" h="full" flexDir="column" align="center" bg="white" border={1} borderColor="gray.400" borderRadius="8px">
        <SimpleGrid columns={3} spacing="20px" mt={4}>
          {data.map((item) => (
            <Box
              key={item.id}
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
                borderRadius="8px"
                zIndex="1"
                transform="translate(-10%, -10%) rotate(-25deg)"
              >
                {item.status}
              </Box>

              {/* 물고기 이미지와 정보 */}
          
                <Box
                  boxSize="90px"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  
                >
                <img src={item.image} alt="fish" width="70px" height="70px" />
                </Box>
                <Text fontSize="14px" fontWeight="semibold" textAlign="center">
                  {item.text} {item.count} 개
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
