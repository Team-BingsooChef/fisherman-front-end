import { ChevronLeft, House } from "lucide-react"
import { COLOR }  from "../../../styles/color";
import { useNavigate } from "react-router-dom";
import { Flex, Text, IconButton } from "@chakra-ui/react";


interface HeaderProps {
    text: string;
  }

export const BlueHeader = ( {text}: HeaderProps) => {
    return (
    <Flex w="100%" h="70px" justify="space-between" align="center" backgroundColor={COLOR.PRIMARY} >
        <IconButton icon={<ChevronLeft size={28} />} variant="ghost" aria-label="goBack" color="white" />
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
