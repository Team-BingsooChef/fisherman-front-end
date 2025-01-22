import styled from "@emotion/styled";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import { BlueBackHeader } from "../../components/common/Header";
import { WhiteInput } from "../../components/common/CustomedInput";
import { BlueRectangleButton } from "../../components/common/CustomedButton";

export default function FindPasswordPage() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const goToEmailCheck = () => {
    navigate("/emailcheck", { state: { from: "findpassword" } });
  };
  return (
    <Wrapper>
      <BlueBackHeader
        text="비밀번호 찾기"
        onBackClick={() => navigate("/login")}
      />
      <Box mt="120px" mb="40px" w="100%">
        <WhiteInput
          value={email}
          text="비밀번호를 찾고자 하는 이메일을 입력해 주세요"
          handleChange={handleChangeEmail}
          placeholder="이메일을 입력해 주세요"
        />
      </Box>
      <BlueRectangleButton onClick={goToEmailCheck}>다음</BlueRectangleButton>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  width: calc(100% - 60px);
  display: flex;
  flex-direction: column;
  align-items: center;
`;
