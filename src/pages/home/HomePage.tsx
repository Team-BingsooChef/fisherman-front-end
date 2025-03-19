import styled from "@emotion/styled";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { OwnerView, ChefView } from "../../components/home/View";
import { ModalLayout } from "../../components/home//modal/ModalLayout";
import { useDetermineRole } from "../../hook/fishingspot/useDetermineRole";
import { useCheckAuth } from "../../hook/auth/useCheckAuth";

export default function HomePage() {
  const { isLoggedIn } = useCheckAuth();
  const role = useDetermineRole();
  const fishingSpotId = useParams();
  const navigate = useNavigate();
  const currentFishingSpotId = fishingSpotId.fishingSpotId;
  if (currentFishingSpotId) {
    localStorage.setItem("fishingSpotId", currentFishingSpotId);
  }

  useEffect(() => {
    if (!isLoggedIn) {
      localStorage.setItem("redirectUrl", `/${fishingSpotId}`);
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Wrapper>
      {role === "chef" ? <ChefView /> : <OwnerView />}
      <ModalLayout />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
