import { useState } from "react";
import { useModalStateStore } from "../../../store/modal";
import { useModalHeight } from "../../../hook/useModalHeight";

import { Circle, X } from "lucide-react";
import { Flex, IconButton, Button, useToast } from "@chakra-ui/react";
import { quizSampleOXData, quizSampleMultipleData } from '../../../__mocks__/quiz/data';
import { ModalTitle, ModalInsideWhiteContainer,} from "../../home/ModalCustomedElement";

import { SendAnswer } from '../../../api/quiz/apis'; 


export const OpenQuiz = () => {
  const { setModalState } = useModalStateStore();
  const toast = useToast();
  const exampleOXAnswer = "O";
  const exampleMultipleAnswer = 1;
  // const { selectedToppingId } = useSelectedToppingStore();
  
  // 나중엔 toppingId, userId로 퀴즈 조회해서 받아옴"

  useModalHeight(quizSampleOXData.quiz.quizType === "Multiple" ? "80%" : "50%");
  // OX 퀴즈 상태
  const [selectedAnswer, setSelectedAnswer] = useState<"O" | "X" | null>(null);
  const [correctAnswer, setCorrectAnswer] = useState<"O" | "X" | null>(null);
 
  // 객관식 퀴즈 상태
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [correctOption, setCorrectOption] = useState<number | null>(null);

  
  // OX 버튼 클릭 핸들러
  const handleOXAnswerClick = async (answer: "O" | "X") => {
    try {
      const requestData = {
        userId: 1,
        quizId: quizSampleOXData.quiz.quizId,
        questionId: quizSampleOXData.questions.find((q) => q.answer === answer)?.questionId || 0,
      };
    const response = await SendAnswer(requestData); 
    setSelectedAnswer(answer); // 선택한 답변 저장
    setCorrectAnswer(exampleOXAnswer); // 정답 저장
    //const isCorrect = exampleOXAnswer === answer; // 정답 확인
    if (response.result) {
      toast({
        title: "정답입니다!",
        description: "토핑이 오픈됩니다.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setModalState("readMessage");
    } else {
      toast({
        title: "틀렸습니다.",
        description: "다시 시도해 주세요.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }catch (error: unknown) {
    console.error("OX 퀴즈 정답 제출 실패:", error);
    toast({
      title: "퀴즈 제출 실패",
      description: "다시 시도해 주세요.",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  }
};


    // 객관식 버튼 클릭 핸들러
    const handleMultipleAnswerClick = async (index: number) => {
      try {
        const requestData = {
          userId: 1,
          quizId: quizSampleMultipleData.quiz.quizId,
          questionId: quizSampleMultipleData.questions[index]?.questionId || 0,
        };
      
      const response = await SendAnswer(requestData);
      setSelectedOption(index);
      setCorrectOption(exampleMultipleAnswer); // 정답 저장

      //onst isCorrect = exampleMultipleAnswer === index; // 정답 확인
      if (response.result) {
        toast({
          title: "정답입니다!",
          description: "토핑이 오픈됩니다.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setModalState("readMessage");
      } else {
        toast({
          title: "틀렸습니다.",
          description: "다시 시도해 주세요.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }catch (error: unknown) {
      console.error("객관식 퀴즈 정답 제출 실패:", error);
      toast({
        title: "퀴즈 제출 실패",
        description: "다시 시도해 주세요.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };


   // OX 퀴즈 렌더링
   if (quizSampleMultipleData.quiz.quizType === "OX") {
    return (
      <>
        <ModalTitle title="OX 퀴즈" />
        <Flex w="100%" h="30%" mt="20px" justify="center">
          <ModalInsideWhiteContainer height="100%">
            Q. {quizSampleOXData.quiz.quizTitle}
          </ModalInsideWhiteContainer>
        </Flex>
        <Flex gap="40px" mt="20px" justify="center">
          <IconButton
            borderRadius="30px"
            boxSize="140px"
            aria-label="O"
            icon={<Circle size={100} color="blue" />}
            border={
              selectedAnswer === "O"
                ? correctAnswer === "O"
                  ? "5px solid green"
                  : "5px solid red"
                : "none"
            }
            onClick={() => handleOXAnswerClick("O")}
          />
          <IconButton
            borderRadius="30px"
            boxSize="140px"
            aria-label="X"
            icon={<X size={120} color="red" />}
            border={
              selectedAnswer === "X"
                ? correctAnswer === "X"
                  ? "5px solid green"
                  : "5px solid red"
                : "none"
            }
            onClick={() => handleOXAnswerClick("X")}
          />
        </Flex>
      </>
    );
  }
   // 객관식 퀴즈 렌더링
   if (quizSampleMultipleData.quiz.quizType === "Multiple") {
    return (
      <>
        <ModalTitle title="객관식 퀴즈" />
        <Flex w="100%" h="30%" mt="20px" justify="center">
          <ModalInsideWhiteContainer>Q. {quizSampleMultipleData.quiz.quizTitle}</ModalInsideWhiteContainer>
        </Flex>
        <Flex direction="column" gap="10px" mt="20px" width="100%" align="center">
          {quizSampleMultipleData.questions.map((option, index) => (
            <Button
            width="calc(100% - 40px)"
              key={index}
              borderRadius="12px"
              onClick={() => handleMultipleAnswerClick(index)}
              border={
                selectedOption === index
                  ? correctOption === index
                    ? "5px solid green"
                    : "5px solid red"
                  : "none"
              }
              bg="#03526B"
              color="white"
              _hover={{ bg: "blue.600" }}
            >
              {option.questionContent}
            </Button>
          ))}
        </Flex>
      </>
    );
  }

  return null;
};