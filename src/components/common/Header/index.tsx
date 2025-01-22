import { ChevronLeft, House, Menu } from "lucide-react";
import { COLOR, TEXTCOLOR } from "../../../styles/color";
import { useNavigate } from "react-router-dom";
import { Flex, Text, IconButton } from "@chakra-ui/react";

interface HeaderProps {
  text: string;
  onBackClick?: () => void; // onClick 핸들러를 선택적으로 추가
}

export const BlueBackHeader = ({ text, onBackClick }: HeaderProps) => {
  return (
    <Flex
      w="100%"
      h="70px"
      align="center"
      backgroundColor={COLOR.PRIMARY}
      position="relative"
    >
      <IconButton
        icon={<ChevronLeft size={28} />}
        variant="ghost"
        aria-label="goBack"
        color={TEXTCOLOR.HEADER_BLACK}
        position="absolute"
        onClick={onBackClick}
      />
      <Text
        color={TEXTCOLOR.HEADER_BLACK}
        fontSize="20px"
        fontWeight="Bold"
        textAlign="center"
        w="100%"
      >
        {text}
      </Text>
    </Flex>
  );
};

export const BlueHeader = ({ text }: HeaderProps) => {
  return (
    <Flex
      w="100%"
      h="70px"
      align="center"
      backgroundColor={COLOR.PRIMARY}
      position="relative"
    >
      <Text
        color={TEXTCOLOR.HEADER_BLACK}
        fontSize="20px"
        fontWeight="Bold"
        textAlign="center"
        w="100%"
      >
        {text}
      </Text>
    </Flex>
  );
};

export const BlueHomeHeader = () => {
  return (
    <Flex
      w="100%"
      h="70px"
      justify="space-between"
      align="center"
      backgroundColor={COLOR.PRIMARY}
      position="relative"
    >
      <IconButton
        icon={<House size={28} />}
        variant="ghost"
        aria-label="goBack"
        color={TEXTCOLOR.HEADER_BLACK}
        position="absolute"
        left="0"
      />
      <IconButton
        icon={<Menu size={28} />}
        variant="ghost"
        aria-label="goBack"
        color={TEXTCOLOR.HEADER_BLACK}
        position="absolute"
        right="0"
      />
    </Flex>
  );
};

export const BlueMenuHeader = () => {
  return (
    <Flex
      w="100%"
      h="70px"
      justify="space-between"
      align="center"
      backgroundColor={COLOR.PRIMARY}
      position="relative"
    >
      <IconButton
        icon={<Menu size={28} />}
        variant="ghost"
        aria-label="goBack"
        color={TEXTCOLOR.HEADER_BLACK}
        position="absolute"
        right="0"
      />
    </Flex>
  );
};

export const WhiteHeader = ({ text, onBackClick }: HeaderProps) => {
  return (
    <Flex
      w="100%"
      h="70px"
      align="center"
      backgroundColor={COLOR.SERVE}
      position="relative"
    >
      <IconButton
        icon={<ChevronLeft size={28} />}
        variant="ghost"
        aria-label="goBack"
        color={TEXTCOLOR.HEADER_BLACK}
        position="absolute"
        onClick={onBackClick}
      />
      <Text
        color={TEXTCOLOR.HEADER_BLACK}
        fontSize="20px"
        fontWeight="Bold"
        textAlign="center"
        w="100%"
      >
        {text}
      </Text>
    </Flex>
  );
};

export const WhiteLeftHeader = ({ text, onBackClick }: HeaderProps) => {
  return (
    <Flex
      w="100%"
      h="70px"
      align="center"
      backgroundColor={COLOR.SERVE}
      position="relative"
    >
      <IconButton
        icon={<ChevronLeft size={28} />}
        variant="ghost"
        aria-label="goBack"
        color={TEXTCOLOR.HEADER_BLACK}
        position="absolute"
        onClick={onBackClick}
      />
      <Text
        color={TEXTCOLOR.HEADER_BLACK}
        fontSize="20px"
        fontWeight="Bold"
        ml="40px"
      >
        {text}
      </Text>
    </Flex>
  );
};

export const SettingHeader = ({ text }: HeaderProps) => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };
  return (
    <Flex justify="space-between" align="center" w="100%" mt="20px">
      <Text color="black" fontSize="32px">
        {text}
      </Text>
      <IconButton
        icon={<House size={28} />}
        variant="ghost"
        aria-label="goMine"
        color="black"
        onClick={goHome}
      />
    </Flex>
  );
};
