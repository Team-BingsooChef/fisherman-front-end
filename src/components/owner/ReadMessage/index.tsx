import { useState } from "react";
import { useModalHeight } from "../../../hook/useModalHeight";
import { useModalOpenStore, useModalStateStore } from "../../../store/modal";
import shark from "../../../assets/pictures/shark.svg";
import { NavyEllipseButton } from "../../common/CustomedButton";
import { ModalInsideWhiteContainer } from "../../home/modal/ModalCustomedElement";
import { Flex, Box, Text, Image, IconButton, Textarea } from "@chakra-ui/react";
import { XIcon } from "lucide-react";

export const ReadMessage = () => {
  const { setModalState } = useModalStateStore();
  const { onClose } = useModalOpenStore();
  const letterText =
    "오늘은 아침부터 맑은 날씨가 이어져서 기분이 좋습니다. 이렇게 날씨가 좋을 때는 산책이나 운동을 하기 딱 좋은 날이죠. 하지만 하루를 보내는 방법은 사람마다 다르기 마련입니다. 어떤 사람은 책을 읽으며 조용한 시간을 보내고, 또 어떤 사람은 친구를 만나며 활기찬 시간을 보낼 것입니다.";
  const [sender] = useState("희연이");
  const [isReplied] = useState(true); // 답장이 작성되었는지 상태 관리
  const [replyContent, setReplyContent] = useState(
    "오늘도 열심히 하면 좋은 일이 생길 거야!"
  ); // 답장 내용 관리
  const [replyDraft, setReplyDraft] = useState(""); // 답장 작성란 입력값 관리
  const [isReplying, setIsReplying] = useState(false); // 답장 작성 중인지 상태 관리
  const maxReplyLength = 30;

  // 모달 높이 설정 (isReplying에 따라 변경)
  useModalHeight(isReplying ? "76%" : "64%");

  const clickClose = () => {
    setModalState("");
    onClose();
  };

  const handleReplySubmit = () => {
    setReplyContent(replyDraft); // 작성된 답장을 저장
    setIsReplying(true); // 답장 작성 중 상태를 false로 변경
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
      <Image src={shark} boxSize="80px" position="absolute" top="-40px" />
      <Text
        width=" calc(100% - 40px)"
        fontSize="16px"
        fontWeight="regular"
        textAlign="left"
        mt="60px"
        mb="10px"
      >
        {sender}가 보낸 편지
      </Text>
      <Flex w="100%" h="44%" justify="center">
        <ModalInsideWhiteContainer height="240px">
          <Text p="10px" fontSize="16px" fontWeight="regular">
            {letterText}
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
              {replyContent}
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
