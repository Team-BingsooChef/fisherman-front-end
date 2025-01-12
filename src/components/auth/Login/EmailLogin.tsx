import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Link as ChakraLink, Flex, Text } from "@chakra-ui/react";
import { PasswordInput } from "../PasswordInput";
import { BlueRectangleButton } from "../../common/CustomedButton";
import { WhiteInput } from "../../common/CustomedInput";
import { AuthBottomWrapper } from "../../auth/AuthWrapper";
import { Checkbox} from '@chakra-ui/react'

export const EmailLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  return (
    <>
    <Box mt="82px" w="full">
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
          <Checkbox color="#777C89" fontWeight="semibold">
  <Text fontSize="14px">아이디 저장</Text>
</Checkbox>
      <ChakraLink
        as={RouterLink}
        to="/findpassword"
        color="#777C89"
        fontSize="14px"
        fontWeight="semibold"
      >
        비밀번호 찾기
      </ChakraLink>
      </Flex>
      <BlueRectangleButton>로그인</BlueRectangleButton>
      <AuthBottomWrapper
        linkText="아직 회원이 아니신가요?"
        linkText2="회원가입"
        linkTo="/signup"
      />
    </>
  );
};
