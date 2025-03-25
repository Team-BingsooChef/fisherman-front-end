import { Text, Flex, Button, Input } from "@chakra-ui/react";
import { useState } from "react";
import { useSmeltStore } from "../../hook/fishingspot/useSmeltStore";

export const OxQuizSection = () => {
  const { setQuizQuestions, setQuizAnswerIndex } = useSmeltStore();
  const [options, setOptions] = useState([
    { text: "O", isSelected: false }, // 기본 선지 1
    { text: "X", isSelected: false }, // 기본 선지 2
  ]);

  // 선지 선택
  const handleSelectOption = (index: number) => {
    const updatedOptions = options.map((option, i) => ({
      ...option,
      isSelected: i === index,
    }));
    setOptions(updatedOptions);
  };
  const handleInputChange = (index: number, value: string): void => {
    const updatedOptions = options.map((option, i) =>
      i === index ? { ...option, text: value } : option
    );
    setOptions(updatedOptions);
    setQuizQuestions(updatedOptions.map((option) => option.text));
    setQuizAnswerIndex(updatedOptions.findIndex((option) => option.isSelected));
  };

  return (
    <>
      <Text
        fontSize="16px"
        fontWeight="bold"
        mt="19px"
        mb="6px"
        w="full"
        textAlign="left"
      >
        선지 작성
      </Text>
      {/* 선지 입력 필드 */}
      <Flex w="full" gap="10px">
        {options.map((option, index) => (
          <Flex
            key={index}
            align="center"
            bg="white"
            p="10px"
            borderRadius="10px"
            border={option.isSelected ? "2px solid green" : "1px solid #ccc"}
            boxShadow={option.isSelected ? "0 0 5px green" : "none"}
          >
            <Input
              placeholder="선지를 작성해 주세요"
              value={option.text}
              onChange={(e) => handleInputChange(index, e.target.value)}
              bg="white"
              flex="1"
              disabled={true}
            />
            <Button
              ml="10px"
              bg={option.isSelected ? "green.200" : "gray.100"}
              onClick={() => handleSelectOption(index)}
            >
              {option.isSelected ? "정답" : "선택"}
            </Button>
          </Flex>
        ))}
      </Flex>
    </>
  );
};
