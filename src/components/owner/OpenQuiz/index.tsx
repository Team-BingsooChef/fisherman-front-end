import { useState, useEffect } from "react";
import { useModalStateStore, useModalOpenStore } from "../../../store/modal";
import { useModalHeight } from "../../../hook/useModalHeight";
import { Circle, X, XIcon } from "lucide-react";
import { Flex, IconButton, Button, Text, Image } from "@chakra-ui/react";

import { ModalInsideWhiteContainer } from "../../home/modal/ModalCustomedElement";

import { useQueryQuiz } from "../../../hook/smelts/useQueryQuiz";
import { useSmeltsImg } from "../../../hook/smelts/useSmeltsImg";
import { useSmeltsDetail } from "../../../hook/smelts/useSmeltsDetail";
import { useSolveQuiz } from "../../../hook/smelts/useSolveQuiz"; // 추가

export const OpenQuiz = () => {
  const selectedToppingId = Number(localStorage.getItem("selectedToppingId"));
  const { data } = useQueryQuiz(selectedToppingId);
  const { getImageUrl } = useSmeltsImg();
  const { data: smeltsDetail } = useSmeltsDetail(selectedToppingId);
  const { mutate: solveQuizMutate } = useSolveQuiz(selectedToppingId); // 추가

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null); // 선택한 답변
  const [correctAnswer, setCorrectAnswer] = useState<boolean | null>(null); // 정답 여부

  const imgURL =
    smeltsDetail?.smelt.status === "READ"
      ? getImageUrl(smeltsDetail?.smelt.smeltTypeId ?? 1) || ""
      : getImageUrl(smeltsDetail?.smelt.smeltTypeId ?? 1, true) || "";

  const { setModalState } = useModalStateStore();
  const { onClose } = useModalOpenStore();

  const [modalHeight, setModalHeight] = useState("50%");

  useEffect(() => {
    if (data?.quiz.type === "MULTIPLE") {
      const questionCount = data.questions.length;
      const height =
        questionCount <= 2 ? "50%" : questionCount === 3 ? "60%" : "70%";
      setModalHeight(height);
    } else {
      setModalHeight("50%");
    }
  }, [data]);

  useModalHeight(modalHeight);

  const handleClose = () => onClose();

  // 답변 선택 시 호출되는 함수
  const clickAnswer = (questionId: number) => {
    if (selectedAnswer !== null) {
      return;
    } // 이미 답변을 선택한 경우 무시

    setSelectedAnswer(questionId.toString());

    // 퀴즈 정답 제출
    solveQuizMutate(
      { questionId },
      {
        onSuccess: (response) => {
          setCorrectAnswer(response.result); // 정답 여부 저장
          if (response.result) {
            setTimeout(() => {
              setModalState("readmessage"); // 정답이면 모달 상태 변경
            }, 1000); // 1초 후에 모달 상태 변경
          }
        },
        onError: (error) => {
          console.error("퀴즈 제출 실패:", error);
        },
      }
    );
  };

  const renderOXQuiz = () => (
    <Flex w="100%" h="100%" flexDir="column" align="center" position="relative">
      <Header onClose={handleClose} img={imgURL} />
      <Question title={data?.quiz.title ?? "퀴즈 조회 X"} />
      <Flex gap="20px" mt="20px" justify="center">
        {data?.questions.map((option, index) => (
          <IconButton
            key={index}
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
              selectedAnswer === option.content
                ? correctAnswer === true
                  ? "5px solid green"
                  : correctAnswer === false
                  ? "5px solid red"
                  : "none"
                : "none"
            }
            onClick={() => clickAnswer(option.id)}
          />
        ))}
      </Flex>
    </Flex>
  );

  const renderMultipleQuiz = () => (
    <>
      <Header onClose={handleClose} img={imgURL} />
      <Question title={data?.quiz.title ?? "퀴즈 조회 X"} />
      <Flex direction="column" gap="10px" mt="20px" width="100%" align="center">
        {data?.questions.map((option, index) => (
          <Button
            key={index}
            width="calc(100% - 40px)"
            borderRadius="12px"
            onClick={() => clickAnswer(option.id)}
            border={
              selectedAnswer === option.id.toString()
                ? correctAnswer === true
                  ? "5px solid green"
                  : correctAnswer === false
                  ? "5px solid red"
                  : "none"
                : "none"
            }
            bg="#03526B"
            color="white"
            _hover={{ bg: "blue.600" }}
          >
            {option.content}
          </Button>
        ))}
      </Flex>
    </>
  );

  return data?.quiz.type === "MULTIPLE" ? renderMultipleQuiz() : renderOXQuiz();
};

const Header = ({ onClose, img }: { onClose: () => void; img: string }) => (
  <Flex w="full" justify="center" align="center" p="10px">
    <Image src={img} boxSize="80px" position="absolute" top="-40px" />
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
