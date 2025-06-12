import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Flex,
  Box,
  Button,
  useDisclosure,
  Avatar,
  useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import {
  Settings,
  Github,
  Search,
  Fish,
  Dice5,
  LogOut,
  MenuIcon,
  Backpack,
  MessageCircleWarning,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useQueryUserInfo } from "../../../hook/user/useQueryUserInfo";
import { logOut } from "../../../api/auth/apis";

export const Menu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const toast = useToast();
  const { data: userInfoData } = useQueryUserInfo();
  const nickName = userInfoData?.nickname;

  const handleLogout = async (): Promise<void> => {
    try {
      onClose();
      await logOut();
      toast({
        title: "로그아웃 성공",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("로그아웃 요청 실패:", error);
    }
  };

  return (
    <>
      {/* 메뉴 버튼 */}
      <Flex width="100%" justifyContent="flex-end">
        <Button onClick={onOpen} variant="unstyled" aria-label="Open Menu">
          <MenuIcon size="28" />
        </Button>
      </Flex>
      {/* Drawer 컴포넌트 */}
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        size="xs"
        trapFocus={false} // 트랩 비활성화
        blockScrollOnMount={false} // 스크롤 블록 비활성화
      >
        <DrawerOverlay />
        <DrawerContent
          bg="#F9F7F7"
          maxWidth="240px" // 원하는 너비 설정
          width="90%" // 반응형으로 설정 가능
        >
          {/* <DrawerCloseButton color="#595353" /> */}
          <DrawerHeader>
            <Flex align="center" gap="8px">
              <Avatar
                src="https://bit.ly/broken-link"
                width="30px"
                height="30px"
                borderRadius="full"
                objectFit="contain"
              />
              <Box fontWeight="extrabold" fontSize="24px" color="#3887C7">
                {nickName} <span style={{ color: "#595353" }}>님</span>
              </Box>
            </Flex>
          </DrawerHeader>

          <DrawerBody>
            <Link to="/setting">
              <Button
                leftIcon={<Settings size="20" color="#777C89" />}
                bg="#F9F7F7"
                _hover={{ bg: "#AFD5F4" }}
                color="#595353"
                fontWeight="semibold"
                width="100%"
                justifyContent="flex-start"
              >
                계정 설정
              </Button>
            </Link>

            <Link to="/fishdrawing">
              <Button
                leftIcon={<Dice5 size="20" color="#777C89" />}
                bg="#F9F7F7"
                _hover={{ bg: "#AFD5F4" }}
                color="#595353"
                fontWeight="semibold"
                width="100%"
                justifyContent="flex-start"
              >
                빙어 뽑기
              </Button>
            </Link>

            <Link to="/fishbag">
              <Button
                leftIcon={<Backpack size="20" color="#777C89" />}
                bg="#F9F7F7"
                _hover={{ bg: "#AFD5F4" }}
                color="#595353"
                fontWeight="semibold"
                width="100%"
                justifyContent="flex-start"
              >
                내 가방
              </Button>
            </Link>

            <Link to="/search">
              <Button
                leftIcon={<Search size="20" color="#777C89" />}
                bg="#F9F7F7"
                _hover={{ bg: "#AFD5F4" }}
                color="#595353"
                fontWeight="semibold"
                width="100%"
                justifyContent="flex-start"
              >
                낚시터 찾기
              </Button>
            </Link>

            <Link to="/seetoppinglist">
              <Button
                leftIcon={<Fish size="20" color="#777C89" />}
                bg="#F9F7F7"
                _hover={{ bg: "#AFD5F4" }}
                color="#595353"
                fontWeight="semibold"
                width="100%"
                justifyContent="flex-start"
              >
                내가 보낸 빙어
              </Button>
            </Link>

            {/* 구분선 */}
            <Box as="hr" borderColor="#c0c0c0" borderWidth="1px" my={4} />

            <Button
              leftIcon={<LogOut size="20" color="#777C89" />}
              bg="#F9F7F7"
              _hover={{ bg: "#AFD5F4" }}
              color="#595353"
              fontWeight="semibold"
              width="100%"
              justifyContent="flex-start"
              onClick={handleLogout}
            >
              로그아웃
            </Button>

            <Link to="/aboutus">
              <Button
                leftIcon={<Github size="20" color="#777C89" />}
                bg="#F9F7F7"
                _hover={{ bg: "#AFD5F4" }}
                color="#595353"
                fontWeight="semibold"
                width="100%"
                justifyContent="flex-start"
              >
                포피셔 소개
              </Button>
            </Link>
          </DrawerBody>
          <Link to="https://docs.google.com/forms/d/e/1FAIpQLScAIiltWZFpQD7QzTRCLU3JfKw9jUoRkhhuNsE9xn-EmteGbg/viewform?usp=header">
            <Button
              leftIcon={<MessageCircleWarning size="20" color="#777C89" />}
              bg="#F9F7F7"
              _hover={{ bg: "#AFD5F4" }}
              color="#595353"
              fontWeight="semibold"
              width="100%"
              justifyContent="flex-start"
              marginBottom="20px"
            >
              버그 신고하기
            </Button>
          </Link>
        </DrawerContent>
      </Drawer>
    </>
  );
};
