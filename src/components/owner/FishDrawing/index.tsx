import { useModalHeight } from "../../../hook/useModalHeight";
import { useModalOpenStore, useModalStateStore } from "../../../store/modal";
import {Text, Flex} from "@chakra-ui/react";
import { BlueEllipseButton } from "../../common/CustomedButton";
import { useCreateToppingStore } from '../../../store/api/topping/index';

type QuizType = "Multiple" | "OX";

export const FishDrawingResult = () => {
    const { setModalState } = useModalStateStore();
    useModalHeight("24%"); 

    const goSetChefName = () => {
        setModalState("setChefName");
        };
    const goSelectQuizType = () => {
        setModalState("selectQuizType");
        };
    return (
    <>
    <Text color="white" fontSize="24px">퀴즈를 만드시겠습니까?</Text>
    <Flex w="calc(100% - 90px)" gap="24px" mt="20px">
    <BlueEllipseButton onClick={goSelectQuizType}>예</BlueEllipseButton>
    <BlueEllipseButton onClick={goSetChefName}>아니요</BlueEllipseButton>
    </Flex>
    </>
    );
  };
  
  export const MakeSureDrawing = () => {
    const { onClose } = useModalOpenStore();
    const { setModalState } = useModalStateStore();
    const { setQuizType } = useCreateToppingStore();
  
    // 퀴즈 타입 설정 후 모달 상태 변경
    const handleDrawing = () => {
      setModalState("fishDrawingResult"); // 모달 상태 변경
    };
    const handleCancleDrawing = () => {
      onClose();
    }
  
    useModalHeight("25%"); // 모달 높이 설정
  
    return (
      <Flex w="full" flexDir="column" align="center" justify="center">
        <Text color="#13353B" fontWeight="semibold" fontSize="20px" textAlign="center">
          뽑기를 진행하시겠습니까? <br/>
        코인 1개가 차감됩니다.</Text>
        <Flex w="calc(100% - 60px)" gap="26px" mt="20px">
          <BlueEllipseButton onClick={handleDrawing}>
            예
          </BlueEllipseButton>
          <BlueEllipseButton onClick={handleCancleDrawing}>
            아니요
          </BlueEllipseButton>
        </Flex>
      </Flex>
    );
  };
  
