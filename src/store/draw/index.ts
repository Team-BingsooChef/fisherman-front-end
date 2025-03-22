import { create } from "zustand";
import { SmeltsDrawResponseBody } from "../../api/inventory/types";

interface DrawResultState {
  result: SmeltsDrawResponseBody | null;
  setResult: (data: SmeltsDrawResponseBody) => void;
  resetResult: () => void;
}

export const useDrawResultStore = create<DrawResultState>((set) => ({
  result: null,
  setResult: (data) => set({ result: data }),
  resetResult: () => set({ result: null }),
}));
