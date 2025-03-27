import styled from "@emotion/styled";
import { useLocation, useNavigate } from "react-router-dom";
import { Text, Box } from "@chakra-ui/react";
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

      <Text
        color="#13353B"
        mt="24px"
        fontWeight="bold"
        letterSpacing={"-0.5px"}
        fontSize="14px"
        textAlign="center"
      >
        간혹 인증 메일이 스팸함으로 분류될 수 있어요.
        <br />
        메일이 보이지 않는다면, 스팸 메일함도 꼭 확인해 주세요!
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
