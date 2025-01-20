import { useNavigate } from "react-router-dom";
import { WhiteLeftHeader } from "../../components/common/Header";
import { Box, SimpleGrid, Flex, Text, Button } from "@chakra-ui/react";
import { fishdata } from "../../__mocks__/fish/data";

export const SelectToppingSection = () => {
  const navigate = useNavigate();
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
    <>
      <WhiteLeftHeader text="빙어 보내기" onBackClick={() => navigate("/")} />
      <Flex gap="15px" m="14px 0 40px 0">
        <div
          style={{ width: "60px", height: "1px", backgroundColor: "black" }}
        ></div>
        <div
          style={{ width: "60px", height: "1px", backgroundColor: "#B5B5B5" }}
        ></div>
        <div
          style={{ width: "60px", height: "1px", backgroundColor: "#B5B5B5" }}
        ></div>
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
        flexDir="column"
        align="center"
        bg="white"
        border={1}
        borderColor="gray.400"
        borderRadius="8px"
      >
        <SimpleGrid columns={3} spacing="20px" mt={4}>
          {fishdata.map((item) => (
            <Box key={item.id}>
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
              </Box>
              <Text
                fontSize="14px"
                fontWeight="semibold"
                textAlign="center"
                mt="4px"
              >
                {item.text} {item.count} 개
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
      >
        다음
      </Button>
    </>
  );
};
