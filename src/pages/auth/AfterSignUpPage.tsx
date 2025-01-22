import { useState } from "react";
import styled from "@emotion/styled";
import { Box, useToast, Input, Text, Flex } from "@chakra-ui/react";
import { BlueRectangleButton } from "../../components/common/CustomedButton";
import { useNavigate } from "react-router-dom";
import fisherman from "../../assets/pictures/fisherman_small.svg";

export default function AfterSignUpPage() {
  const navigate = useNavigate();
  const toast = useToast();
  const [username, setUsername] = useState("");

  const handleSubmit = () => {
    if (!username) {
      toast({
        title: "닉네임을 입력해주세요.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    toast({
      title: "환영합니다!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    navigate("/");
  };
  return (
    <Wrapper>
      <Box marginTop="160px" w="100%">
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
          _hover={{ backgroundColor: "#FFFEFE" }} // Keeps the background white on hover
          _focus={{ backgroundColor: "#FFFEFE", boxShadow: "none" }} // Keeps the background white on focus
        />
      </Box>
      <Box w="100%">
        <BlueRectangleButton onClick={handleSubmit}>완료</BlueRectangleButton>
      </Box>
      <Flex w="full" justify="center" position="relative">
        <Box mb="90px" position="fixed" bottom="0">
          <img src={fisherman} alt="fisherman" width={180} height={180} />
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
