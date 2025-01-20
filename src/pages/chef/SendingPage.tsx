import styled from "@emotion/styled";
import { SelectToppingSection } from "../../components/chef/SelectToppingSection";
import { WriteLetterSection } from "../../components/chef/WriteLetterSection";

export default function SendingPage() {
  return (
    <Wrapper>
      <WriteLetterSection />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: calc(100% - 40px);
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;
