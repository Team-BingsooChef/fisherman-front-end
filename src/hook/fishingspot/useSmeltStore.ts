import { create } from "zustand";
import { SmeltsPostRequestBody } from "../../api/fishingspot/types";

interface QuizState {
  title: string;
  content: string;
  type: "OX" | "MULTIPLE";
  questions: string[];
  answerIndex: number;
}

interface SmeltState extends Omit<SmeltsPostRequestBody, "quiz"> {
  smeltTypeId: number;
  title: string;
  content: string;
  senderName: string;

  quiz: QuizState | null;

  setSmeltTypeId: (smeltTypeId: number) => void;
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  setSenderName: (senderName: string) => void;

  setQuiz: (quiz: QuizState | null) => void;

  setQuizTitle: (title: string) => void;
  setQuizContent: (content: string) => void;
  setQuizType: (type: "OX" | "MULTIPLE") => void;
  setQuizQuestions: (questions: string[]) => void;
  setQuizAnswerIndex: (answerIndex: number) => void;

  resetForm: () => void;

  hasValidQuiz: () => boolean;
}

export const useSmeltStore = create<SmeltState>((set, get) => ({
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

  setQuizTitle: (title) =>
    set((state) => ({
      quiz: state.quiz
        ? { ...state.quiz, title }
        : {
            title,
            content: "",
            type: "OX",
            questions: [],
            answerIndex: 0,
          },
    })),

  setQuizContent: (content) =>
    set((state) => ({
      quiz: state.quiz
        ? { ...state.quiz, content }
        : {
            title: "",
            content,
            type: "OX",
            questions: [],
            answerIndex: 0,
          },
    })),

  setQuizType: (type) =>
    set((state) => ({
      quiz: state.quiz
        ? { ...state.quiz, type }
        : {
            title: "",
            content: "",
            type,
            questions: [],
            answerIndex: 0,
          },
    })),

  setQuizQuestions: (questions) =>
    set((state) => ({
      quiz: state.quiz
        ? { ...state.quiz, questions }
        : {
            title: "",
            content: "",
            type: "OX",
            questions,
            answerIndex: 0,
          },
    })),

  setQuizAnswerIndex: (answerIndex) =>
    set((state) => ({
      quiz: state.quiz
        ? { ...state.quiz, answerIndex }
        : {
            title: "",
            content: "",
            type: "OX",
            questions: [],
            answerIndex,
          },
    })),

  resetForm: () =>
    set({
      smeltTypeId: 0,
      title: "",
      content: "",
      senderName: "",
      quiz: null,
    }),

  hasValidQuiz: () => {
    const { quiz } = get();
    return !!quiz && !!quiz.title && !!quiz.content;
  },
}));
