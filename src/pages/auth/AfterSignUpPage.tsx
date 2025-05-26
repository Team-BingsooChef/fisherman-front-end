import { useState } from "react";
import styled from "@emotion/styled";
import { Box, useToast, Input, Text, Flex, Image } from "@chakra-ui/react";
import { BlueRectangleButton } from "../../components/common/CustomedButton";
import { useNavigate } from "react-router-dom";
import fisherman from "../../assets/pictures/fisherman_small.svg";
import { signUpEmail } from "../../api/auth/apis";
import { EmailSignUpRequest } from "../../api/auth/types";
import { useChangeUserInfo } from "../../hook/user/useChangeUserInfo";
import { useGetFishingSpotId } from "../../hook/fishingspot/useGetFishingSpotId";
import { AxiosError } from "axios";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let gtag: (...args: any[]) => void;

export default function AfterSignUpPage() {
  const navigate = useNavigate();
  const toast = useToast();
  const [username, setUsername] = useState("");

  const { changeNickname } = useChangeUserInfo();

  // setPassword에서 온 경우 emailUser, 아니면 OAuth 사용자
  const isEmailUser = localStorage.getItem("user_password") !== null;

  const { data } = useGetFishingSpotId({
    enabled: !isEmailUser, // isEmailUser면 훅 실행 X
  });
  const fishingSpotId = data?.fishingSpotId;

  const handleSubmit = async () => {
    if (!username) {
      toast({
        title: "닉네임을 입력해주세요.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (!isEmailUser) {
      try {
        await changeNickname(username);
        gtag("event", "sign_up", {
          method: "oauth",
        });

        toast({
          title: "닉네임 설정 성공!",
          description: "환영합니다!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        const redirectFishingSpotId = localStorage.getItem(
          "redirectFishingSpotId"
        );
        if (redirectFishingSpotId) {
          navigate(`/spot/${redirectFishingSpotId}`);
        } else {
          navigate(`/spot/${fishingSpotId}`);
        }
      } catch (error) {
        console.error("닉네임 변경 실패:", error);
        toast({
          title: "닉네임 변경 실패",
          description: "다시 시도해주세요.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } else {
      const email = localStorage.getItem("user_email");
      const password = localStorage.getItem("user_password");

      if (!email || !password) {
        toast({
          title: "회원가입 정보가 부족합니다.",
          description: "다시 시도해주세요.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      const req: EmailSignUpRequest = {
        email,
        password,
        nickname: username,
      };

      try {
        await signUpEmail(req);
        gtag("event", "sign_up", {
          method: "email",
        });
        toast({
          title: "회원가입 성공!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        navigate("/login");
        localStorage.removeItem("user_email");
        localStorage.removeItem("user_password");
      } catch (error) {
        console.error("회원가입 실패:", error);
        toast({
          title: "회원가입 실패",
          description:
            error instanceof AxiosError ? error.message : String(error),
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <Wrapper>
      <Box
        marginTop="100px"
        w="100%"
        css={{
          "@media (min-height: 768px)": {
            marginTop: "160px",
          },
        }}
      >
        <Text
          mb="80px"
          color="#03526B"
          w="full"
          textAlign="center"
          fontWeight="semibold"
        >
          당신을 뭐라고 부를까요?
        </Text>
        <Input
          variant="filled"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder={"닉네임을 입력해주세요."}
          _placeholder={{ opacity: 1, color: "gray.500" }}
          size="sm"
          width={"100%"}
          height="60px"
          fontWeight="medium"
          borderRadius="16px"
          backgroundColor="#FFFEFE"
          mb="26px"
          _hover={{ backgroundColor: "#FFFEFE" }}
          _focus={{ backgroundColor: "#FFFEFE", boxShadow: "none" }}
        />
      </Box>
      <Box w="100%">
        <BlueRectangleButton onClick={handleSubmit}>완료</BlueRectangleButton>
      </Box>
      <Flex w="full" justify="center" position="relative">
        <Box
          mt="60px"
          css={{
            "@media (min-height: 768px)": {
              marginTop: "100px",
            },
          }}
        >
          <Image
            src={fisherman}
            alt="fisherman"
            width={160}
            height={160}
            css={{
              "@media (min-height: 768px)": {
                width: "240px",
                height: "240px",
              },
              "@media (min-height: 1100px)": {
                width: "300px",
                height: "300px",
              },
            }}
          />
        </Box>
      </Flex>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: calc(100% - 60px);
  display: flex;
  flex-direction: column;
  align-items: center;
`;
