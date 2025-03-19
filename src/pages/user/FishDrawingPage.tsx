import styled from "@emotion/styled";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { WhiteLeftHeader } from "../../components/common/Header";
import { BlueDrawingButton } from "../../components/common/CustomedButton";
import { LotteryMachine, InfoBox } from "../../components/user/FishDrawing";
import coin from "../../assets/pictures/coin.svg";
import fishbag from "../../assets/pictures/fishbag.svg";
import { Flex, Text, Box } from "@chakra-ui/react";
import { FaInfoCircle } from "react-icons/fa";
import { useModalOpenStore, useModalStateStore } from "../../store/modal";
import { useModalHeight } from "../../hook/useModalHeight";
import { ModalLayout } from "../../components/home/modal/ModalLayout";

import { useQueryInventory } from "../../hook/inventory/useQueryInventory";
import { useGetFishingSpotId } from "../../hook/fishingspot/useGetFishingSpotId";

export default function FishDrawingPage() {
  const { data: inventoryData } = useQueryInventory();
  const { data: fishingSpotData } = useGetFishingSpotId();

  const navigate = useNavigate();
  const { onOpen } = useModalOpenStore();
  const { setModalState } = useModalStateStore();

  useModalHeight("24%");
  const showDraw = () => {
    setModalState("makeSureDrawing");
    onOpen();
  };

  return (
    <Wrapper>
      <WhiteLeftHeader
        text="빙어 뽑기"
        onBackClick={() => navigate(`/${fishingSpotData?.fishingSpotId}`)}
      />

      <Flex direction="column" align="flex-end" w="full" gap="13px">
        {/* 코인 정보 */}
        <InfoBox
          icon={<FaInfoCircle size="24px" color="#7c7c7c" />}
          label={`코인은 빙어를 뽑을 때 사용됩니다.\n 친구에게 빙어를 보내거나 친구에게서 빙어를 받을 때 3개의 코인을 받을 수 있어요!`}
        >
          <img src={coin} alt="coin" width="40px" height="40px" />
          <Text fontSize="24px" fontWeight="semibold" letterSpacing="-1px">
            X {inventoryData?.coin}
          </Text>
        </InfoBox>

        {/* 가방 */}
        <Button
          onClick={() => navigate("/fishbag")}
          w="110px"
          h="46px"
          bgColor="#AFD5F4"
          borderRadius="8px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap="13px"
          _hover={{ bgColor: "#91C8E7" }} // 호버 시 약간 어두운 색상
          _active={{ bgColor: "#7AB6D8" }} // 클릭 시 색상 변경
        >
          <img src={fishbag} alt="fishbag" width="40px" height="40px" />
          <Text fontSize="20px" fontWeight="semibold">
            가방
          </Text>
        </Button>
      </Flex>
      <LotteryMachine />

      {/* 뽑기 버튼 */}
      <Box w="200px" mt="24px">
        <BlueDrawingButton onClick={showDraw}>뽑기</BlueDrawingButton>
      </Box>
      <ModalLayout backgroundColor="#AFD5F4" />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: calc(100% - 60px);
  display: flex;
  flex-direction: column;
  align-items: center;
`;
