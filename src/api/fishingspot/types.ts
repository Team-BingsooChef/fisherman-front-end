export interface SmeltsPostRequestBody {
  smeltTypeId: number;
  content: string;
  senderName: string;
  quiz?: {
    title: string;
    type: string;
    questions: string[];
    answerIndex: number;
  } | null;
}
export enum QuizType {
  multiple = "MULTIPLE",
  ox = "OX",
}
export enum SmeltStatus {
  DREW = "DREW", // 뽑음: 다른 낚시터에 보내지 않음
  UNREAD = "UNREAD", // 읽지 않음 - 퀴즈가 있다면 풀지 않음
  SOLVED = "SOLVED", // 문제를 풀었으나 읽지 않음
  READ = "READ", // 읽음
}

export interface FishingSpotQueryResponseBody {
  nickname: string;
  currPage: number;
  totalPages: number;
  totalElements: number;
  smelts: {
    id: number;
    smeltTypeId: number;
    status: SmeltStatus;
  }[];
}

export interface FishingSpotSearchResponseBody {
  fishingSpotId: number;
  nickname: string;
}

export type FishingSpotSearchResponse = FishingSpotSearchResponseBody[];
