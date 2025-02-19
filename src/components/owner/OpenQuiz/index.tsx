import { useState, useEffect } from "react";
import { useModalStateStore, useModalOpenStore } from "../../../store/modal";
import { useModalHeight } from "../../../hook/useModalHeight";
import shark from "../../../assets/pictures/shark.svg";
import { Circle, X, XIcon } from "lucide-react";
import { Flex, IconButton, Button, Text, Image } from "@chakra-ui/react";
import {
  quizSampleOXData,
  quizSampleMultipleData,
} from "../../../__mocks__/quizData";
import { ModalInsideWhiteContainer } from "../../home/modal/ModalCustomedElement";

export const OpenQuiz = () => {
  const { setModalState } = useModalStateStore();
  const { onClose } = useModalOpenStore();
  const exampleOXAnswer = "O";
  const exampleMultipleAnswer = 1;

  const isMultipleQuiz = true;

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

  const [selectedAnswer, setSelectedAnswer] = useState<"O" | "X" | null>(null);
  const [correctAnswer, setCorrectAnswer] = useState<"O" | "X" | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [correctOption, setCorrectOption] = useState<number | null>(null);

  const handleClose = () => onClose();

  // OX 퀴즈 핸들러 (정답 체크 X, 단순 UI 변경만)
  const handleOXAnswerClick = (answer: "O" | "X") => {
    setSelectedAnswer(answer);
    setCorrectAnswer(exampleOXAnswer);
    setModalState("readMessage");
  };

  // 객관식 퀴즈 핸들러 (정답 체크 X, 단순 UI 변경만)
  const handleMultipleAnswerClick = (index: number) => {
    setSelectedOption(index);
    setCorrectOption(exampleMultipleAnswer);
    setModalState("readMessage");
  };

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

const Question = ({ title }: { title: string }) => (
  <Flex w="100%" h="30%" mt="20px" justify="center" position="relative">
    <ModalInsideWhiteContainer height="100%">
      Q. {title}
    </ModalInsideWhiteContainer>
  </Flex>
);
