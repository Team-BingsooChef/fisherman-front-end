import { useModalStateStore } from "../../../store/modal";

import { OpenQuiz } from "../../owner/OpenQuiz";
import { ReadMessage } from "../../owner/ReadMessage";

import { FishDrawingResult } from "../../owner/FishDrawing";
import { MakeSureDrawing } from "../../owner/FishDrawing";

//Chef의 Modal component들은 chef에, Owner의 Modal component들은 owner에 들어가져있음

export const ModalContent = () => {
  const { modalState } = useModalStateStore();

  switch (modalState) {
    //chef 입장
    //     chef 입장의 기존 모달들 그냥 page로 바꿨음
    //여기서부턴 owner 입장
    case "openQuiz":
      return <OpenQuiz />;
    case "readMessage":
      return <ReadMessage />;
    case "fishDrawingResult":
      return <FishDrawingResult />;
    case "makeSureDrawing":
      return <MakeSureDrawing />;

    default:
      return <div>Default Modal Content</div>;
  }
};
