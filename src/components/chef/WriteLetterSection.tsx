import { useNavigate } from "react-router-dom";
import { WhiteLeftHeader } from "../../components/common/Header";
import { Input, Flex, Text, Button, Textarea } from "@chakra-ui/react";

import { useSmeltStore } from "../../hook/fishingspot/useSmeltStore";
export const WriteLetterSection = ({
  onPrev,
  onNext,
}: {
  onPrev: () => void;
  onNext: () => void;
}) => {
  const navigate = useNavigate();
  const { senderName, setSenderName, content, setContent } = useSmeltStore();

  const maxChefNameLength = 8;
  const maxToppingContentLength = 300;

  const isNextButtonEnabled = senderName.length > 0 && content.length > 0;
  const currentFishingSpotId = Number(
    localStorage.getItem("redirectFishingSpotId")
  );

  const handleChangeInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value.slice(0, maxToppingContentLength);
    setContent(value);
  };
  return (
    <>
      <WhiteLeftHeader
        text="빙어 보내기"
        onBackClick={() => navigate(`/spot/${currentFishingSpotId}`)}
      />
      <Flex gap="15px" m="14px 0 30px 0">
        <div
          style={{ width: "60px", height: "1px", backgroundColor: "#B5B5B5" }}
        ></div>
        <div
          style={{ width: "60px", height: "1px", backgroundColor: "black" }}
        ></div>
        <div
          style={{ width: "60px", height: "1px", backgroundColor: "#B5B5B5" }}
        ></div>
      </Flex>

      <Text
        fontSize="16px"
        fontWeight="bold"
        mb="6px"
        w="full"
        textAlign="left"
      >
        낚시꾼 이름
      </Text>
      <Input
        value={senderName}
        onChange={(e) =>
          setSenderName(e.target.value.slice(0, maxChefNameLength))
        }
        w="full"
        bg="white"
        border={1}
        borderColor="gray.500"
        borderRadius="8px"
        placeholder="상대방에게 보일 이름을 작성해주세요."
      />
      <Text w="full" fontSize="12px" color="black" textAlign="right">
        {senderName.length}/{maxChefNameLength}
      </Text>

      <Text
        fontSize="16px"
        fontWeight="bold"
        mt="11px"
        mb="6px"
        w="full"
        textAlign="left"
      >
        편지 내용
      </Text>
      <Textarea
        value={content}
        onChange={handleChangeInput}
        w="full"
        h="50%"
        bg="white"
        border={1}
        borderColor="gray.500"
        borderRadius="8px"
        placeholder="상대방에게 남길 편지를 작성해 주세요."
      />
      <Text w="full" fontSize="12px" color="black" textAlign="right">
        {content.length}/{maxToppingContentLength}
      </Text>

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
          _hover={{ bg: "#D9D9D9" }} // 호버 시 배경색 변경 방지
        >
          뒤로가기
        </Button>
        <Button
          bg={isNextButtonEnabled ? "#03526B" : "#A0A0A0"}
          color="white"
          fontSize="20px"
          fontWeight="semiBold"
          borderRadius="16px"
          h="45px"
          w="140px"
          isDisabled={!isNextButtonEnabled}
          onClick={onNext}
          _hover={{
            bg: isNextButtonEnabled ? "#03526B" : "#A0A0A0", // 호버 시 색상 유지
          }}
        >
          다음
        </Button>
      </Flex>
    </>
  );
};
