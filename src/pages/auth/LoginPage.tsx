import styled from "@emotion/styled";
import { useState } from "react";
import { PlatformLogin } from "../../components/auth/Login/PlatformLogin";
import { EmailLogin } from "../../components/auth/Login/EmailLogin";
import { BlueBackHeader, BlueHeader} from "../../components/common/Header";

export default function LoginPage() {
  const [currentComponent, setCurrentComponent] = useState("PlatformLogin"); // 현재 렌더링할 컴포넌트 상태
  const handleEmailLogin = () => {
    setCurrentComponent("EmailLogin");
  };
  const handlePlatformLogin = () => {
    setCurrentComponent("PlatformLogin");
  };

  return (
    <Wrapper>
      {currentComponent === "PlatformLogin" && (
      <BlueHeader text="로그인하기" />
      )}
      {currentComponent === "EmailLogin" && (
        <BlueBackHeader text="로그인하기" onBackClick={handlePlatformLogin} />
      )}
           {currentComponent === "PlatformLogin" && (
        <PlatformLogin onEmailClick={handleEmailLogin} />
      )}
      {currentComponent === "EmailLogin" && (
        <EmailLogin/>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: calc(100% - 60px);
  display: flex;
  flex-direction: column;
  align-items: center;
`;
