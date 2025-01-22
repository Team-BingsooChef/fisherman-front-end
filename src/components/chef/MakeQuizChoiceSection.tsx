import { useNavigate } from "react-router-dom";
import { WhiteLeftHeader } from "../../components/common/Header";
import { Flex, Text, Button, Textarea, useToast } from "@chakra-ui/react";
import { useState } from "react";

import { MultipleQuizSection } from "./MultipleQuizSection";
import { OxQuizSection } from "./OxQuizSection";

export const MakeQuizChoiceSection = ({ onPrev }: { onPrev: () => void }) => {
  const navigate = useNavigate();
  const toast = useToast(); // useToast 훅 사용
  const [question, setQuestion] = useState("");
  const [quizType, setQuizType] = useState<string | null>(null); // OX 또는 객관식 유형 관리
  const maxQuestionLength = 30;

  const handleQuizTypeSelection = (type: string) => {
    if (quizType === type) {
      setQuizType(null); // 같은 버튼을 다시 누르면 선택 해제
    } else {
      setQuizType(type); // 선택된 유형 설정
    }
  };

  const handleComplete = () => {
    toast({
      title: "빙어를 보냈습니다!",
      status: "success",
      duration: 3000, // 3초 동안 표시
      isClosable: true,
      position: "bottom", // 알림 위치
    });
    navigate("/"); // 필요 시 페이지 이동
  };

  return (
    <>
      <WhiteLeftHeader text="빙어 보내기" onBackClick={() => navigate("/")} />
      <Flex gap="15px" m="14px 0 30px 0">
        <div
          style={{ width: "60px", height: "1px", backgroundColor: "#B5B5B5" }}
        ></div>
        <div
          style={{ width: "60px", height: "1px", backgroundColor: "#B5B5B5" }}
        ></div>
        <div
          style={{ width: "60px", height: "1px", backgroundColor: "black" }}
        ></div>
      </Flex>

      <Text
        fontSize="16px"
        fontWeight="bold"
        mb="14px"
        w="full"
        textAlign="left"
      >
        퀴즈 추가 (선택)
      </Text>
      {!quizType && (
        <>
          <Text mb="20px">
            퀴즈를 설정하고 싶지 않다면, 완료를 눌러 넘어가세요.
          </Text>
        </>
      )}

      <Text
        fontSize="16px"
        fontWeight="bold"
        mb="6px"
        w="full"
        textAlign="left"
      >
        유형
      </Text>
      <Flex gap="12px">
        <Button
          bg={quizType === "OX" ? "#B5B5B5" : "#D9D9D9"}
          color="black"
          fontSize="20px"
          fontWeight="semiBold"
          borderRadius="16px"
          h="52px"
          w="160px"
          onClick={() => handleQuizTypeSelection("OX")}
          _hover={{ bg: "#B5B5B5" }}
        >
          OX
        </Button>
        <Button
          bg={quizType === "Multiple" ? "#B5B5B5" : "#D9D9D9"}
          color="black"
          fontSize="20px"
          fontWeight="semiBold"
          borderRadius="16px"
          h="52px"
          w="160px"
          onClick={() => handleQuizTypeSelection("Multiple")}
          _hover={{ bg: "#B5B5B5" }}
        >
          객관식
        </Button>
      </Flex>

      {quizType && (
        <>
          <Text
            fontSize="16px"
            fontWeight="bold"
            mt="11px"
            mb="6px"
            w="full"
            textAlign="left"
          >
            질문
          </Text>
          <Textarea
            value={question}
            onChange={(e) =>
              setQuestion(e.target.value.slice(0, maxQuestionLength))
            }
            w="full"
            h="70px"
            bg="white"
            border={1}
            borderColor="gray.500"
            borderRadius="8px"
            placeholder="퀴즈의 질문을 작성해 주세요."
          />
          <Text w="full" fontSize="12px" color="black" textAlign="right">
            {question.length}/{maxQuestionLength}
          </Text>
          {quizType === "OX" && <OxQuizSection />}
          {quizType === "Multiple" && <MultipleQuizSection />}
        </>
      )}

      <Flex position="absolute" bottom="23px" gap="23px">
        <Button
          bg="#D9D9D9"
          color="black"
          fontSize="20px"
          fontWeight="semiBold"
          borderRadius="16px"
          h="45px"
          w="140px"
          onClick={onPrev}
          _hover={{ bg: "#D9D9D9" }}
        >
          뒤로가기
        </Button>
        <Button
          bg="#03526B"
          color="white"
          fontSize="20px"
          fontWeight="semiBold"
          borderRadius="16px"
          h="45px"
          w="140px"
          onClick={handleComplete} // 완료 버튼 클릭 시 호출
          _hover={{ bg: "#03526B" }}
        >
          완료
        </Button>
      </Flex>
    </>
  );
};
