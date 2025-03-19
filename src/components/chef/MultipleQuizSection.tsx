import { Text, Flex, Button, Input } from "@chakra-ui/react";
import { useState } from "react";
import { useSmeltStore } from "../../hook/fishingspot/useSmeltStore";

export const MultipleQuizSection = () => {
  const [options, setOptions] = useState([
    { text: "", isSelected: false }, // 기본 선지 1
    { text: "", isSelected: false }, // 기본 선지 2
  ]);
  const { quiz, setQuiz } = useSmeltStore();
  const addOption = () => {
    if (options.length < 4) {
      setOptions([...options, { text: "", isSelected: false }]);
    }
  };
  // 입력값 변경
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleInputChange = (index: number, value: any) => {
    const updatedOptions = options.map((option, i) =>
      i === index ? { ...option, text: value } : option
    );
    setOptions(updatedOptions);
    setQuiz({
      ...quiz,
      title: quiz?.title || "",
      content: quiz?.content || "",
      type: quiz?.type || "",
      answerIndex: quiz?.answerIndex || 0,
      questions: updatedOptions.map((option) => option.text),
    });
  };

  // 선지 선택
  const handleSelectOption = (index: number) => {
    const updatedOptions = options.map((option, i) => ({
      ...option,
      isSelected: i === index, // 선택된 선지만 true로 설정
    }));
    setOptions(updatedOptions);
    setQuiz({
      ...quiz,
      title: quiz?.title || "",
      content: quiz?.content || "",
      type: quiz?.type || "",
      answerIndex: index,
      questions: updatedOptions.map((option) => option.text),
    });
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
      <Flex w="full" direction="column" gap="10px">
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

        {/* 선지 추가 버튼: 선지 개수가 4개 미만일 때만 표시 */}
        {options.length < 4 && (
          <Button
            onClick={addOption}
            variant="outline"
            bg="transparent"
            border="1px dashed #ccc"
            color="#888"
            _hover={{ bg: "white", color: "black" }}
          >
            + 클릭해서 선지를 추가하세요
          </Button>
        )}
      </Flex>
    </>
  );
};
