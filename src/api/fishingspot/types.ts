export interface PostSmeltsRequestBody {
  smeltId: number;
  title: string;
  content: string;
  senderName: string;
}

export interface QuerysmeltsResponseBody {
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
