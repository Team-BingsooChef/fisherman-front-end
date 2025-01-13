import { useState } from "react";
import { useModalHeight } from "../../../hook/useModalHeight";
import { useModalStateStore, useModalOpenStore } from "../../../store/modal";
import { BlueEllipseButton } from "../../common/CustomedButton";
import { PostComment } from "../../../api/topping/apis";
import {
  ModalInsideGreyInput,

  ModalTitle,
  LetterTopInfo
} from "../../home/ModalCustomedElement";
import { Flex, Box, useToast } from "@chakra-ui/react";


export const ReplyLetter = ({ toppingId }: { toppingId: number }) => {
  useModalHeight("48%");
  const { setModalState } = useModalStateStore();
  const { onClose } = useModalOpenStore();
  const [inputValue, setInputValue] = useState("");
  const toast = useToast();

  const clickNext = async () => {
    if (inputValue.trim() === "") {
      toast({
        title: "답장 내용을 입력해주세요.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const requestData = {
      userId: 1, // 임시 사용자 ID
      toppingId, // 부모 컴포넌트에서 전달받은 토핑 ID
      comment: {
        commentContent: inputValue.trim(), // 답장 내용
      },
    };

    try {
      const response = await PostComment(requestData); // API 호출
      console.log("코멘트 등록 성공:", response);

      toast({
        title: "답장이 작성되었습니다.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      onClose(); // 모달 닫기
      setModalState("");
    } catch (error: unknown) {
      console.error("코멘트 등록 실패:", error);

      toast({
        title: "답장 등록 실패",
        description: "다시 시도해 주세요.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Box mt="20px">
        <ModalTitle title="답장 작성" />
      </Box>
      <Box w="100%" m="10px 0 20px 0">
        <LetterTopInfo text="To" nickname="희연" />
      </Box>
      <Flex w="100%" h="70%">
        <ModalInsideGreyInput
          value={inputValue}
          height="100%"
          placeholder="답장을 입력해주세요."
          maxLength={100} // 최대 글자 수 제한
          onChange={(e) => setInputValue(e.target.value)}
        />
      </Flex>
      <Box w="calc(100% - 200px)" mt="10px" mb="30px">
        <BlueEllipseButton onClick={clickNext}>완료</BlueEllipseButton>
      </Box>
    </>
  );
};