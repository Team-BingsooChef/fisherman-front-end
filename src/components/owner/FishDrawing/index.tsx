import { useState } from "react";
import { SyncLoader } from "react-spinners";
import { useModalHeight } from "../../../hook/useModalHeight";
import { useModalOpenStore, useModalStateStore } from "../../../store/modal";
import { Text, Flex, IconButton, Box, Image, useToast } from "@chakra-ui/react";
import { BlueEllipseButton } from "../../common/CustomedButton";
import { XIcon } from "lucide-react";
import { motion } from "framer-motion"; // Framer Motion import
import { useDrawResultStore } from "../../../store/draw/index";

import { useDrawSmelts } from "../../../hook/inventory/useDraw";
import { useSmeltsImg } from "../../../hook/smelts/useSmeltsImg";

export const FishDrawingResult = () => {
  const { result: data } = useDrawResultStore();

  const { getImageUrl, data: smeltsCategoryInfo } = useSmeltsImg();
  const imgURL = getImageUrl(data?.smelt.smeltTypeId ?? 1);
  const { onClose } = useModalOpenStore();
  useModalHeight("70%");

  const translateSmeltTypeName = (smeltTypeName: string): string => {
    switch (smeltTypeName) {
      case "Betta":
        return "베타";
      case "Bungeoppang":
        return "붕어빵";
      case "GoldenSmelt":
        return "황금빙어";
      case "Koi":
        return "비단잉어";
      case "PufferFish":
        return "복어";
      case "RibbonFish":
        return "갈치";
      case "Shark":
        return "상어";
      case "Smelt":
        return "빙어";
      case "Trout":
        return "송어";
      default:
        return smeltTypeName;
    }
  };

  const smeltTypeName = smeltsCategoryInfo?.smeltTypes.find(
    (smelt) => smelt.id === data?.smelt.smeltTypeId
  )?.name;
  const translatedSmeltTypeName = smeltTypeName
    ? translateSmeltTypeName(smeltTypeName)
    : "알 수 없음";

  return (
    <Flex w="full" flexDir="column" align="center" position="relative">
      <Box boxSize="20px">
        <IconButton
          aria-label="close Modal"
          position="absolute"
          top="-30px"
          right="10px"
          variant="ghost"
          onClick={onClose}
        >
          <XIcon />
        </IconButton>
      </Box>

      {/* 결과 이미지 */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1.2 }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 10,
          duration: 0.8,
        }}
      >
        <Image boxSize="248px" src={imgURL}></Image>
      </motion.div>
      <Text
        color="#13353B"
        fontWeight="bold"
        fontSize="24px"
        mt="90px"
        textAlign="center"
      >
        {translatedSmeltTypeName} 당첨!
      </Text>
    </Flex>
  );
};

export const MakeSureDrawing = () => {
  const { onClose } = useModalOpenStore();
  const { setModalState } = useModalStateStore();
  const [isLoading, setIsLoading] = useState(false);
  const { mutate, errorMessage } = useDrawSmelts();
  const { setResult } = useDrawResultStore();
  const toast = useToast();

  const handleDrawing = async () => {
    setIsLoading(true);

    mutate(undefined, {
      onSuccess: (data) => {
        setResult(data);
        setTimeout(() => {
          setIsLoading(false);
          setModalState("fishDrawingResult");
        }, 3000);
      },
      onError: () => {
        setTimeout(() => {
          setIsLoading(false);
          toast({
            title: "코인이 부족합니다.",
            description: errorMessage,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
          onClose();
        }, 3000);
      },
    });
  };

  const handleCancleDrawing = () => {
    onClose();
  };

  useModalHeight("25%");

  if (isLoading) {
    return (
      <Flex w="full" h="100%" flexDir="column" align="center" justify="center">
        <SyncLoader color="#3887C7" size={10} />
        <Text mt={4} color="#13353B" fontWeight="semibold" fontSize="18px">
          뽑는 중
        </Text>
      </Flex>
    );
  }

  return (
    <Flex w="full" flexDir="column" align="center" justify="center">
      <Text
        color="#13353B"
        fontWeight="semibold"
        fontSize="20px"
        textAlign="center"
      >
        뽑기를 진행하시겠습니까? <br />
        코인 5개가 차감됩니다.
      </Text>
      <Flex w="calc(100% - 60px)" gap="26px" mt="20px">
        <BlueEllipseButton onClick={handleDrawing}>예</BlueEllipseButton>
        <BlueEllipseButton onClick={handleCancleDrawing}>
          아니요
        </BlueEllipseButton>
      </Flex>
    </Flex>
  );
};
