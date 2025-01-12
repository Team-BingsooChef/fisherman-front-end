import styled from "@emotion/styled";
import { useState } from "react";
import { SettingHeader } from "../../components/user/SettingHeader";
import { GreyInput, PasswordInput } from "../../components/user/CustomedInput";
import { Text, Flex, Box, Image, Button } from "@chakra-ui/react";
import { WhiteRectangleButton } from "../../components/common/CustomedButton";
import profile_example from "../../assets/profile_example.jpg";
import { LockKeyhole, RotateCcw, Trash2} from "lucide-react";

export default function SettingPage() {
  const [currentNickname, setCurrentNickname] = useState<string>("호랭이");
  const [changedNickname, setChangedNickname] = useState<string>("");
  const [changedPassword, setChangedPassword] = useState<string>("");

  // 닉네임 변경 핸들러
  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChangedNickname(e.target.value);
  };

  // 비밀번호 변경 핸들러
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChangedPassword(e.target.value);
  };

  // 상태를 나타내는 타입
type SearchStatus = "허용" | "금지";

const [accessStatus, setAccessStatus] = useState<SearchStatus>("금지");

const toggleAccess = () => {
  setAccessStatus((prev) => (prev === "허용" ? "금지" : "허용"));
};

  return (
    <Wrapper>
      <SettingHeader   text="계정 설정" />
      <Box mt="20px" ></Box>
      <Flex direction="column" w="full" align="center" justify="center"  bgColor="white">
          <Box m="20px 0 20px 0" >

          <Image
            src={profile_example}
            alt="profile"
            width="100px"
            height="100px"
            borderRadius="full"
            objectFit="contain"
          />

          <GreyTextButton align="center">사진 변경</GreyTextButton>
    
          <Flex  align="center" justify="center" gap="2px" fontWeight="Bold">
          <Text fontSize="24px" color="#3887C7" >{currentNickname}</Text>
          <Text fontSize="24px" color="black">님</Text>
          </Flex>

          </Box>
      </Flex>


      <Box m="15px 0 0 0" p={3} h="60px" w="full" display="flex" gap="8px" 
      bgColor="white" alignItems="center" color="black">
      <LockKeyhole/>
      <FlexChangeElement text1="검색 허용" text2={accessStatus} onClick={toggleAccess} />
      </Box>

    
      <Button w="full" m="0 0 15px 0" p={3} h="60px"  display="flex" gap="8px" 
      bgColor="white" alignItems="center" color="black" justifyContent="flex-start">
      <RotateCcw/>
      비밀번호 변경
      </Button>


    
      <Button w="full" p={3} h="60px"  display="flex" gap="8px" 
      bgColor="white" alignItems="center" color="black" justifyContent="flex-start">
      <Trash2 color="red" />
      회원 탈퇴
      </Button>

      
    </Wrapper>
  );
};


const Wrapper = styled.div`
  width: calc(100% - 60px);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const GreyTextButton = styled(Text)`
  font-size: 14px;
  text-decoration: underline;
  color: #777c89;
  cursor: pointer;
`;


interface FlexChangeElementProps {
    text1: string;
    text2: string;
    onClick: () => void;
}

const FlexChangeElement = ({text1,text2, onClick}: FlexChangeElementProps ) =>
{
    return(
        <Flex justify="space-between" align="center" w="100%">
    <Text color="#000000" fontWeight="600">{text1}</Text>
    <GreyTextButton onClick={onClick}>{text2}</GreyTextButton>
    </Flex>
    );
}

