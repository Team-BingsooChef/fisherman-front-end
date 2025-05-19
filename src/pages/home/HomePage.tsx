import styled from "@emotion/styled";
import { useParams } from "react-router-dom";
import { OwnerView, ChefView } from "../../components/home/View";
import { ModalLayout } from "../../components/home//modal/ModalLayout";
import { useDetermineRole } from "../../hook/fishingspot/useDetermineRole";

export default function HomePage() {
  const role = useDetermineRole();
  const fishingSpotId = useParams();

  const currentFishingSpotId = fishingSpotId.fishingSpotId;
  if (currentFishingSpotId) {
    localStorage.setItem("redirectFishingSpotId", currentFishingSpotId);
  }

  return (
    <Wrapper>
      {role === "chef" ? (
        <ChefView currentFishingSpotId={Number(currentFishingSpotId)} />
      ) : (
        <OwnerView />
      )}
      <ModalLayout />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: hidden;
`;
