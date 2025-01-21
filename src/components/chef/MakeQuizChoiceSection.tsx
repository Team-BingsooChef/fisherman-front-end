import { useNavigate } from "react-router-dom";
import { WhiteLeftHeader } from "../../components/common/Header";
import { Box, Input, Flex, Text, Button, Textarea } from "@chakra-ui/react";
import { useState } from "react";

import { MultipleQuizSection } from "./MultipleQuizSection";
import { OxQuizSection } from "./OxQuizSection";

export const MakeQuizChoiceSection = () => {
  const navigate = useNavigate();
  const [question, setQuestion] = useState("");
  const maxQuestionLength = 30;
  const maxOptionContentLength = 30;

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
          bg="#D9D9D9"
          color="black"
          fontSize="20px"
          fontWeight="semiBold"
          borderRadius="16px"
          h="52px"
          w="160px"
          onClick={() => navigate(-1)}
          _hover={{ bg: "#D9D9D9" }} // 호버 시 배경색 변경 방지
        >
          OX
        </Button>
        <Button
          bg="#D9D9D9"
          color="black"
          fontSize="20px"
          fontWeight="semiBold"
          borderRadius="16px"
          h="52px"
          w="160px"
          onClick={() => navigate(-1)}
          _hover={{ bg: "#D9D9D9" }} // 호버 시 배경색 변경 방지
        >
          객관식
        </Button>
      </Flex>

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
      <OxQuizSection />
      <Flex position="absolute" bottom="23px" gap="23px">
        <Button
          bg="#D9D9D9"
          color="black"
          fontSize="20px"
          fontWeight="semiBold"
          borderRadius="16px"
          h="45px"
          w="140px"
          onClick={() => navigate(-1)}
          _hover={{ bg: "#D9D9D9" }} // 호버 시 배경색 변경 방지
        >
          뒤로가기
        </Button>
        <Button
          bg="#D9D9D9"
          color="black"
          fontSize="20px"
          fontWeight="semiBold"
          borderRadius="16px"
          h="45px"
          w="140px"
          onClick={() => navigate(-1)}
          _hover={{ bg: "#D9D9D9" }} // 호버 시 배경색 변경 방지
        >
          완료
        </Button>
      </Flex>
    </>
  );
};
