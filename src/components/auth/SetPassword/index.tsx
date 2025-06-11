import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PasswordInput } from "../PasswordInput";
import { BlueLeftHeader } from "../../common/Header";
import { BlueRectangleButton } from "../../common/CustomedButton";
import { useToast, Box, Flex, Text } from "@chakra-ui/react"; // Text 임포트
import fisherman from "../../../assets/pictures/fisherman_small.svg";
import { useChangeUserInfo } from "../../../hook/user/useChangeUserInfo";
import { useGetFishingSpotId } from "../../../hook/fishingspot/useGetFishingSpotId";

export const SetPassword = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false); // 비밀번호 에러를 위한 새 상태
  const [newPasswordError, setNewPasswordError] = useState(false); // 새 비밀번호 에러를 위한 새 상태

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    // 비밀번호 길이 유효성 검사
    if (value.length < 10 || value.length > 15) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setnewPassword(value);
    // 새 비밀번호 길이 유효성 검사 (확인 비밀번호여도 길이 검사)
    if (value.length < 10 || value.length > 15) {
      setNewPasswordError(true);
    } else {
      setNewPasswordError(false);
    }
  };

  const handleSubmit = () => {
    // 제출 전 마지막으로 유효성 재검사
    const isPasswordValid = password.length >= 10 && password.length <= 15;
    const isNewPasswordValid =
      newPassword.length >= 10 && newPassword.length <= 15;

    if (!isPasswordValid) {
      setPasswordError(true);
    }
    if (!isNewPasswordValid) {
      setNewPasswordError(true);
    }

    if (!isPasswordValid || !isNewPasswordValid) {
      toast({
        title: "비밀번호 조건을 충족시켜 주세요.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

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

  // 제출 버튼 비활성화 조건
  const isSubmitDisabled =
    passwordError ||
    newPasswordError ||
    password.length < 10 ||
    newPassword.length < 10;

  return (
    <>
      <Box w="full" marginTop="160px">
        <PasswordInput
          value={password}
          text="비밀번호"
          placeholder="10~15자를 충족시켜 주세요"
          handleChange={handlePasswordChange}
        />
        {passwordError && (
          <Text color="red.500" fontSize="sm" mt="2">
            비밀번호는 10~15자여야 합니다.
          </Text>
        )}
        <PasswordInput
          value={newPassword}
          text="비밀번호 확인"
          placeholder="비밀번호를 한 번 더 입력해 주세요"
          handleChange={handleNewPasswordChange}
        />
        {newPasswordError && (
          <Text color="red.500" fontSize="sm" mt="2" fontWeight="semibold">
            비밀번호는 10~15자여야 합니다.
          </Text>
        )}
        <Box w="100%" mt="80px">
          <BlueRectangleButton
            onClick={handleSubmit}
            isDisabled={isSubmitDisabled}
          >
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
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordError, setNewPasswordError] = useState(false); // 새 비밀번호 에러를 위한 새 상태

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewPassword(value);
    // 새 비밀번호 길이 유효성 검사
    if (value.length < 10 || value.length > 15) {
      setNewPasswordError(true);
    } else {
      setNewPasswordError(false);
    }
  };

  const handleSubmit = () => {
    // 제출 전 마지막으로 유효성 재검사
    const isNewPasswordValid =
      newPassword.length >= 10 && newPassword.length <= 15;

    if (!isNewPasswordValid) {
      setNewPasswordError(true);
      toast({
        title: "새 비밀번호 조건을 충족시켜 주세요.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

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
      onError: (error) => {
        toast({
          title: "비밀번호 변경에 실패했습니다.",
          description: error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      },
    });
  };

  const { data: fishingSpotData } = useGetFishingSpotId();

  const goHome = () => {
    navigate(`/spot/${fishingSpotData?.fishingSpotId}`);
  };

  // 제출 버튼 비활성화 조건
  const isSubmitDisabled = newPasswordError || newPassword.length < 10;

  return (
    <>
      <BlueLeftHeader text="비밀번호 설정" onBackClick={goHome} />
      <Box w="full" marginTop="100px">
        <PasswordInput
          value={originPassword}
          text="현재 비밀번호"
          placeholder="현재 비밀번호를 입력해 주세요."
          handleChange={(e) => setOriginPassword(e.target.value)}
        />
        <PasswordInput
          value={newPassword}
          text="새 비밀번호"
          placeholder="10~15자를 충족시켜 주세요"
          handleChange={handleNewPasswordChange}
        />
        {newPasswordError && (
          <Text color="red.500" fontSize="sm" mt="2" fontWeight="semibold">
            비밀번호는 10~15자여야 합니다.
          </Text>
        )}
        <Box w="100%" mt="80px">
          <BlueRectangleButton
            onClick={handleSubmit}
            isDisabled={isSubmitDisabled}
          >
            변경하기
          </BlueRectangleButton>
        </Box>
      </Box>
    </>
  );
};
