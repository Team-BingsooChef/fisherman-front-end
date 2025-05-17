import { Button } from "@chakra-ui/react";
import { MouseEventHandler, ReactNode } from "react";
import { COLOR } from "../../../styles/color";
interface BlueRectangleButtonProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  isLoading?: boolean;
}

export const BlueRectangleButton: React.FC<BlueRectangleButtonProps> = ({
  children,
  onClick,
  isLoading,
}) => {
  return (
    <Button
      onClick={onClick} // onClick 이벤트 연결
      bg={COLOR.DEEPBLUE}
      color="white"
      width="100%"
      fontSize="20px"
      fontWeight="extrabold"
      height="60px"
      borderRadius="16px"
      marginTop="10px"
      _hover={{
        bg: COLOR.DEEPBLUE, // hover 시 배경색
        color: "white", // hover 시 텍스트 색상 유지
      }}
      isLoading={isLoading}

      // _active={{
      //   transform: "scale(0.98)", // 클릭할 때 버튼 살짝 줄어듦
      // }}
    >
      {children}
    </Button>
  );
};

export const BlueEllipseButton: React.FC<BlueRectangleButtonProps> = ({
  children,
  onClick,
}) => {
  return (
    <Button
      onClick={onClick} // onClick 이벤트 연결
      bg="#3887C7"
      color="white"
      width="100%"
      fontSize="20px"
      fontWeight="bold"
      height="40px"
      borderRadius="16px"
      _hover={{
        bg: "#3887C7", // hover 시 배경색
        color: "white", // hover 시 텍스트 색상 유지
      }}
      _active={{
        transform: "scale(0.98)", // 클릭할 때 버튼 살짝 줄어듦
      }}
    >
      {children}
    </Button>
  );
};

export const NavyEllipseButton: React.FC<BlueRectangleButtonProps> = ({
  children,
  onClick,
}) => {
  return (
    <Button
      onClick={onClick} // onClick 이벤트 연결
      bg="#03526B"
      color="white"
      width="100%"
      fontSize="20px"
      fontWeight="bold"
      height="40px"
      borderRadius="16px"
      _hover={{
        bg: "#02445A", // hover 시 배경색
        color: "white", // hover 시 텍스트 색상 유지
      }}
      _active={{
        transform: "scale(0.98)", // 클릭할 때 버튼 살짝 줄어듦
      }}
    >
      {children}
    </Button>
  );
};

export const LightBlueRectangleButton: React.FC<BlueRectangleButtonProps> = ({
  children,
  onClick,
}) => {
  return (
    <Button
      onClick={onClick} // onClick 이벤트 연결
      bg="#2589FF"
      color="#ffffff"
      width="100%"
      fontSize="3xl"
      fontWeight={500}
      height="60px"
      borderRadius="16px"
      _hover={{
        bg: "#2589FF",
        color: "#ffffff",
      }}
      _active={{
        transform: "scale(0.98)", // 클릭할 때 버튼 살짝 줄어듦
      }}
    >
      {children}
    </Button>
  );
};

export const NavyRectangleButton: React.FC<BlueRectangleButtonProps> = ({
  children,
  onClick,
}) => {
  return (
    <Button
      onClick={onClick} // onClick 이벤트 연결
      bg="#03526B"
      color="white"
      width="100%"
      fontSize="20px"
      fontWeight="extrabold"
      height="60px"
      borderRadius="16px"
      _hover={{
        bg: "#03526B",
        color: "#ffffff",
      }}
      _active={{
        transform: "scale(0.98)", // 클릭할 때 버튼 살짝 줄어듦
      }}
    >
      {children}
    </Button>
  );
};

export const BlueDrawingButton: React.FC<BlueRectangleButtonProps> = ({
  children,
  onClick,
}) => {
  return (
    <Button
      onClick={onClick} // onClick 이벤트 연결
      bg={COLOR.DEEPBLUE}
      color="white"
      width="100%"
      fontSize="20px"
      fontWeight="extrabold"
      height="45px"
      borderRadius="16px"
      _hover={{
        bg: COLOR.DEEPBLUE, // hover 시 배경색
        color: "white", // hover 시 텍스트 색상 유지
      }}
      // _active={{
      //   transform: "scale(0.98)", // 클릭할 때 버튼 살짝 줄어듦
      // }}
    >
      {children}
    </Button>
  );
};
