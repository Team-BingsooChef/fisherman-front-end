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
    content:
      "빙어를 보내며 이렇게 편지를 남깁니다. 우리가 함께했던 시간들이 벌써 그리워지네요. 처음 만났을 때는 어색하고 서툴렀지만, 어느새 서로를 이해하고 아껴주는 사이가 된 것 같아 참 고마워요. 바쁜 일상 속에서도 종종 생각나고, 덕분에 힘들었던 날에도 웃을 수 있었습니다. 앞으로도 서로 힘이 되어주며 좋은 추억을 쌓아가면 좋겠어요. 항상 건강하고, 하고 싶은 일 모두 이뤄나가길 진심으로 응원할게요. 내가 보낸 빙어가 네게 작은 행운과 기쁨을 전해주었으면 좋겠습니다. 언제나 고마워요!",
    senderName: "고바오",
    createdTime: "2025-05-19T14:35:00Z",
    comment: {
      id: 9101,
      content: "고마워! 나도 항상 응원할게!",
      createdTime: "2025-05-19T15:10:00Z",
    },
  },
};
