import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PasswordInput } from "../PasswordInput";
import { BlueRectangleButton } from "../../common/CustomedButton";
import { useToast, Box, Flex } from "@chakra-ui/react";
import fisherman from "../../../assets/pictures/fisherman_small.svg";

import { useChangeUserInfo } from "../../../hook/user/useChangeUserInfo";

export const SetPassword = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [newPassword, setnewPassword] = useState(""); // 두 번째 비밀번호

  const handleSubmit = () => {
    if (password !== newPassword) {
      toast({
        title: "비밀번호가 동일하지 않습니다.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    localStorage.setItem("user_password", password);

    toast({
      title: "비밀번호가 설정되었습니다.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    navigate("/aftersignup");
  };

  return (
    <>
      <Box w="full" marginTop="160px">
        <PasswordInput
          value={password}
          text="비밀번호"
          placeholder="10~15자, 특수문자 포함"
          handleChange={(e) => setPassword(e.target.value)}
        />
        <PasswordInput
          value={newPassword}
          text="비밀번호 확인"
          placeholder="비밀번호를 한 번 더 입력해 주세요"
          handleChange={(e) => setnewPassword(e.target.value)}
        />
        <Box w="100%" mt="80px">
          <BlueRectangleButton onClick={handleSubmit}>
            회원가입
          </BlueRectangleButton>
        </Box>
        <Flex w="full" justify="center" position="relative">
          <Box mb="90px" position="fixed" bottom="0">
            <img src={fisherman} alt="fisherman" width={180} height={180} />
          </Box>
        </Flex>
      </Box>
    </>
  );
};
export const ReSetPassword = () => {
  const { changePw } = useChangeUserInfo();

  const toast = useToast();
  const navigate = useNavigate();
  const [originPassword, setOriginPassword] = useState("");
  const [newPassword, setNewPassword] = useState(""); // 두 번째 비밀번호

  const handleSubmit = () => {
    const req = {
      originPassword: originPassword,
      newPassword: newPassword,
    };
    changePw(req, {
      onSuccess: () => {
        toast({
          title: "비밀번호가 변경되었습니다.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        navigate("/setting");
      },
    });
  };

  return (
    <>
      <Box w="full" marginTop="160px">
        <PasswordInput
          value={originPassword}
          text="현재 비밀번호"
          placeholder="현재 비밀번호를 입력해 주세요."
          handleChange={(e) => setOriginPassword(e.target.value)}
        />
        <PasswordInput
          value={newPassword}
          text="새 비밀번호"
          placeholder="10~15자, 특수문자 포함"
          handleChange={(e) => setNewPassword(e.target.value)}
        />
        <Box w="100%" mt="80px">
          <BlueRectangleButton onClick={handleSubmit}>
            변경하기
          </BlueRectangleButton>
        </Box>
        <Flex w="full" justify="center" position="relative">
          <Box mb="90px" position="fixed" bottom="0">
            <img src={fisherman} alt="fisherman" width={180} height={180} />
          </Box>
        </Flex>
      </Box>
    </>
  );
};
