export interface SmeltsDrawResponseBody {
  smelt: {
    id: number;
    inventoryId: number;
    smeltTypeId: number;
    status: string;
  };
}

export interface SmeltsInventoryQueryResponseBody {
  counts: [
    {
      count: number;
      smeltTypeId: number;
    }
  ];
}

export interface SentSmeltsQueryResponseBody {
  nickname: string;
  currPage: number;
  totalPages: number;
  totalElements: number;
  smelts: [
    {
      id: number;
      inventoryId: number;
      fishingSpotId: number;
      smeltTypeId: number;
      status: string;
      letter: {
        id: number;
        senderName: string;
        title: string;
        content: string;
        createdTime: string;
        comment: {
          id: number;
          content: string;
          createdTime: string;
        };
      };
    }
  ];
}
