export interface CommentSendRequestBody {
  content: string;
}

//퀴즈
export interface QuizQueryResponseBody {
  quiz: {
    id: number;
    title: string;
    type: string;
    wrongCount: number;
    isSolved: boolean;
  };
  questions: [
    {
      id: number;
      content: string;
      isAnswer: boolean;
    }
  ];
}

export interface QuizSolveRequestBody {
  quizId: number;
  questionId: number;
}

export interface QuizSolveResponseBody {
  result: boolean;
  wrongCount: number;
}

export interface SmeltsLetterQueryResponseBody {
  smelt: {
    id: number;
    senderId: number;
    receiverId: number;
    smeltTypeId: number;
    status: string;
  };
  letter: {
    id: number;
    title: string;
    content: string;
    senderName: string;
    createdTime: string;
    comment: {
      id: number;
      content: string;
      createdTime: string;
    };
  };
}

export interface SmeltsCategoryQueryResponseBody {
  smeltTypes: [
    {
      id: number;
      name: string;
      image: string;
      iceImage: string;
    }
  ];
}
