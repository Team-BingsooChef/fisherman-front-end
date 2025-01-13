import { Box, Text, Flex, Image } from "@chakra-ui/react";
import { ModalInsideWhiteContainer } from "../../home/ModalCustomedElement";
import { toppingExamples } from "../../../__mocks__/toppingbyme/data";
import { toppingTypesData } from "../../../__mocks__/toppingtypes/data";

// SeeToppingsByMe 컴포넌트
export const SeeToppingsByMe = () => {
  return (
    <Flex
      m="20px 0 10px 0"
      flexDir="column"
      w="calc(100% - 48px)"
      h="100%"
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
  repliedContent: string;
  toppingTypeId: number;
}

const ToppingByMeElement = ({
  nickname,
  toppingContent,
  isHidden,
  wrongCount,
  isReplied,
  repliedContent,
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
      h="auto"
      borderRadius="16px"
      mb="16px"
    >
      <Box w="full" p="0 20px 0 20px">
      <Text color="black" fontSize="16px" fontWeight="semibold" m="24px 0 10px 0">
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
    transition="transform 0.2s ease-in-out" 
    _hover={{
      transform: "scale(1.2)",
    }}
  />
)}

          <Text fontSize="16px" color="black" fontWeight="medium">
            {toppingContent}
          </Text>
        </Box>
      </ModalInsideWhiteContainer>
        {isHidden ? (
          <Text fontSize="14px" color="black" m="20px 0 20px 0"fontWeight="semibold">
            아직 열어 보지 않았어요.
          </Text>
        ) : (
          <>
        {/* 답장이 있을 경우 */}
{isReplied && (
  <>
    <Box w="full" p="0 20px 0 20px">
      <Text color="black" fontSize="16px" fontWeight="semibold" m="20px 0 10px 0">
        답장
      </Text>
    </Box>
    <ModalInsideWhiteContainer height="60px">
      <Box
        w="full"
        h="full"
        backgroundColor="white"
        borderRadius="16px"
        p="20px"
        position="relative"
      >
        <Text fontSize="16px" color="black" fontWeight="medium">
          {/* 답장 내용을 표시 (예: "답장 내용입니다.") */}
          {repliedContent}
        </Text>
      </Box>
    </ModalInsideWhiteContainer>
    </>
)}
          <Text fontSize="14px" color="black" m="20px 0 20px 0"fontWeight="semibold">
              이 편지는 {wrongCount}번 만에 열어봤어요!
            </Text>
          </>
        )}
    </Flex>
  );
};