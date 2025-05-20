import { useNavigate } from "react-router-dom";
import { WhiteLeftHeader } from "../../components/common/Header";
import { Flex, Text, Button, Textarea, useToast } from "@chakra-ui/react";
import { useState, useEffect } from "react";

import { MultipleQuizSection } from "./MultipleQuizSection";
import { OxQuizSection } from "./OxQuizSection";
import { useSendSmelts } from "../../hook/fishingspot/useSendSmelts";
import { useSmeltStore } from "../../hook/fishingspot/useSmeltStore";

export const MakeQuizChoiceSection = ({ onPrev }: { onPrev: () => void }) => {
  const navigate = useNavigate();
  const currentFishingSpotId = Number(
    localStorage.getItem("redirectFishingSpotId")
  );
  const toast = useToast();
  const [question, setQuestion] = useState("");
  const [selectQuizType, setSelectQuizType] = useState<string | null>(null); // OX 또는 객관식 유형 관리
  const maxQuestionLength = 30;

  const { setQuiz, setQuizTitle, setQuizType } = useSmeltStore();
  const handleQuizTypeSelection = (clickType: "OX" | "MULTIPLE") => {
    if (selectQuizType === clickType) {
      setSelectQuizType(null);
      setQuiz(null);
    } else {
      setSelectQuizType(clickType);
      setQuizType(clickType);
    }
  };

  useEffect(() => {
    if (selectQuizType) {
      setQuizTitle(question);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question]);

  const mutation = useSendSmelts(currentFishingSpotId);
  const submitSmelts = () => {
    mutation.mutate();

    toast({
      title: "빙어를 보냈습니다!",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "bottom",
    });

    navigate(`/${currentFishingSpotId}`);
  };

  return (
    <>
      <WhiteLeftHeader
        text="빙어 보내기"
        onBackClick={() => {
          navigate(`/${currentFishingSpotId}`);
        }}
      />
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
      {!selectQuizType && (
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
          bg={selectQuizType === "OX" ? "#B5B5B5" : "#D9D9D9"}
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
          bg={selectQuizType === "MULTIPLE" ? "#B5B5B5" : "#D9D9D9"}
          color="black"
          fontSize="20px"
          fontWeight="semiBold"
          borderRadius="16px"
          h="52px"
          w="160px"
          onClick={() => handleQuizTypeSelection("MULTIPLE")}
          _hover={{ bg: "#B5B5B5" }}
        >
          객관식
        </Button>
      </Flex>

      {selectQuizType && (
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
          {selectQuizType === "OX" && <OxQuizSection />}
          {selectQuizType === "MULTIPLE" && <MultipleQuizSection />}
        </>
      )}

      <Flex
        gap="23px"
        css={{
          position: selectQuizType ? undefined : "absolute",
          bottom: selectQuizType ? undefined : "23px",
          marginTop: selectQuizType ? "20px" : "0px",
          marginBottom: selectQuizType ? "20px" : "0px",
        }}
      >
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
          onClick={submitSmelts} // 완료 버튼 클릭 시 호출
          _hover={{ bg: "#03526B" }}
        >
          완료
        </Button>
      </Flex>
    </>
  );
};
