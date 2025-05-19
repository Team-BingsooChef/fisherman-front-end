import { QuizQueryResponseBody } from "../../api/smelts/types";
export const mockQuizOX: QuizQueryResponseBody = {
  quiz: {
    id: 202,
    title: "빙어는 민물고기다.",
    type: "OX",
    wrongCount: 0,
    isSolved: false,
  },
  questions: [
    { id: 1, content: "O", isAnswer: true },
    { id: 2, content: "X", isAnswer: false },
  ],
};
