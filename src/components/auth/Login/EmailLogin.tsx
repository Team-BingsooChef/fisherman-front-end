import { useState, useEffect } from "react";
// import { Link as RouterLink } from "react-router-dom";
import { Box, Flex, Text, Checkbox, useToast } from "@chakra-ui/react";
import { PasswordInput } from "../PasswordInput";
import { BlueRectangleButton } from "../../common/CustomedButton";
import { WhiteInput } from "../../common/CustomedInput";
import { AuthBottomWrapper } from "../../auth/AuthWrapper";

import { EmailSignInRequest } from "../../../api/auth/types";
import { useEmailLogin } from "../../../hook/auth/useEmailLogin";

export const EmailLogin = () => {
  const { mutate } = useEmailLogin();

  const [email, setEmail] = useState(localStorage.getItem("saved_email") || "");
  const [password, setPassword] = useState("");
  const [rememberEmail, setRememberEmail] = useState(
    !!localStorage.getItem("saved_email")
  );

  const toast = useToast();

  useEffect(() => {
    if (rememberEmail) {
      localStorage.setItem("saved_email", email);
    } else {
      localStorage.removeItem("saved_email");
    }
  }, [rememberEmail, email]);

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleRememberEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRememberEmail(e.target.checked);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      toast({
        title: "이메일과 비밀번호를 입력해주세요.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const req: EmailSignInRequest = { email, password };
    mutate(req);
  };

  return (
    <>
      <Box mt="76px" w="full">
        <WhiteInput
          value={email}
          text="이메일"
          handleChange={handleChangeEmail}
          placeholder="이메일을 입력해 주세요"
        />
        <PasswordInput
          value={password}
          text="비밀번호"
          handleChange={handleChangePassword}
          placeholder="비밀번호를 입력해 주세요"
        />
      </Box>
      <Flex w="full" mt="12px" mb="44px" justify="space-between">
        <Checkbox
          color="#777C89"
          fontWeight="semibold"
          isChecked={rememberEmail}
          onChange={handleRememberEmail}
        >
          <Text fontSize="14px">아이디 저장</Text>
        </Checkbox>
        {/* <ChakraLink
          as={RouterLink}
          to="/findpassword"
          color="#777C89"
          fontSize="14px"
          fontWeight="semibold"
        >
          비밀번호 찾기
        </ChakraLink> */}
      </Flex>
      <BlueRectangleButton onClick={handleLogin}>로그인</BlueRectangleButton>
      <AuthBottomWrapper
        linkText="아직 회원이 아니신가요?"
        linkText2="회원가입"
        linkTo="/signup"
      />
    </>
  );
};
