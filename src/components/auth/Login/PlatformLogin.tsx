import { Flex, Button, useToast, Image } from "@chakra-ui/react";
import kakaoIcon from "../../../assets/icon/kakao_icon.svg";
import naverIcon from "../../../assets/icon/naver_icon.svg";
import googleIcon from "../../../assets/icon/google_icon.svg";
import { BlueRectangleButton } from "../../common/CustomedButton";
import fisherman from "../../../assets/pictures/fisherman_small.svg";
import { API_BASE_URL } from "../../../config/axios";
interface PlatformLoginProps {
  onEmailClick: () => void;
}

export const PlatformLogin = ({ onEmailClick }: PlatformLoginProps) => {
  const toast = useToast();
  const onKaKaoClick = () => {
    window.location.href = `${API_BASE_URL}/oauth2/authorize/kakao`;
  };

  const onOtherPlatformClick = () => {
    toast({
      title: "준비 중입니다.",
      description: "현재 플랫폼은 카카오만 지원하고 있어요.",
      status: "info",
      duration: 2000,
      isClosable: true,
      position: "bottom",
    });
  };

  return (
    <>
      <Flex
        w="full"
        flexDir="column"
        align="center"
        gap="30px"
        mt="76px"
        mb="120px"
      >
        <Button
          onClick={onKaKaoClick}
          w="full"
          h="60px"
          borderRadius="16px"
          variant="ghost"
          aria-label="kakao"
          bgColor="#FFE812"
          color="#381F1F"
          fontSize="20px"
          position="relative"
          _hover={{
            bgColor: "#FFE812", // hover 시 배경색 유지
            transform: "none", // transform 효과 제거
          }}
        >
          <img
            src={kakaoIcon}
            alt="kakao"
            width={40}
            height={40}
            style={{
              position: "absolute",
              left: "16px",
              top: "50%",
              transform: "translateY(-50%)",
            }}
          />
          카카오로 시작하기
        </Button>
        <Button
          onClick={onOtherPlatformClick}
          w="full"
          h="60px"
          borderRadius="16px"
          variant="ghost"
          aria-label="naver"
          bgColor="#03E266"
          color="white"
          fontSize="20px"
          position="relative"
          _hover={{
            bgColor: "#03E266",
            transform: "none",
          }}
        >
          <img
            src={naverIcon}
            alt="naver"
            width={24}
            height={24}
            style={{
              position: "absolute",
              left: "16px",
              top: "50%",
              marginLeft: "4px",
              transform: "translateY(-50%)",
            }}
          />
          네이버로 시작하기
        </Button>
        <Button
          onClick={onOtherPlatformClick}
          w="full"
          h="60px"
          borderRadius="16px"
          variant="ghost"
          aria-label="google"
          bgColor="white"
          color="black"
          fontSize="20px"
          position="relative"
          sx={{
            _hover: {
              bgColor: "white",
              transform: "none",
            },
          }}
        >
          <img
            src={googleIcon}
            alt="google"
            width={28}
            height={28}
            style={{
              position: "absolute",
              left: "16px",
              top: "50%",
              marginLeft: "4px",
              transform: "translateY(-50%)",
            }}
          />
          구글로 시작하기
        </Button>
        <BlueRectangleButton onClick={onEmailClick}>
          이메일로 시작하기
        </BlueRectangleButton>
        <Image
          src={fisherman}
          alt="fisherman"
          width={100}
          height={100}
          css={{
            display: "none",

            "@media (min-height: 920px)": {
              display: "block",
              marginTop: "40px",
              width: "250px",
              height: "250px",
            },
            "@media (min-height: 1100px)": {
              marginTop: "100px",
              width: "350px",
              height: "350px",
            },
          }}
        />
      </Flex>
    </>
  );
};
