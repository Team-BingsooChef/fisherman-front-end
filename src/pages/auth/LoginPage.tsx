import styled from "@emotion/styled";
import { PlatformLogin } from "../../components/auth/Login/PlatformLogin";
import { EmailLogin } from "../../components/auth/Login/EmailLogin";
import { BlueHeader} from "../../components/common/Header";

export default function LoginPage() {

  return (
    <Wrapper>
      <BlueHeader text="로그인하기" />
      <PlatformLogin />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: calc(100% - 60px);
  display: flex;
  flex-direction: column;
  align-items: center;
`;
