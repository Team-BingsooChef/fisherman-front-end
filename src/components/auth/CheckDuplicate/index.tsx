import { Flex, Box, Button, Input, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState, MouseEventHandler } from "react";
import { COLOR } from "../../../styles/color";
import { BlueRectangleButton } from "../../common/CustomedButton";
// import { useState, MouseEventHandler } from "react";

interface CheckDuplicateProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  text?: string;
}

// export const CheckDuplicate: React.FC<CheckDuplicateProps> = ({ onClick }) => {
export const CheckDuplicate = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const goToEmailCheck = () => {
    navigate("/emailcheck", { state: { from: "signup" } });
  };

  return (
    <Box w="100%" mt="100px">
      <Text mb="8px" color="#03526B" alignSelf="start" fontWeight="semibold">
        이메일
      </Text>
      <Flex gap="5px">
        <Input
          variant="filled"
          value={email}
          onChange={handleChangeEmail}
          placeholder="이메일을 입력해 주세요"
          _placeholder={{ opacity: 1, color: "gray.500" }}
          size="sm"
          width={"100%"}
          height="60px"
          fontWeight="medium"
          borderRadius="16px"
          backgroundColor="#FFFEFE"
          mb="24px"
          _hover={{ backgroundColor: "#FFFEFE" }} // Keeps the background white on hover
          _focus={{ backgroundColor: "#FFFEFE", boxShadow: "none" }} // Keeps the background white on focus
        />
        {/* <CheckDuplicateButton /> */}
      </Flex>
      <BlueRectangleButton onClick={goToEmailCheck}>
        인증하기
      </BlueRectangleButton>
    </Box>
  );
};

// const CheckDuplicateButton: React.FC<CheckDuplicateProps> = ({ onClick }) => {
//   return (
//     <Button
//       onClick={onClick}
//       bg={COLOR.LIGHTBLUE}
//       color="#ffffff"
//       width="80px"
//       fontSize="12px"
//       fontWeight="extrabold"
//       height="60px"
//       borderRadius="16px"
//       _hover={{
//         bg: COLOR.LIGHTBLUE, // hover 시 배경색
//         color: "#ffffff", // hover 시 텍스트 색상 유지
//       }}
//       _active={{
//         transform: "scale(0.98)", // 클릭할 때 버튼 살짝 줄어듦
//       }}
//     >
//       중복 확인
//     </Button>
//   );
// };
