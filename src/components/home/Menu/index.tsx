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
} from "lucide-react";

import { useQueryUserInfo } from "../../../hook/user/useQueryUserInfo";

export const Menu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: userInfoData } = useQueryUserInfo();
  const nickName = userInfoData?.nickname;

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
        </DrawerContent>
      </Drawer>
    </>
  );
};
