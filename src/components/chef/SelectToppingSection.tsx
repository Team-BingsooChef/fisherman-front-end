import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { WhiteLeftHeader } from "../../components/common/Header";
import { Box, SimpleGrid, Flex, Text, Button } from "@chakra-ui/react";
import { fishdata } from "../../__mocks__/fishData";

export const SelectToppingSection = ({ onNext }: { onNext: () => void }) => {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const handleItemClick = (id: string) => {
    setSelectedItem((prev) => (prev === id ? null : id)); // 동일 아이템 클릭 시 선택 해제
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
                onClick={() => handleItemClick(item.id.toString())} // 클릭 핸들러 추가
                bg={selectedItem === item.id.toString() ? "#E0F7FA" : "#d9d9d9"} // 선택된 아이템 강조
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
        onClick={onNext} // onNext 사용
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
        isDisabled={!selectedItem} // 선택된 아이템 없을 시 비활성화
      >
        다음
      </Button>
    </>
  );
};
