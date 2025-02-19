import { Flex, Box, Text, Input, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { BlueRectangleButton } from "../../common/CustomedButton";
import { getEmailCode } from "../../../api/auth/apis";
import { EmailCodeSendRequest } from "../../../api/auth/types";

export const CheckDuplicate = () => {
  const [email, setEmail] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleEmailVerification = async () => {
    if (!email) {
      toast({
        title: "이메일을 입력해 주세요.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    localStorage.setItem("user_email", email);

    const req: EmailCodeSendRequest = { email };

    try {
      await getEmailCode(req);
      navigate("/emailcheck", { state: { from: "signup" } });
    } catch (error) {
      console.error("이메일 인증 요청 실패:", error);
      toast({
        title: "이메일 인증 요청에 실패했습니다.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
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
          _hover={{ backgroundColor: "#FFFEFE" }}
          _focus={{ backgroundColor: "#FFFEFE", boxShadow: "none" }}
        />
      </Flex>
      <BlueRectangleButton onClick={handleEmailVerification}>
        인증하기
      </BlueRectangleButton>
    </Box>
  );
};
