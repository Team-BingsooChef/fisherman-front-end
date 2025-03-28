import { useState, useEffect } from "react";
import { useModalHeight } from "../../../hook/useModalHeight";
import { useModalOpenStore, useModalStateStore } from "../../../store/modal";
import { NavyEllipseButton } from "../../common/CustomedButton";
import { ModalInsideWhiteContainer } from "../../home/modal/ModalCustomedElement";
import { Flex, Box, Text, Image, IconButton, Textarea } from "@chakra-ui/react";
import { XIcon } from "lucide-react";

import { useSmeltsDetail } from "../../../hook/smelts/useSmeltsDetail";
import { useSmeltsImg } from "../../../hook/smelts/useSmeltsImg";
import { useReply } from "../../../hook/smelts/useReply";

export const ReadMessage = () => {
  const selectedToppingId = Number(localStorage.getItem("selectedToppingId"));
  const selectedToppingTypeId = Number(
    localStorage.getItem("selectedToppingTypeId")
  );
  const { data } = useSmeltsDetail(selectedToppingId);
  const { getImageUrl } = useSmeltsImg();

  const imgURL = getImageUrl(selectedToppingTypeId, false) ?? ""; //얼음 풀린 이미지
  const { setModalState } = useModalStateStore();
  const { onClose } = useModalOpenStore();

  const [isReplied, setIsReplied] = useState<boolean>(false);
  // data가 변경될 때마다 isReplied 상태 업데이트
  useEffect(() => {
    setIsReplied(data?.letter.comment !== null);
  }, [data]);

  const [replyDraft, setReplyDraft] = useState(""); // 답장 작성란 입력값 관리
  const [isReplying, setIsReplying] = useState(false); // 답장 작성 중인지 상태 관리
  const maxReplyLength = 30;

  const mutate = useReply(selectedToppingId);

  // 모달 높이 설정 (isReplying에 따라 변경)
  useModalHeight(isReplying ? "76%" : "64%");

  const clickClose = () => {
    setModalState("");
    onClose();
  };

  const handleReplySubmit = () => {
    setIsReplying(false);
    mutate.mutate({ content: replyDraft });
  };

  return (
    <Flex w="100%" h="100%" flexDir="column" align="center" position="relative">
      <IconButton
        aria-label="close"
        icon={<XIcon onClick={clickClose} />}
        position="absolute"
        top="10px"
        right="10px"
      />
      <Image src={imgURL} boxSize="80px" position="absolute" top="-40px" />
      <Text
        width=" calc(100% - 40px)"
        fontSize="16px"
        fontWeight="regular"
        textAlign="left"
        mt="60px"
        mb="10px"
      >
        {data?.letter.senderName}가 보낸 편지
      </Text>
      <Flex w="100%" h="44%" justify="center">
        <ModalInsideWhiteContainer height="240px">
          <Text p="10px" fontSize="16px" fontWeight="regular">
            {data?.letter.content}
          </Text>
        </ModalInsideWhiteContainer>
      </Flex>

      {/* 답장 여부에 따른 UI 변경 */}
      {isReplied ? (
        <Box w="calc(100% - 40px)" mt="40px">
          <Text
            width=" calc(100% - 40px)"
            fontSize="16px"
            fontWeight="regular"
            textAlign="left"
            mb="10px"
          >
            답장
          </Text>
          <Box w="full" bg="white" p="10px" h="70px" borderRadius="16px">
            <Text fontSize="16px" fontWeight="regular" borderRadius="md">
              {data?.letter.comment?.content}
            </Text>
          </Box>
        </Box>
      ) : (
        <Box
          w="calc(100% - 40px)"
          display="flex"
          flexDir="column"
          alignItems="center"
        >
          {!isReplying && (
            <Box w="calc(100% - 200px)" mt="80px">
              <NavyEllipseButton onClick={handleReplySubmit}>
                답장 남기기
              </NavyEllipseButton>
            </Box>
          )}
          {isReplying && (
            <>
              <Text
                width=" calc(100% - 40px)"
                fontSize="16px"
                fontWeight="regular"
                textAlign="left"
                mb="10px"
              >
                답장
              </Text>

              <Textarea
                width="full"
                bg="white"
                placeholder="답장을 작성하세요..."
                value={replyDraft}
                onChange={(e) => setReplyDraft(e.target.value)}
                mb="10px"
              />
              <Text w="full" textAlign="right" fontSize="12px" color="black">
                {replyDraft.length}/{maxReplyLength}
              </Text>
              <Box w="calc(100% - 200px)">
                <NavyEllipseButton onClick={handleReplySubmit}>
                  저장
                </NavyEllipseButton>
              </Box>
            </>
          )}
        </Box>
      )}
    </Flex>
  );
};
