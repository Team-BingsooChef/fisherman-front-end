import styled from "@emotion/styled";
import { useParams } from "react-router-dom";
import { OwnerView, ChefView } from "../../components/home/View";
import { ModalLayout } from "../../components/home//modal/ModalLayout";
import { useDetermineRole } from "../../hook/fishingspot/useDetermineRole";

export default function HomePage() {
  const { fishingSpotId } = useParams();
  type Role = "chef" | "owner";
  const role: Role = "chef";

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
