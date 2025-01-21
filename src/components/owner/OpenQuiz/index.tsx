import { useState } from "react";
import { useModalStateStore, useModalOpenStore } from "../../../store/modal";
import { useModalHeight } from "../../../hook/useModalHeight";

import { Circle, X, XIcon } from "lucide-react";
import { Flex, IconButton, Button, useToast } from "@chakra-ui/react";
import {
  quizSampleOXData,
  quizSampleMultipleData,
} from "../../../__mocks__/quiz/data";
import { ModalInsideWhiteContainer } from "../../home/ModalCustomedElement";

import { SendAnswer } from "../../../api/quiz/apis";

export const OpenQuiz = () => {
  const { setModalState } = useModalStateStore();
  const { onClose } = useModalOpenStore();
  const toast = useToast();
  const exampleOXAnswer = "O";
  const exampleMultipleAnswer = 1;

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
      // 선택한 답변에 따라 questionId 추출
      const question = quizSampleOXData.questions.find(
        (q) => q.questionContent === answer
      );

      const requestData = {
        userId: 1, // 사용자 ID
        quizId: quizSampleOXData.quiz.quizId, // 퀴즈 ID
        questionId: question ? question.questionId : 0, // questionId가 없을 경우 기본값 0
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
    } catch (error: unknown) {
      console.error("OX 퀴즈 정답 제출 실패:", error);
      toast({
        title: "오답입니다.",
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
    } catch {
      toast({
        title: "오답입니다.",
        description: "다시 시도해 주세요.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const clickClose = () => {
    onClose();
  };
  // OX 퀴즈 렌더링
  if (quizSampleMultipleData.quiz.quizType === "OX") {
    return (
      <>
        <Flex w="100%" h="30%" mt="20px" justify="center" position="relative">
          <IconButton
            aria-label="close"
            icon={<XIcon onClick={clickClose} />}
            position="absolute"
            top="-50px"
            right="10px"
          />
          <ModalInsideWhiteContainer height="100%">
            Q. {quizSampleOXData.quiz.quizTitle}
          </ModalInsideWhiteContainer>
        </Flex>
        <Flex gap="20px" mt="20px" justify="center">
          <IconButton
            bg="#03526B"
            borderRadius="30px"
            boxSize="140px"
            aria-label="O"
            icon={<Circle size={100} color="white" />}
            _hover={{ bg: "blue.600" }}
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
            bg="#BF2A2A"
            borderRadius="30px"
            boxSize="140px"
            aria-label="X"
            icon={<X size={120} color="white" />}
            _hover={{ bg: "blue.600" }}
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
      <Flex
        w="100%"
        h="100%"
        flexDir="column"
        mt="20px"
        justify="center"
        align="center"
        position="relative"
      >
        <IconButton
          aria-label="close"
          icon={<XIcon onClick={clickClose} />}
          position="absolute"
          top="-10px"
          right="10px"
        />
        <ModalInsideWhiteContainer height="20%">
          Q. {quizSampleMultipleData.quiz.quizTitle}
        </ModalInsideWhiteContainer>

        <Flex
          direction="column"
          gap="10px"
          mt="20px"
          width="100%"
          align="center"
        >
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
      </Flex>
    );
  }

  return null;
};
