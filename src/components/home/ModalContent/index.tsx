import { useModalStateStore } from "../../../store/modal";
import { SelectTopping } from "../../chef/SelectTopping";
import { WriteMessage } from "../../chef/WriteMessage";
import { QuizOrNot, SelectQuizType } from "../../chef/AskAboutQuiz";
import { MakeQuizChoice } from "../../chef/MakeQuizChoice";
import { SetChefName } from "../../chef/SetChefName";

import { OpenQuiz } from "../../owner/OpenQuiz";
import { ReplyLetter} from "../../owner/ReplyLetter";
import { ReadMessage } from "../../owner/ReadMessage";

import { FishDrawingResult } from "../../owner/FishDrawing";
import { MakeSureDrawing } from "../../owner/FishDrawing";

//Chef의 Modal component들은 chef에, Owner의 Modal component들은 owner에 들어가져있음

export const ModalContent = () => {
  const { modalState } = useModalStateStore();

  switch (modalState) {
    //chef 입장
    case "selectTopping":
      return <SelectTopping />;
    case "writeMessage":
      return <WriteMessage />;
    case "quizOrNot":
      return <QuizOrNot />;
    case "selectQuizType":
      return <SelectQuizType />;
    case "makeQuizChoice":
      return <MakeQuizChoice />;
    case "setChefName":
      return <SetChefName />;
    //여기서부턴 owner 입장
    case "openQuiz":
      return <OpenQuiz />;
    case "replyLetter":
      return <ReplyLetter />;
    case "readMessage":
      return <ReadMessage />;
    case "fishDrawingResult":
      return <FishDrawingResult/>;
    case "makeSureDrawing":
      return <MakeSureDrawing/>;
    default:
      return <div>Default Modal Content</div>;
  }
};
