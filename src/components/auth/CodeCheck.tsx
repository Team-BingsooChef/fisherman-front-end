import styled from "@emotion/styled";
import { useRef } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";
import { NavyRectangleButton } from "../common/CustomedButton";
import { useEmailVerify } from "../../hook/auth/useEmailVerify";
import { useVerificationTimer } from "../../hook/auth/useVerificationTimer";

export const CodeCheck = () => {
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const email = localStorage.getItem("user_email");
  const from = location.state?.from || "signup";

  const { timeLeft, timeExpired, code, handleCodeChange, startTimer } =
    useVerificationTimer();
  const { verifyCode, resendCode, isVerifying, isResending } = useEmailVerify();

  // 입력 처리
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    handleCodeChange(index, e.target.value);
    if (e.target.value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    if (!email || code.join("").length !== 6) {
      return;
    }

    try {
      await verifyCode({
        auth_code: code.join(""),
        req: { email },
      });

      navigate("/setpassword", {
        state: { action: from === "signup" ? "setpassword" : "resetpassword" },
      });
    } catch (error) {
      console.error("Verification failed:", error);
    }
  };

  // 재전송 처리
  const handleResend = async () => {
    if (!email) {
      return;
    }
    await resendCode({ email });
    startTimer();
  };

  return (
    <CodeCheckWrapper>
      <InputsContainer>
        {code.map((digit, index) => (
          <CodeInput
            key={index}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleInputChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            ref={(el) => el && (inputRefs.current[index] = el)}
            disabled={isVerifying}
          />
        ))}
      </InputsContainer>

      <Text color="#13353B" mt="25px">
        {timeExpired ? (
          "인증 시간이 만료되었습니다"
        ) : (
          <>
            코드 입력까지 <b>{formatTime(timeLeft)}</b> 남았습니다
          </>
        )}
      </Text>

      <Box mt="148px" w="100%">
        <NavyRectangleButton onClick={handleSubmit}>
          인증하기
        </NavyRectangleButton>

        {timeExpired && (
          <Flex justify="center" mt="42px" gap="8px">
            <Text fontSize="14px">메일을 받지 못하셨나요?</Text>
            <ResendButton onClick={handleResend} disabled={isResending}>
              {isResending ? "전송 중..." : "재전송"}
            </ResendButton>
          </Flex>
        )}
      </Box>
    </CodeCheckWrapper>
  );
};

// 스타일 컴포넌트 및 유틸 함수 (이전과 동일)
const CodeCheckWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 48px;
`;

const CodeInput = styled.input`
  width: 52px;
  height: 52px;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  border-radius: 8px;
  border: 1px solid #919799;
  background-color: #919799;
  color: #ffffff;
`;

const ResendButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 14px;
  color: #0075ff;
  text-decoration: underline;
  cursor: pointer;
`;

// 유틸 함수
const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}분 ${secs < 10 ? `0${secs}` : secs}초`;
};
