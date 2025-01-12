import { Link as RouterLink } from "react-router-dom";
import { Box, Button, Link as ChakraLink, Flex, Text } from "@chakra-ui/react";
import { ToppestText } from "../ToppestText";
import { MoveLeft } from "lucide-react";
import { MouseEventHandler } from 'react';
import fisherman from "../../../assets/pictures/fisherman_small.svg";

export interface AuthBottomWrapperProps {
    linkText?: string;
    linkText2?: string;
    linkTo?: string;
}

// export const AuthBottomWrapper = ({ children }: AuthBottomWrapperProps) => {
export const AuthBottomWrapper = ({linkText, linkText2, linkTo}: AuthBottomWrapperProps) => {
  return (
    <Flex flexDir="column" mb="40px" position="fixed" bottom="0">
         <img src={fisherman} alt="fisherman" width={200} height={200} />
      <Flex w="100%" justifyContent="center" mt="50px">
        <Text color="#413C3C" fontSize="14px" marginRight="8px">
          {linkText}
        </Text>
        <ChakraLink
          as={RouterLink}
          to={linkTo}
          color="#0075FF"
          fontSize="14px"
        >
          {linkText2}
        </ChakraLink>
      </Flex>
    </Flex>
  );
};



export interface AuthTopWrapperProps {
  text?: string;
  color?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const goBack = () => {
  window.history.go(-1); // 뒤로 가기
};


export const AuthTopWrapper = ({ text, color }: AuthTopWrapperProps) => {
  return (
    <Flex w="100%" mt="40px" position="relative" >
        <Box>
        <Button m="0" 
        p="0" 
        bg="none" 
        _hover= {{bg:"none"}} 
        onClick={goBack}
        width="28px" // 아이콘의 너비와 동일하게 설정
        height="28px" // 아이콘의 높이와 동일하게 설정
        display="flex" // 아이콘을 버튼 안에 중앙 정렬
        alignItems="center"
        justifyContent="center">
      <MoveLeft size={28} color={color} />
      </Button>
      </Box>
      <Box position="absolute" right="calc((100% - 60px) / 2)" >
      <ToppestText text={text} color={color} />
      </Box>
    </Flex>
  );
};
