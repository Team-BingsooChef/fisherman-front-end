import {
  Modal,
  ModalOverlay,
  ModalContent,
  Box,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import { WhiteInput } from "../../common/CustomedInput";

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
                placeholder="변경할 닉네임을 입력해 주세요"
              />
              <Button
                bgColor="#03526B"
                color="white"
                onClick={onClose}
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
