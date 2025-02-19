export interface SmeltsPostRequestBody {
  smeltId: number;
  title: string;
  content: string;
  senderName: string;
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
