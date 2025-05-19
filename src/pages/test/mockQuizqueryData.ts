import { QuizQueryResponseBody } from "../../api/smelts/types";

export const mockQuizQueryData: QuizQueryResponseBody = {
  quiz: {
    id: 101,
    title: "아래 중 빙어에 해당하지 않는 것은?",
    type: "객관식",
    wrongCount: 2,
    isSolved: false,
  },
  questions: [
    {
      id: 1,
      content: "붕어빵",
      isAnswer: false,
    },
    {
      id: 2,
      content: "비단잉어",
      isAnswer: false,
    },
    {
      id: 3,
      content: "황금빙어",
      isAnswer: false,
    },
    {
      id: 4,
      content: "상어",
      isAnswer: true,
    },
  ],
};
