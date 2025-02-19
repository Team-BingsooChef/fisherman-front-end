import styled from "@emotion/styled";
import { useState, useEffect, useRef } from "react";
import { Box, Flex, Text, useToast } from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";
import { NavyRectangleButton } from "../common/CustomedButton";
import { verifyEmailCode } from "../../api/auth/apis"; // API 함수 임포트
import { EmailCodeSendRequest } from "../../api/auth/types"; // 요청 타입

export const CodeCheck = () => {
  const [timeLeft, setTimeLeft] = useState(300); // 5분 타이머
  const [timeExpired, setTimeExpired] = useState(false);
  const [code, setCode] = useState<string[]>(Array(6).fill(""));
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();

  const from = location.state?.from || "unknown";
  const email = localStorage.getItem("user_email");

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    } else {
      setTimeExpired(true);
      toast({
        title: "입력 시간이 끝났습니다.",
        description: "다시 메일을 전송할까요?",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [timeLeft, toast]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}분 ${secs < 10 ? `0${secs}` : secs}초`;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value.slice(0, 1);
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && index > 0 && !code[index]) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    if (!email) {
      toast({
        title: "이메일 정보가 없습니다.",
        description: "다시 시도해주세요.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const auth_code = code.join("");
    if (auth_code.length !== 6) {
      toast({
        title: "인증 코드가 올바르지 않습니다.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const req: EmailCodeSendRequest = { email };

    try {
      await verifyEmailCode(auth_code, req);

      toast({
        title: "인증되었습니다.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      if (from === "signup") {
        navigate("/setpassword", { state: { action: "setpassword" } });
      } else if (from === "findpassword") {
        navigate("/setpassword", { state: { action: "resetpassword" } });
      } else {
        console.error("Unknown navigation source");
      }
    } catch (error) {
      console.error("인증 코드 검증 실패:", error);
      toast({
        title: "인증 번호가 틀렸습니다.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleResend = () => {
    toast({
      title: "인증 코드를 다시 전송했습니다.",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
    setTimeLeft(300);
    setTimeExpired(false);
  };

  return (
    <CodeCheckWrapper>
      <InputsContainer>
        {code.map((_, index) => (
          <CodeInput
            key={index}
            type="text"
            maxLength={1}
            value={code[index]}
            onChange={(e) => handleInputChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            ref={(el) => (inputRefs.current[index] = el!)}
          />
        ))}
      </InputsContainer>
      <Text color="#13353B" mt="25px">
        코드 입력까지{" "}
        <span style={{ fontWeight: "bold" }}>{formatTime(timeLeft)}</span>{" "}
        남았습니다
      </Text>

      <Box mt="148px" w="100%">
        <NavyRectangleButton onClick={handleSubmit}>
          인증하기
        </NavyRectangleButton>
        {timeExpired && (
          <Flex justify="center" mt="42px" gap="8px">
            <Text fontSize="14px">메일이 전송되지 않았나요?</Text>
            <ResendButton onClick={handleResend}>다시 전송</ResendButton>
          </Flex>
        )}
      </Box>
    </CodeCheckWrapper>
  );
};

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
