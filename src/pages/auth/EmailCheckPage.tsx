import styled from "@emotion/styled";
import { useLocation, useNavigate } from "react-router-dom";
import { Text } from "@chakra-ui/react";
import { WhiteHeader } from "../../components/common/Header";
import { CodeCheck } from "../../components/auth/CodeCheck";

export default function EmailCheckPage() {
  const email = localStorage.getItem("user_email");
  const navigate = useNavigate();
  const from = useLocation().state?.from || "unknown"; // 기본값 설정
  const goBack = () => {
    if (from === "signup") {
      navigate("/signup");
    } else {
      navigate("/findpassword");
    }
  };
  return (
    <Wrapper>
      <WhiteHeader text="인증하기" onBackClick={goBack} />
      <Text
        color="#13353B"
        mt="25px"
        fontWeight="regular"
        letterSpacing={"-0.5px"}
      >
        이메일 인증을 위한 코드가 발급되었습니다
        <br />
        전달받은 코드를 5분 안에 입력해 주세요
      </Text>
      <Text
        color="#13353B"
        mt="24px"
        fontWeight="regular"
        letterSpacing={"-0.5px"}
      >
        <span style={{ fontWeight: "bold" }}>{email}</span>로 코드를 보냈습니다.
      </Text>
      <CodeCheck />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: calc(100% - 60px);
  display: flex;
  flex-direction: column;
  align-items: center;
`;
