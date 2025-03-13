export interface SmeltsDrawResponseBody {
  smelt: {
    id: number;
    inventoryId: number;
    smeltTypeId: number;
    status: string;
  };
}

export type SmeltsInventoryQueryResponseBody = {
  counts: {
    smeltTypeId: number;
    count: number;
  }[];
};

export type SentSmeltsQueryResponseBody = {
  currPage: number;
  totalPages: number;
  totalElements: number;
  smelts: {
    id: number;
    inventoryId: number;
    fishingSpotId: number;
    fishermanNickname: string;
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
  }[];
};
