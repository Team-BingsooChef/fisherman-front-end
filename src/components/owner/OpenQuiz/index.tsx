import { useState, useEffect } from "react";
import { useModalStateStore, useModalOpenStore } from "../../../store/modal";
import { useModalHeight } from "../../../hook/useModalHeight";
import shark from "../../../assets/pictures/shark.svg";
import { Circle, X, XIcon } from "lucide-react";
import {
  Flex,
  IconButton,
  Button,
  useToast,
  Text,
  Image,
} from "@chakra-ui/react";
import {
  quizSampleOXData,
  quizSampleMultipleData,
} from "../../../__mocks__/quizData";
import { ModalInsideWhiteContainer } from "../../home/modal/ModalCustomedElement";

export const OpenQuiz = () => {
  const { setModalState } = useModalStateStore();
  const { onClose } = useModalOpenStore();
  const toast = useToast();
  const exampleOXAnswer = "O";
  const exampleMultipleAnswer = 1;

  // 객관식 퀴즈 여부 확인
  const isMultipleQuiz = true;

  // 모달 높이 동적 계산
  const [modalHeight, setModalHeight] = useState("50%");

  useEffect(() => {
    if (isMultipleQuiz) {
      const questionCount = quizSampleMultipleData.questions.length;
      const height =
        questionCount <= 2 ? "50%" : questionCount === 3 ? "60%" : "70%";
      setModalHeight(height);
    } else {
      setModalHeight("50%");
    }
  }, [isMultipleQuiz]);

  useModalHeight(modalHeight);

  // 상태 관리
  const [selectedAnswer, setSelectedAnswer] = useState<"O" | "X" | null>(null);
  const [correctAnswer, setCorrectAnswer] = useState<"O" | "X" | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [correctOption, setCorrectOption] = useState<number | null>(null);

  const handleClose = () => onClose();

  // 공통 Toast 핸들러
  const showToast = (
    title: string,
    description: string,
    status: "success" | "error"
  ) => {
    toast({
      title,
      description,
      status,
      duration: 3000,
      isClosable: true,
    });
  };

  // OX 퀴즈 핸들러
  const handleOXAnswerClick = async (answer: "O" | "X") => {
    try {
      const question = quizSampleOXData.questions.find(
        (q) => q.questionContent === answer
      );
      const requestData = {
        userId: 1,
        quizId: quizSampleOXData.quiz.quizId,
        questionId: question?.questionId || 0,
      };

      const response = await SendAnswer(requestData);
      setSelectedAnswer(answer);
      setCorrectAnswer(exampleOXAnswer);

      if (response.result) {
        showToast("정답입니다!", "토핑이 오픈됩니다.", "success");
        setModalState("readMessage");
      } else {
        showToast("틀렸습니다.", "다시 시도해 주세요.", "error");
      }
    } catch {
      showToast("오답입니다.", "다시 시도해 주세요.", "error");
    }
  };

  // 객관식 퀴즈 핸들러
  const handleMultipleAnswerClick = async (index: number) => {
    try {
      const requestData = {
        userId: 1,
        quizId: quizSampleMultipleData.quiz.quizId,
        questionId: quizSampleMultipleData.questions[index]?.questionId || 0,
      };

      const response = await SendAnswer(requestData);
      setSelectedOption(index);
      setCorrectOption(exampleMultipleAnswer);

      if (response.result) {
        showToast("정답입니다!", "토핑이 오픈됩니다.", "success");
        setModalState("readMessage");
      } else {
        showToast("틀렸습니다.", "다시 시도해 주세요.", "error");
      }
    } catch {
      showToast("오답입니다.", "다시 시도해 주세요.", "error");
    }
  };

  // OX 퀴즈 UI
  const renderOXQuiz = () => (
    <Flex w="100%" h="100%" flexDir="column" align="center" position="relative">
      <Header onClose={handleClose} />
      <Question title={quizSampleOXData.quiz.quizTitle} />
      <Flex gap="20px" mt="20px" justify="center">
        {["O", "X"].map((answer) => (
          <IconButton
            key={answer}
            bg={answer === "O" ? "#03526B" : "#BF2A2A"}
            borderRadius="30px"
            boxSize="140px"
            aria-label={answer}
            icon={
              answer === "O" ? (
                <Circle size={100} color="white" />
              ) : (
                <X size={120} color="white" />
              )
            }
            _hover={{ bg: "blue.600" }}
            border={
              selectedAnswer === answer
                ? correctAnswer === answer
                  ? "5px solid green"
                  : "5px solid red"
                : "none"
            }
            onClick={() => handleOXAnswerClick(answer as "O" | "X")}
          />
        ))}
      </Flex>
    </Flex>
  );

  // 객관식 퀴즈 UI
  const renderMultipleQuiz = () => (
    <>
      <Header onClose={handleClose} />
      <Question title={quizSampleMultipleData.quiz.quizTitle} />
      <Flex direction="column" gap="10px" mt="20px" width="100%" align="center">
        {quizSampleMultipleData.questions.map((option, index) => (
          <Button
            key={index}
            width="calc(100% - 40px)"
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

  return isMultipleQuiz ? renderMultipleQuiz() : renderOXQuiz();
};

// 공통 컴포넌트: 헤더
const Header = ({ onClose }: { onClose: () => void }) => (
  <Flex w="full" justify="center" align="center" p="10px">
    <Image src={shark} boxSize="80px" position="absolute" top="-40px" />
    <Text fontSize="24px" fontWeight="bold" color="#03526B">
      퀴즈
    </Text>
    <IconButton
      aria-label="close"
      icon={<XIcon />}
      onClick={onClose}
      position="absolute"
      top="10px"
      right="10px"
    />
  </Flex>
);

// 공통 컴포넌트: 질문
const Question = ({ title }: { title: string }) => (
  <Flex w="100%" h="30%" mt="20px" justify="center" position="relative">
    <ModalInsideWhiteContainer height="100%">
      Q. {title}
    </ModalInsideWhiteContainer>
  </Flex>
);
