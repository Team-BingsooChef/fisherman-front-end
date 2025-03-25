import lotterymachine from "../../../assets/pictures/lotterymachine.svg";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Box,
  Flex,
} from "@chakra-ui/react";
import { FaInfoCircle } from "react-icons/fa";

export const LotteryMachine = () => {
  return (
    <>
      {/* 로터리 머신 */}
      <Flex w="full" justify="center" position="relative" mt="24px">
        <Popover placement="right">
          <PopoverTrigger>
            <Box cursor="pointer" position="absolute" top="10px" left="30px">
              <FaInfoCircle size="24px" color="#7c7c7c" />
            </Box>
          </PopoverTrigger>
          <PopoverContent
            bg="#f9f9f9"
            borderColor="#e0e0e0"
            boxShadow="md"
            borderRadius="8px"
          >
            <PopoverBody fontWeight="semibold">
              4개의 코인을 사용하여 1개의 빙어를 뽑을 수 있습니다. 뽑은 빙어로
              친구에게 편지를 써 보세요!
            </PopoverBody>
          </PopoverContent>
        </Popover>
        <img src={lotterymachine} alt="lotterymachine" />
      </Flex>
    </>
  );
};

export const InfoBox = ({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) => (
  <Flex
    w="140px"
    h="44px"
    borderRadius="8px"
    justify="center"
    align="center"
    gap="13px"
    position="relative"
  >
    <Popover>
      <PopoverTrigger>
        <Box cursor="pointer">{icon}</Box>
      </PopoverTrigger>
      <PopoverContent
        bg="#f9f9f9"
        borderColor="#e0e0e0"
        boxShadow="md"
        borderRadius="8px"
        p="8px"
      >
        <PopoverBody
          fontWeight="semibold"
          whiteSpace="pre-line" // 줄바꿈 허용
        >
          {label}
        </PopoverBody>
      </PopoverContent>
    </Popover>
    {children}
  </Flex>
);
