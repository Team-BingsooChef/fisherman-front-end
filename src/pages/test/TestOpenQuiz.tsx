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
import { useQueryQuiz } from "../../hook/smelts/useQueryQuiz";
import { useSmeltsImg } from "../../hook/smelts/useSmeltsImg";
import { useSolveQuiz } from "../../hook/smelts/useSolveQuiz";
import { useResponsive } from "../../hook/global/useResponsive";
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
  const [modalHeight, setModalHeight] = useState("50%");
  const { isMobile, isTablet, isDesktop, isLargeDesktop } = useResponsive();

  useEffect(() => {
    let baseHeight = 50;
    if (mockQuizQueryData?.quiz.type === "MULTIPLE") {
      const questionCount = mockQuizQueryData.questions.length;
      baseHeight = questionCount <= 2 ? 50 : questionCount === 3 ? 60 : 70;
    }

    if (isMobile) {
      baseHeight += 20;
    } else if (isTablet) {
      baseHeight += 10;
    } else if (isLargeDesktop) {
      baseHeight -= 10;
    }

    setModalHeight(`${baseHeight}%`);
  }, [mockQuizQueryData, isMobile, isTablet, isDesktop, isLargeDesktop]);
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
      <Flex direction="column" gap="10px" mt="20px" width="100%" align="center">
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
  <Flex w="100%" h="30%" mt="20px" justify="center" position="relative">
    <ModalInsideWhiteContainer height="100%">
      Q. {title}
    </ModalInsideWhiteContainer>
  </Flex>
);
