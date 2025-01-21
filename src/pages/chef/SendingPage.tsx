import styled from "@emotion/styled";
import { useState } from "react";
import { SelectToppingSection } from "../../components/chef/SelectToppingSection";
import { WriteLetterSection } from "../../components/chef/WriteLetterSection";
import { MakeQuizChoiceSection } from "../../components/chef/MakeQuizChoiceSection";

export default function SendingPage() {
  const [step, setStep] = useState(0); // 현재 단계 관리 (0: SelectToppingSection, 1: WriteLetterSection, 2: MakeQuizChoiceSection)

  const renderSection = () => {
    switch (step) {
      case 0:
        return <SelectToppingSection onNext={() => setStep(1)} />;
      case 1:
        return (
          <WriteLetterSection
            onNext={() => setStep(2)}
            onPrev={() => setStep(0)}
          />
        );
      case 2:
        return <MakeQuizChoiceSection onPrev={() => setStep(1)} />;
      default:
        return null;
    }
  };

  return <Wrapper>{renderSection()}</Wrapper>;
}

const Wrapper = styled.div`
  width: calc(100% - 40px);
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;
