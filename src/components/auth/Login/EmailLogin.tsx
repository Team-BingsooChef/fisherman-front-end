import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Link as ChakraLink } from "@chakra-ui/react";
import { PasswordInput } from "../PasswordInput";
import { BlueRectangleButton } from "../../common/CustomedButton";
import { IvoryInput } from "../../common/CustomedInput";
import { AuthBottomWrapper } from "../../auth/AuthWrapper";

export const EmailLogin = () => {
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
    
      const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
      };
      const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
      };
return(
<>
    <IvoryInput
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
  <ChakraLink
    as={RouterLink}
    to="/findpassword"
    color="#777C89"
    fontSize="14px"
    alignSelf="end"
    margin="0 20px 56px 0"
  >
    비밀번호 찾기
  </ChakraLink>
  <BlueRectangleButton>로그인</BlueRectangleButton>
  <AuthBottomWrapper linkText="아직 회원이 아니신가요?" linkText2="회원가입" linkTo="/signup" />
  </>
);
};