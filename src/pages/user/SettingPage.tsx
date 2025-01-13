import styled from "@emotion/styled";
import { useState } from "react";
import { useNavigate} from "react-router-dom";
import { WhiteLeftHeader } from "../../components/common/Header";
import {ChangeNicknameModal} from "../../components/user/ChangeNicknameModal"; 
import { Text, Flex, Box, Image, Button, IconButton, useDisclosure } from "@chakra-ui/react";
import profile_example from "../../assets/profile_example.jpg";
import { LockKeyhole, RotateCcw, Trash2, Pencil } from "lucide-react";

export default function SettingPage() {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [currentNickname, setCurrentNickname] = useState<string>("호랭이");
  const [changedNickname, setChangedNickname] = useState<string>("");

  const goHome = () => {
    navigate("/");
  };
  const changeNickname = () => {
    setCurrentNickname(changedNickname);
  }

  // 상태를 나타내는 타입
  type SearchStatus = "허용" | "금지";

  const [accessStatus, setAccessStatus] = useState<SearchStatus>("금지");

  const toggleAccess = () => {
    setAccessStatus((prev) => (prev === "허용" ? "금지" : "허용"));
  };

  return (
    <Wrapper>
      <WhiteLeftHeader text="계정 설정" onBackClick={goHome} />
      <Flex
        direction="column"
        w="full"
        align="center"
        justify="center"
        bgColor="white"
      >
        <Box m="20px 0 20px 0">
          <Box position="relative">
            <Image
              src={profile_example}
              alt="profile"
              width="100px"
              height="100px"
              borderRadius="full"
              objectFit="contain"
            />
            <Box
              position="absolute"
              borderRadius="50%"
              boxSize="30px"
              right="20px"
              bottom="8px"
            >
              <IconButton
              size="sm"
                aria-label="Edit Profile"
                icon={<Pencil size={20} />}
                borderRadius="50%"
              />
            </Box>
          </Box>

          <Flex align="center" justify="center" gap="2px" fontWeight="Bold">

            <Text fontSize="24px" color="#3887C7">
              {currentNickname}
            </Text>
            <Text fontSize="24px" color="black">
              님
            </Text>
            <IconButton
                aria-label="Edit Profile"
                icon={<Pencil size={20}/>}
                borderRadius="50%" 
                size="sm"
                onClick={onOpen}
                ml="8px"
              />
            <ChangeNicknameModal isOpen={isOpen} onClose={onClose} />
          </Flex>
        </Box>
      </Flex>

      <Box
        m="15px 0 0 0"
        p={3}
        h="60px"
        w="full"
        display="flex"
        gap="8px"
        bgColor="white"
        alignItems="center"
        color="black"
      >
        <LockKeyhole />
        <FlexChangeElement
          text1="검색 허용"
          text2={accessStatus}
          onClick={toggleAccess}
        />
      </Box>

      <Button
        w="full"
        m="0 0 15px 0"
        p={3}
        h="60px"
        display="flex"
        gap="8px"
        bgColor="white"
        alignItems="center"
        color="black"
        justifyContent="flex-start"
        onClick={() => navigate("/setpassword")}
      >
        <RotateCcw />
        비밀번호 변경
      </Button>

      <Button
        w="full"
        p={3}
        h="60px"
        display="flex"
        gap="8px"
        bgColor="white"
        alignItems="center"
        color="black"
        justifyContent="flex-start"
      >
        <Trash2 color="red" />
        회원 탈퇴
      </Button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: calc(100% - 60px);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const GreyTextButton = styled(Text)`
  font-size: 14px;
  font-weight: bold;
  text-decoration: underline;
  color: #777c89;
  cursor: pointer;
`;

interface FlexChangeElementProps {
  text1: string;
  text2: string;
  onClick: () => void;
}

const FlexChangeElement = ({
  text1,
  text2,
  onClick,
}: FlexChangeElementProps) => {
  return (
    <Flex justify="space-between" align="center" w="100%">
      <Text color="#000000" fontWeight="600" fontSize="16px">
        {text1}
      </Text>
      <GreyTextButton onClick={onClick}>{text2}</GreyTextButton>
    </Flex>
  );
};
