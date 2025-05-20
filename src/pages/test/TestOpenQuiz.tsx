import { useState, useEffect } from "react";
import { useModalStateStore, useModalOpenStore } from "../../store/modal";
import { useModalHeight } from "../../hook/useModalHeight";
import { Circle, X, XIcon } from "lucide-react";
import {
  Flex,
  IconButton,
  Button,
  Text,
  Image,
  keyframes,
} from "@chakra-ui/react";
import { ModalInsideWhiteContainer } from "../../components/home/modal/ModalCustomedElement";

import shark from "../../assets/fish/Shark.svg";
import { mockQuizOX } from "./mockQuizOX";
import { mockQuizQueryData } from "./mockQuizqueryData";

// 흔들림 애니메이션
const shake = keyframes`
  0% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-5px); }
  100% { transform: translateX(0); }
`;

export const TestOpenQuiz = () => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [correctAnswer, setCorrectAnswer] = useState<boolean | null>(null);
  const [wrongAnswer, setWrongAnswer] = useState<string | null>(null); // 오답 상태
  const [isShaking, setIsShaking] = useState(false); // 흔들림 상태

  const { setModalState } = useModalStateStore();
  const { onClose } = useModalOpenStore();
  const [modalHeight, setModalHeight] = useState("500px");

  useEffect(() => {
    let modalHeight = 380; // 기본값

    // 문제 개수에 따라 modalHeight 조정
    if (mockQuizQueryData?.quiz.type === "MULTIPLE") {
      const questionCount = mockQuizQueryData.questions.length;
      if (questionCount <= 2) {
        modalHeight = 320;
      } else if (questionCount === 3) {
        modalHeight = 390;
      } else {
        modalHeight = 420;
      }
    }

    // 기기 해상도(width, height)별 분기
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;

    if (windowWidth < 600) {
      // 모바일 (가로 600 미만)
      if (windowHeight < 600) {
        modalHeight += 0; // 필요하면 조정
      } else if (windowHeight < 730) {
        modalHeight += 40;
      } else if (windowHeight < 850) {
        modalHeight += 60;
      } else {
        modalHeight += 80;
      }
    } else {
      // 태블릿/PC (가로 600 이상)
      if (windowHeight < 750) {
        modalHeight += 10;
      } else if (windowHeight < 820) {
        modalHeight += 30;
      } else {
        modalHeight += 50;
      }
    }

    setModalHeight(`${modalHeight}px`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mockQuizQueryData]);
  useModalHeight(modalHeight);

  const handleClose = () => onClose();

  useEffect(() => {
    if (wrongAnswer) {
      setIsShaking(true);
      const timer = setTimeout(() => {
        setWrongAnswer(null);
        setIsShaking(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [wrongAnswer]);

  const renderOXQuiz = () => (
    <Flex w="100%" h="100%" flexDir="column" align="center" position="relative">
      <Header onClose={handleClose} img={shark} />
      <Question title={mockQuizOX.quiz.title ?? "퀴즈 조회 X"} />
      <Flex gap="20px" mt="20px" justify="center">
        {mockQuizOX?.questions.map((option) => (
          <IconButton
            key={option.id}
            bg={option.content === "O" ? "#03526B" : "#BF2A2A"}
            borderRadius="30px"
            boxSize="140px"
            aria-label={option.content}
            icon={
              option.content === "O" ? (
                <Circle size={100} color="white" />
              ) : (
                <X size={120} color="white" />
              )
            }
            _hover={{ bg: "blue.600" }}
            border={
              correctAnswer === true && selectedAnswer === option.id.toString()
                ? "5px solid green"
                : wrongAnswer === option.id.toString()
                ? "5px solid red"
                : "none"
            }
            animation={
              wrongAnswer === option.id.toString() && isShaking
                ? `${shake} 0.5s ease-in-out`
                : "none"
            }
            isDisabled={correctAnswer === true}
          />
        ))}
      </Flex>
    </Flex>
  );

  const renderMultipleQuiz = () => (
    <>
      <Header onClose={handleClose} img={shark} />
      <Question title={mockQuizQueryData?.quiz.title ?? "퀴즈 조회 X"} />
      <Flex
        direction="column"
        gap="10px"
        mt={mockQuizQueryData?.questions.length === 2 ? "10px" : "0px"}
        mb="5px"
        width="100%"
        align="center"
      >
        {mockQuizQueryData?.questions.map((option) => (
          <Button
            key={option.id}
            width="calc(100% - 40px)"
            borderRadius="12px"
            border={
              correctAnswer === true && selectedAnswer === option.id.toString()
                ? "5px solid green"
                : wrongAnswer === option.id.toString()
                ? "5px solid red"
                : "none"
            }
            animation={
              wrongAnswer === option.id.toString() && isShaking
                ? `${shake} 0.5s ease-in-out`
                : "none"
            }
            bg="#03526B"
            color="white"
            _hover={{ bg: "blue.600" }}
            isDisabled={correctAnswer === true}
          >
            {option.content}
          </Button>
        ))}
      </Flex>
    </>
  );

  return mockQuizQueryData?.quiz.type === "MULTIPLE"
    ? renderMultipleQuiz()
    : renderOXQuiz();
};

const Header = ({ onClose, img }: { onClose: () => void; img: string }) => (
  <Flex w="full" justify="center" align="center" p="10px">
    <Image src={img} boxSize="80px" position="absolute" top="-50px" />
    <Text fontSize="24px" fontWeight="bold" color="#03526B" mt="30px">
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
  <Flex w="100%" h="30%" mt="10px" justify="center" position="relative">
    <ModalInsideWhiteContainer height="200px" state="quiz">
      Q. {title}
    </ModalInsideWhiteContainer>
  </Flex>
);
