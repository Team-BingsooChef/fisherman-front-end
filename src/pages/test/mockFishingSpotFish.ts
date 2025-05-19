import { FishingSpotQueryResponseBody } from "../../api/fishingspot/types";
import { SmeltStatus } from "../../api/fishingspot/types"; // adjust the import path as needed

export const mockFishingSpotFish: FishingSpotQueryResponseBody = {
  nickname: "고바오",
  currPage: 1,
  totalPages: 3,
  totalElements: 8,
  smelts: [
    {
      id: 101,
      smeltTypeId: 1,
      status: SmeltStatus.READ, // originally "READ"
    },
    {
      id: 102,
      smeltTypeId: 2,
      status: SmeltStatus.UNREAD, // originally "READY" -> mapped to UNREAD
    },
    {
      id: 103,
      smeltTypeId: 3,
      status: SmeltStatus.SOLVED, // originally "USED" -> mapped to SOLVED
    },
    {
      id: 104,
      smeltTypeId: 4,
      status: SmeltStatus.DREW, // originally "EXPIRED" -> mapped to DREW
    },
    {
      id: 105,
      smeltTypeId: 5,
      status: SmeltStatus.UNREAD, // originally "READY" -> mapped to UNREAD
    },
    {
      id: 106,
      smeltTypeId: 6,
      status: SmeltStatus.SOLVED, // originally "USED" -> mapped to SOLVED
    },
    {
      id: 107,
      smeltTypeId: 7,
      status: SmeltStatus.UNREAD, // originally "READY" -> mapped to UNREAD
    },
    {
      id: 108,
      smeltTypeId: 8,
      status: SmeltStatus.DREW, // originally "EXPIRED" -> mapped to DREW
    },
  ],
};
