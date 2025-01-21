import { useNavigate } from "react-router-dom";
import { BlueRectangleButton } from "../../common/CustomedButton";
import { Box } from "@chakra-ui/react";

export const AddToppingButton = () => {
  const navigate = useNavigate();

  return (
    <Box w="calc(100% - 180px)" mt="16px">
      <BlueRectangleButton
        onClick={() => {
          navigate("/sending");
        }}
      >
        빙어 보내기
      </BlueRectangleButton>
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
