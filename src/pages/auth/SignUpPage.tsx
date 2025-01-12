import styled from "@emotion/styled";
import { useNavigate} from "react-router-dom";
import { BlueBackHeader } from "../../components/common/Header";
import {
  AuthBottomWrapper,
} from "../../components/auth/AuthWrapper";
import { CheckDuplicate } from "../../components/auth/CheckDuplicate";

export default function SignUpPage() {
  const navigate = useNavigate();
  const goLogin = () => {
    navigate("/login");
  }
  

  return (
    <Wrapper>
      <BlueBackHeader text="회원가입" onBackClick={goLogin} />
      <CheckDuplicate />
      <AuthBottomWrapper
        linkText="이미 계정이 있으신가요?"
        linkText2="로그인"
        linkTo="/login"
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: calc(100% - 60px);
  display: flex;
  flex-direction: column;
  align-items: center;
`;
