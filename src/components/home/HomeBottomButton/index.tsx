import { BlueRectangleButton } from "../../common/CustomedButton";
import { Box } from "@chakra-ui/react";
import { useModalOpenStore } from "../../../store/modal";
import { useModalStateStore } from "../../../store/modal";

export const AddToppingButton = () => {
  const { onOpen } = useModalOpenStore();
  const { setModalState } = useModalStateStore();
  const clickAddTopping = () => {
    setModalState("selectTopping");
    onOpen();
  };
  return (
    <Box w="calc(100% - 180px)" mt="16px">
      <BlueRectangleButton onClick={clickAddTopping}>빙어 보내기</BlueRectangleButton>
    </Box>
  );
};

export const CopyLink = () => {

  return (
    <Box w="calc(100% - 200px)" mt="16px">
      <BlueRectangleButton>공유하기</BlueRectangleButton>
    </Box>
  );
};
