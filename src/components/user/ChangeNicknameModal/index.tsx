import {
  Modal,
  ModalOverlay,
  ModalContent,
  Box,
  ModalBody,
  ModalCloseButton,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { WhiteInput } from "../../common/CustomedInput";

import { useChangeUserInfo } from "../../../hook/user/useChangeUserInfo";
interface ChangeNicknameModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChangeNicknameModal = ({
  isOpen,
  onClose,
}: ChangeNicknameModalProps) => {
  const [changedNickname, setChangedNickname] = useState<string>("");
  const handleChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChangedNickname(e.target.value);
  };
  const toast = useToast();
  const { changeNickname } = useChangeUserInfo();
  const handleComplete = () => {
    changeNickname(changedNickname);
    toast({
      title: "닉네임이 변경되었습니다.",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "bottom",
    });
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bgColor="#F3F5F9" w="90%">
          <ModalCloseButton />
          <ModalBody display="flex" flexDir="column" alignItems="center">
            <Box
              mt="10px"
              w="full"
              display="flex"
              flexDir="column"
              alignItems="center"
            >
              <WhiteInput
                value={changedNickname}
                text="닉네임"
                handleChange={handleChangeNickname}
                placeholder="변경할 닉네임을 입력해 주세요 (8자 이내)"
                maxLength={8}
              />
              <Button
                bgColor="#03526B"
                color="white"
                onClick={handleComplete}
                _hover={{ bgColor: "#03526B" }}
                w="160px"
                borderRadius="8px"
              >
                변경 완료
              </Button>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
