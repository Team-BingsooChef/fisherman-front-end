import { useModalHeight } from "../../../hook/useModalHeight";
import { useModalOpenStore, useModalStateStore } from "../../../store/modal";
import { Text, Flex, IconButton, Box, Image } from "@chakra-ui/react";
import { BlueEllipseButton } from "../../common/CustomedButton";
import { XIcon } from "lucide-react";
import { motion } from "framer-motion"; // Framer Motion import
import shark from "../../../assets/pictures/shark.svg";

export const FishDrawingResult = () => {
  const { onClose } = useModalOpenStore();
  useModalHeight("70%");

  return (

      <Flex w="full" flexDir="column" align="center" position="relative">
        <Box boxSize="20px">
          <IconButton
            aria-label="close Modal"
            position="absolute"
            top="-30px"
            right="10px"
            variant="ghost"
            onClick={onClose}
          >
            <XIcon />
          </IconButton>
        </Box>
        
        {/* 결과 이미지 */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1.2 }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 10,
            duration: 0.8,
          }}
        >
          <Image boxSize="248px" src={shark}></Image>
        </motion.div>
        <Text
          color="#13353B"
          fontWeight="bold"
          fontSize="24px"
          mt="90px"
          textAlign="center"
        >
          상어 당첨!
        </Text>
      </Flex>
  );
};

export const MakeSureDrawing = () => {
  const { onClose } = useModalOpenStore();
  const { setModalState } = useModalStateStore();

  // 퀴즈 타입 설정 후 모달 상태 변경
  const handleDrawing = () => {
    setModalState("fishDrawingResult"); // 모달 상태 변경
  };

  const handleCancleDrawing = () => {
    onClose();
  };

  useModalHeight("25%"); // 모달 높이 설정

  return (
    <Flex w="full" flexDir="column" align="center" justify="center">
      <Text
        color="#13353B"
        fontWeight="semibold"
        fontSize="20px"
        textAlign="center"
      >
        뽑기를 진행하시겠습니까? <br />
        코인 1개가 차감됩니다.
      </Text>
      <Flex w="calc(100% - 60px)" gap="26px" mt="20px">
        <BlueEllipseButton onClick={handleDrawing}>예</BlueEllipseButton>
        <BlueEllipseButton onClick={handleCancleDrawing}>아니요</BlueEllipseButton>
      </Flex>
    </Flex>
  );
};
