import { create } from "zustand";
import { SmeltsPostRequestBody } from "../../api/fishingspot/types";

interface SmeltState extends SmeltsPostRequestBody {
  setSmeltTypeId: (smeltTypeId: number) => void;
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  setSenderName: (senderName: string) => void;
  setQuiz: (quiz: SmeltsPostRequestBody["quiz"] | null) => void; //설정 x -> null
  resetForm: () => void;
}

export const useSmeltStore = create<SmeltState>((set) => ({
  smeltTypeId: 0,
  title: "",
  content: "",
  senderName: "",
  quiz: null,

  setSmeltTypeId: (smeltTypeId) => set({ smeltTypeId }),
  setTitle: (title) => set({ title }),
  setContent: (content) => set({ content }),
  setSenderName: (senderName) => set({ senderName }),
  setQuiz: (quiz) => set({ quiz }),

  resetForm: () =>
    set({
      smeltTypeId: 0,
      title: "",
      content: "",
      senderName: "",
      quiz: null,
    }),
}));
