import styled from "@emotion/styled";
import { useParams } from "react-router-dom";
import { OwnerView, ChefView } from "../../components/home/View";
import { ModalLayout } from "../../components/home//modal/ModalLayout";
import { useDetermineRole } from "../../hook/fishingspot/useDetermineRole";
import { useLocation } from "react-router-dom";

export default function HomePage() {
  const role = useDetermineRole();
  const fishingSpotId = useParams();

  const currentFishingSpotId = fishingSpotId.fishingSpotId;
  const location = useLocation();

  if (
    currentFishingSpotId &&
    role !== "owner" &&
    !(
      location.state?.from === "loginPage" ||
      location.state?.from === "redirectPage"
    )
  ) {
    localStorage.setItem("redirectFishingSpotId", currentFishingSpotId);
  }

  return (
    <Wrapper>
      {role === "chef" ? (
        <ChefView currentFishingSpotId={Number(currentFishingSpotId)} />
      ) : (
        <OwnerView currentFishingSpotId={Number(currentFishingSpotId)} />
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
