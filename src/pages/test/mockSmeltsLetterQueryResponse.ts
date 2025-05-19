import { SmeltsLetterQueryResponseBody } from "../../api/smelts/types";

export const mockSmeltsLetterQueryResponse: SmeltsLetterQueryResponseBody = {
  smelt: {
    id: 5001,
    senderId: 2001,
    receiverId: 3001,
    smeltTypeId: 4,
    status: "UNREAD",
  },
  letter: {
    id: 9001,
    content: "빙어를 잘 키워줘서 고마워요! 앞으로도 응원할게요 😊",
    senderName: "고바오",
    createdTime: "2025-05-19T14:35:00Z",
    comment: {
      id: 9101,
      content: "고마워! 나도 항상 응원할게!",
      createdTime: "2025-05-19T15:10:00Z",
    },
  },
};
