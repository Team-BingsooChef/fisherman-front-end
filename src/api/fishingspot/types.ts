export interface SmeltsPostRequestBody {
  smeltId: number;
  title: string;
  content: string;
  senderName: string;
  quiz: {
    title: string;
    content: string;
    type: string;
    questions: string;
    answerIndex: number;
  };
}

export interface FishingSpotQueryResponseBody {
  nickname: string;
  currPage: number;
  totalPages: number;
  totalElements: number;
  smelts: [
    {
      id: number;
      smeltTypeId: number;
      status: string;
    }
  ];
}

