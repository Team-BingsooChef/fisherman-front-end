import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Flex,
  Box,
  Image,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Settings, Github, Search, Fish, Dice5, LogOut, MenuIcon } from "lucide-react";
import profile_example from "../../../assets/profile_example.jpg";

export const DrawerMenu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const nickName = "자고싶어핑";

  return (
    <>
      {/* 메뉴 버튼 */}
      <Flex width="100%" justifyContent="flex-end">
        <Button
          onClick={onOpen}
          variant="unstyled"
          aria-label="Open Menu"
        >
          <MenuIcon size="28" />
        </Button>
      </Flex>

      {/* Drawer 컴포넌트 */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="xs">
        <DrawerOverlay />
        <DrawerContent bg="#F9F7F7">
          <DrawerCloseButton color="#595353" />
          <DrawerHeader>
            <Flex align="center" gap="8px">
              <Image
                src={profile_example}
                alt="profile"
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
                fontWeight={700}
                width="100%"
                justifyContent="flex-start"
                mb="4"
              >
                계정 설정
              </Button>
            </Link>

            <Link to="/seetoppinglist">
              <Button
                leftIcon={<Dice5 size="20" color="#777C89" />}
                bg="#F9F7F7"
                _hover={{ bg: "#AFD5F4" }}
                color="#595353"
                fontWeight={700}
                width="100%"
                justifyContent="flex-start"
                mb="4"
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
                fontWeight={700}
                width="100%"
                justifyContent="flex-start"
                mb="4"
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
                fontWeight={700}
                width="100%"
                justifyContent="flex-start"
                mb="4"
              >
                내가 보낸 빙어
              </Button>
            </Link>

            {/* 구분선 */}
            <Box
              as="hr"
              borderColor="gray.700"
              borderWidth="1px"
              my={4}
            />

            <Button
              leftIcon={<LogOut size="20" color="#777C89" />}
              bg="#F9F7F7"
              _hover={{ bg: "#AFD5F4" }}
              color="#595353"
              fontWeight={700}
              width="100%"
              justifyContent="flex-start"
              mb="4"
            >
              로그아웃
            </Button>

            <Button
              leftIcon={<Github size="20" color="#777C89" />}
              bg="#F9F7F7"
              _hover={{ bg: "#AFD5F4" }}
              color="#595353"
              fontWeight={700}
              width="100%"
              justifyContent="flex-start"
            >
              포피셔 소개
            </Button>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
