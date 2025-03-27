import { Flex, Box, Text, Input, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { BlueRectangleButton } from "../../common/CustomedButton";
import { EmailCodeSendRequest } from "../../../api/auth/types";
import { useGetEmailCode } from "../../../hook/auth/useGetEmailCode";

export const CheckDuplicate = () => {
  const [email, setEmail] = useState("");
  const toast = useToast();
  const { getEmailCode, isSending } = useGetEmailCode();

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleEmailVerification = async () => {
    if (!email) {
      toast({
        title: "이메일을 입력해 주세요.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    } else {
      localStorage.setItem("user_email", email);
      const req: EmailCodeSendRequest = { email };
      getEmailCode(req);
    }
  };

  return (
    <Box w="100%" mt="100px">
      <Text mb="8px" color="#03526B" alignSelf="start" fontWeight="semibold">
        이메일
      </Text>
      <Flex gap="5px">
        <Input
          variant="filled"
          value={email}
          onChange={handleChangeEmail}
          placeholder="이메일을 입력해 주세요"
          _placeholder={{ opacity: 1, color: "gray.500" }}
          size="sm"
          width={"100%"}
          height="60px"
          fontWeight="medium"
          borderRadius="16px"
          backgroundColor="#FFFEFE"
          mb="24px"
          _hover={{ backgroundColor: "#FFFEFE" }}
          _focus={{ backgroundColor: "#FFFEFE", boxShadow: "none" }}
        />
      </Flex>
      <BlueRectangleButton
        onClick={handleEmailVerification}
        isLoading={isSending}
      >
        인증하기
      </BlueRectangleButton>
    </Box>
  );
};
