import { useState } from "react";
import styled from "@emotion/styled";
import { Box, useToast, Input, Text, Flex } from "@chakra-ui/react";
import { BlueRectangleButton } from "../../components/common/CustomedButton";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import fisherman from "../../assets/pictures/fisherman_small.svg";
import { signUpEmail } from "../../api/auth/apis";
import { EmailSignUpRequest } from "../../api/auth/types";

export default function AfterSignUpPage() {
  const navigate = useNavigate();
  const toast = useToast();
  const [username, setUsername] = useState("");

  const handleSubmit = async () => {
    if (!username) {
      toast({
        title: "닉네임을 입력해주세요.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    localStorage.setItem("user_nickname", username);

    const email = localStorage.getItem("user_email");
    const password = localStorage.getItem("user_password");

    if (!email || !password) {
      toast({
        title: "회원가입 정보가 부족합니다.",
        description: "다시 시도해주세요.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const req: EmailSignUpRequest = {
      email,
      password,
      nickname: username,
    };

    try {
      await signUpEmail(req);
      toast({
        title: "회원가입 성공!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      navigate("/login");
    } catch (error) {
      console.error("회원가입 실패:", error);
      toast({
        title: "회원가입 실패",
        description: "다시 시도해주세요.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Wrapper>
      <Box marginTop="160px" w="100%">
        <Text
          mb="80px"
          color="#03526B"
          w="full"
          textAlign="center"
          fontWeight="semibold"
        >
          당신을 뭐라고 부를까요?
        </Text>
        <Input
          variant="filled"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder={"닉네임을 입력해주세요."}
          _placeholder={{ opacity: 1, color: "gray.500" }}
          size="sm"
          width={"100%"}
          height="60px"
          fontWeight="medium"
          borderRadius="16px"
          backgroundColor="#FFFEFE"
          mb="26px"
          _hover={{ backgroundColor: "#FFFEFE" }}
          _focus={{ backgroundColor: "#FFFEFE", boxShadow: "none" }}
        />
      </Box>
      <Box w="100%">
        <BlueRectangleButton onClick={handleSubmit}>완료</BlueRectangleButton>
      </Box>
      <Flex w="full" justify="center" position="relative">
        <Box mb="90px" position="fixed" bottom="0">
          <img src={fisherman} alt="fisherman" width={180} height={180} />
        </Box>
      </Flex>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: calc(100% - 60px);
  display: flex;
  flex-direction: column;
  align-items: center;
`;
