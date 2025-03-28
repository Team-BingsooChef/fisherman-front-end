import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { WhiteLeftHeader } from "../../components/common/Header";
import { Box, SimpleGrid, Flex, Text, Button } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import useSmeltsStatistics from "../../hook/inventory/useSmeltsStatistics";
import { useSmeltStore } from "../../hook/fishingspot/useSmeltStore";

export const SelectToppingSection = ({ onNext }: { onNext: () => void }) => {
  const { data } = useSmeltsStatistics();
  const navigate = useNavigate();
  const { setSmeltTypeId } = useSmeltStore();
  const [selectedTypeId, setSelectedTypeId] = useState<number | null>(null);

  const handleItemClick = (id: number, count: number) => {
    if (count === 0) {
      return;
    }
    setSelectedTypeId((prev) => (prev === id ? null : id));
    if (selectedTypeId !== id) {
      setSmeltTypeId(id);
    }
  };

  const currentFishingSpotId = Number(
    localStorage.getItem("currentFishingSpotId")
  );

  return (
    <>
      <WhiteLeftHeader
        text="빙어 보내기"
        onBackClick={() => navigate(`/${currentFishingSpotId}`)}
      />
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
          {data?.map((item) => (
            <Box key={item.smeltTypeId} w="100%" position="relative">
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
                onClick={() => handleItemClick(item.smeltTypeId, item.count)}
                bg={selectedTypeId === item.smeltTypeId ? "#E0F7FA" : "#d9d9d9"}
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
        onClick={onNext}
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
        isDisabled={!selectedTypeId}
      >
        다음
      </Button>
    </>
  );
};
