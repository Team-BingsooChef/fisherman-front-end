import styled from "@emotion/styled";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { WhiteLeftHeader } from "../../components/common/Header";
import { ChangeNicknameModal } from "../../components/user/ChangeNicknameModal";
import {
  Text,
  Flex,
  Box,
  Button,
  IconButton,
  useDisclosure,
  Avatar,
  Switch,
} from "@chakra-ui/react";

import { LockKeyhole, RotateCcw, Trash2, Pencil } from "lucide-react";

import { useQueryUserInfo } from "../../hook/user/useQueryUserInfo";
import { useChangeFishingSpotPublic } from "../../hook/fishingspot/useChangeFishingSpotPublic";
import { useGetFishingSpotId } from "../../hook/fishingspot/useGetFishingSpotId";
export default function SettingPage() {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: userInfoData } = useQueryUserInfo();
  const { changeFishingSpotPublic } = useChangeFishingSpotPublic();
  const { data: fishingSpotData } = useGetFishingSpotId();

  const goHome = () => {
    navigate(`/spot/${fishingSpotData?.fishingSpotId}`);
  };

  // 상태를 나타내는 타입
  type publicStatusType = "허용" | "금지";

  const [publicStatus, setPublicStatus] = useState<publicStatusType>("허용");

  const togglePublic = () => {
    setPublicStatus((prev) => (prev === "허용" ? "금지" : "허용")); // 상태 토글
    const isPublic = Boolean(publicStatus === "허용"); // "허용"이면 true, "금지"이면 false
    changeFishingSpotPublic(isPublic);
  };

  return (
    <Wrapper>
      <Box w="calc(100% - 60px)">
        <WhiteLeftHeader text="계정 설정" onBackClick={goHome} />
      </Box>
      <Flex
        direction="column"
        w="full"
        align="center"
        justify="center"
        bgColor="white"
      >
        <Box m="20px 0 20px 0">
          <Box
            display="flex"
            w="full"
            alignContent="center"
            justifyContent="center"
          >
            <Avatar
              src="https://bit.ly/broken-link"
              width="100px"
              height="100px"
              borderRadius="full"
              objectFit="contain"
              marginBottom="10px"
            />
            {/* <Box
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
            </Box> */}
          </Box>
          <Text
            fontSize="18px"
            color="#555555"
            fontWeight="medium"
            letterSpacing="-0.3px"
            mb="8px"
            textAlign="center"
          >
            {userInfoData?.email}
          </Text>
          <Flex align="center" justify="center" gap="2px" fontWeight="Bold">
            <Text fontSize="24px" color="#3887C7">
              {userInfoData?.nickname}
            </Text>
            <Text fontSize="24px" color="black">
              님
            </Text>
            <IconButton
              aria-label="Edit Profile"
              icon={<Pencil size={20} />}
              borderRadius="50%"
              size="sm"
              onClick={onOpen}
              ml="8px"
            />
          </Flex>
        </Box>
      </Flex>

      <Box
        m="15px 0 0 0"
        p={3}
        px="30px"
        h="60px"
        w="full"
        display="flex"
        gap="8px"
        bgColor="white"
        alignItems="center"
        color="black"
      >
        <LockKeyhole />
        <Flex justify="space-between" align="center" w="100%">
          <Text color="#000000" fontWeight="600" fontSize="16px">
            검색 허용
          </Text>
          <Switch
            colorScheme="green"
            size="lg"
            isChecked={publicStatus === "허용"}
            onChange={togglePublic}
          />
        </Flex>
      </Box>

      <Button
        w="full"
        m="0 0 15px 0"
        p={3}
        px="30px"
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
        px="30px"
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
      <ChangeNicknameModal isOpen={isOpen} onClose={onClose} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// const GreyTextButton = styled(Text)`
//   font-size: 14px;
//   font-weight: bold;
//   text-decoration: underline;
//   color: #777c89;
//   cursor: pointer;
// `;

// interface FlexChangeElementProps {
//   text1: string;
//   text2: string;
//   onClick: () => void;
// }

// const FlexChangeElement = ({
//   text1,
//   text2,
//   onClick,
// }: FlexChangeElementProps) => {
//   return (
//     <Flex justify="space-between" align="center" w="100%">
//       <Text color="#000000" fontWeight="600" fontSize="16px">
//         {text1}
//       </Text>
//       <GreyTextButton onClick={onClick}>{text2}</GreyTextButton>
//     </Flex>
//   );
// };
