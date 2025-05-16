export type CommentSendRequestBody = {
  content: string;
};

//퀴즈
export type QuizQueryResponseBody = {
  quiz: {
    id: number;
    title: string;
    type: string;
    wrongCount: number;
    isSolved: boolean | null;
  };
  questions: {
    id: number;
    content: string;
    isAnswer: boolean;
  }[];
};

export type QuizSolveRequestBody = {
  questionId: number;
};

export type QuizSolveResponseBody = {
  result: boolean;
  wrongCount: number;
};

export type SmeltsLetterQueryResponseBody = {
  smelt: {
    id: number;
    senderId: number;
    receiverId: number;
    smeltTypeId: number;
    status: string;
  };
  letter: {
    id: number;
    content: string;
    senderName: string;
    createdTime: string;
    comment: {
      id: number;
      content: string;
      createdTime: string;
    } | null;
  };
};

export type SmeltsCategoryQueryResponseBody = {
  smeltTypes: {
    id: number;
    name: string;
    imageUrl: string;
    iceImageUrl: string;
    probability: number;
  }[];
};
