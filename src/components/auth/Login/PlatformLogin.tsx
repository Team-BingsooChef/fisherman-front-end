import { Flex, Button } from "@chakra-ui/react";
import { FaFacebook } from "react-icons/fa";
import kakaoIcon from "../../../assets/icon/kakao_icon.svg";
import naverIcon from "../../../assets/icon/naver_icon.svg";
import googleIcon from "../../../assets/icon/google_icon.svg";
import { BlueRectangleButton } from "../../common/CustomedButton";
import fisherman from "../../../assets/pictures/fisherman_small.svg";

export const PlatformLogin = () => {
  return (
    <>
    <Flex w="full" flexDir="column" align="center" gap="30px" mt="76px" mb="120px">
      <Button
        w="full"
        h="60px"
        borderRadius="16px"
        variant="ghost"
        aria-label="kakao"
        bgColor="#FFE812"
        color="#381F1F"
        fontSize="20px"
        position="relative"
      >
        <img
          src={kakaoIcon}
          alt="kakao"
          width={40}
          height={40}
          style={{
            position: "absolute", // 아이콘을 버튼의 왼쪽에 고정
            left: "16px",
            top: "50%",
            transform: "translateY(-50%)", // 수직 중앙 정렬
          }}
        />
        카카오로 시작하기
      </Button>
      <Button
        w="full"
        h="60px"
        borderRadius="16px"
        variant="ghost"
        aria-label="naver"
        bgColor="#03E266"
        color="white"
        fontSize="20px"
        position="relative"
      >
        <img
          src={naverIcon}
          alt="naver"
          width={24}
          height={24}
          style={{
            position: "absolute", // 아이콘을 버튼의 왼쪽에 고정
            left: "16px",
            top: "50%",
            marginLeft: "4px",
            transform: "translateY(-50%)", // 수직 중앙 정렬
          }}
        />
        네이버로 시작하기
      </Button>
        <Button
        w="full"
        h="60px"
        borderRadius="16px"
        variant="ghost"
        aria-label="google"
        bgColor="white"
        color="black"
        fontSize="20px"
        position="relative"
      >
        <img
          src={googleIcon}
          alt="google"
          width={28}
          height={28}
          style={{
            position: "absolute", // 아이콘을 버튼의 왼쪽에 고정
            left: "16px",
            top: "50%",
            marginLeft: "4px",
            transform: "translateY(-50%)", // 수직 중앙 정렬
          }}
        />
        구글로 시작하기
      </Button>
      <BlueRectangleButton>이메일로 시작하기</BlueRectangleButton>
    </Flex>
      <img src={fisherman} alt="fisherman" width={200} height={200}/>
      </>
  );
};
