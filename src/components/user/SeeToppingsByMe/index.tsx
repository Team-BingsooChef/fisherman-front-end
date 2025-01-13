import { Box, Text, Flex, Image } from "@chakra-ui/react";
import { ModalInsideWhiteContainer } from "../../home/ModalCustomedElement";
import { toppingExamples } from "../../../__mocks__/toppingbyme/data";
import { toppingTypesData } from "../../../__mocks__/toppingtypes/data";

// SeeToppingsByMe 컴포넌트
export const SeeToppingsByMe = () => {
  return (
    <Flex
      mt="20px"
      flexDir="column"
      w="full"
      h="100vh"
      align="center"
      justify="center"
      overflowY="auto"
    >
      <Box
        w="full"
        h="100%"
        bg="none"
      >
        {toppingExamples.map((topping) => (
          <ToppingByMeElement key={topping.id} {...topping} />
        ))}
      </Box>
    </Flex>
  );
};

interface ToppingByMeElementProps {
  nickname: string;
  toppingContent: string;
  isHidden: boolean;
  wrongCount: number;
  isReplied: boolean;
  toppingTypeId: number;
}

const ToppingByMeElement = ({
  nickname,
  toppingContent,
  isHidden,
  wrongCount,
  isReplied,
  toppingTypeId,
}: ToppingByMeElementProps) => {
  // toppingTypeId를 기반으로 defrostedImg 가져오기
  const toppingType = toppingTypesData.find(
    (type: { toppingTypeId: number; defrostedImg: string }) => type.toppingTypeId === toppingTypeId
  );
  const defrostedImg = toppingType?.defrostedImg;

  return (
    <Flex
      flexDir="column"
      w="full"
      justify="center"
      align="center"
      backgroundColor="#AFD5F4"
      h="300px"
      borderRadius="16px"
      mb="16px"
    >
      <Box w="full" p="0 20px 0 20px">
      <Text color="black" fontSize="16px" fontWeight="semibold">
        {nickname}에게
      </Text>
      </Box>
      <ModalInsideWhiteContainer height="160px">
        <Box
          w="full"
          h="full"
          backgroundColor="white"
          borderRadius="16px"
          p="20px"
          position="relative"
        >
          {/* 모서리에 defrostedImg 아이콘 표시 */}
          {defrostedImg && (
  <Image
    src={defrostedImg}
    alt="topping icon"
    position="absolute"
    top="-20px"
    right="0px"
    boxSize="50px"
    cursor="pointer"
    transition="transform 0.2s ease-in-out" // 부드러운 크기 변화를 위한 트랜지션
    _hover={{
      transform: "scale(1.2)", // 호버 시 이미지 크기를 10% 확대
    }}
  />
)}

          <Text fontSize="16px" color="#03526B">
            {toppingContent}
          </Text>
        </Box>
      </ModalInsideWhiteContainer>
      <Box mt="16px">
        {isHidden ? (
          <Text fontSize="14px" color="black" fontWeight="semibold">
            주인이 아직 편지를 열어보지 않았어요!
          </Text>
        ) : (
          <>
            <Text fontSize="14px" color="black"  fontWeight="semibold">
              이 편지는 {wrongCount}번 만에 열어봤어요!
            </Text>
            <Text fontSize="14px" color="black" mt="4px"  fontWeight="semibold">
              {isReplied
                ? "주인이 답장을 남겼어요! 답장 보러 가기"
                : "주인이 답장을 남기지 않았어요."}
            </Text>
          </>
        )}
      </Box>
    </Flex>
  );
};
