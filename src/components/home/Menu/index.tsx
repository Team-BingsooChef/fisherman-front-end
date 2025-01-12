import {
    Menu as CustomedMenu,
    MenuButton,
    MenuList,
    MenuItem,
    Flex,
    Box,
    Image
  } from "@chakra-ui/react";
  import { Link } from "react-router-dom";
  import { IconButton } from "@chakra-ui/icons";
  import { Settings, Github, Search, Fish, MenuIcon, Dice5, LogOut} from "lucide-react";
  import profile_example from "../../../assets/profile_example.jpg";

  export const Menu = () => {
    const nickName = "자고싶어핑";
    return (
      <Flex width="100%" justifyContent="flex-end" p={0}>
        <CustomedMenu >

          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<MenuIcon size="28" />}
            variant="unstyled"
            size="lg"
          />

          <MenuList  bg="#F9F7F7" color="white" >
            {/* 첫 번째 MenuItem은 텍스트처럼 표시 */}
            <MenuItem
              isDisabled
              fontSize="24px"
              fontWeight="bold"
              bg="#F9F7F7"
              _hover={{ bg: "transparent" }}
              _disabled={{ opacity: 1, cursor: "default", color: "#3887C7" }}
              mb="1px"
            >
            <Flex align="center" gap="8px">
            <Image
            src={profile_example}
            alt="profile"
            width="30px"
            height="30px"
            borderRadius="full"
            objectFit="contain"
            />
              {nickName} 님
            </Flex>
            </MenuItem>


            <Link to="/setting">
            <MenuItem
              icon={<Settings size="20" color="#777C89" />}
              bg="#F9F7F7"
              _hover={{ bg: "#AFD5F4" }}
              color = "#595353"
              fontWeight={700}
            >
            계정 설정
            </MenuItem>
            </Link>

            <Link to="/seetoppinglist">
            <MenuItem
              icon={<Dice5 size="20" color="#777C89" />}
              bg="#F9F7F7"
              _hover={{ bg: "#AFD5F4" }}
              color = "#595353"
              fontWeight={700}
            >
              빙어 뽑기
            </MenuItem>

            </Link>

            <Link to="/search">
            <MenuItem
              icon={<Search size="20" color="#777C89" />}
              bg="#F9F7F7"
              _hover={{ bg: "#AFD5F4" }}
              color = "#595353"
              fontWeight={700}
            >
              낚시터 찾기
            </MenuItem>
            </Link>

            <Link to="/seetoppinglist">
            <MenuItem
              bg="#F9F7F7"
              icon={<Fish size="20" color="#777C89" />}
              _hover={{ bg: "#AFD5F4" }}
              color = "#595353"
              fontWeight={700}
            >
              내가 보낸 빙어
            </MenuItem>
            </Link>

            {/* 구분선 추가 */}
            <Box
              as="hr"
              borderColor="gray.700"
              borderWidth="1px"
              my={2} /* 위아래 여백 */
            />
            <MenuItem
              bg="#F9F7F7"
              icon={<LogOut size="20" color="#777C89" />}
              _hover={{ bg: "#AFD5F4" }}
              color = "#595353"
              fontWeight={700}
              
            >
              로그아웃
            </MenuItem>
            <MenuItem
              bg="#F9F7F7"
              icon={<Github size="20" color="#777C89" />}
              _hover={{ bg: "#AFD5F4" }}
              color = "#595353"
              fontWeight={700}
              
            >
              포피셔 소개
            </MenuItem>

          </MenuList>
        </CustomedMenu>
      </Flex>
    );
  };
  