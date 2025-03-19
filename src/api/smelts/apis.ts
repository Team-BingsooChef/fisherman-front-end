import { api } from "../../config/axios";

import {
  CommentSendRequestBody,
  QuizQueryResponseBody,
  QuizSolveRequestBody,
  QuizSolveResponseBody,
  SmeltsLetterQueryResponseBody,
  SmeltsCategoryQueryResponseBody,
} from "./types";

export function sendComment(
  smeltId: number,
  req: CommentSendRequestBody
): Promise<void> {
  return api.post(`/smelts/${smeltId}/comments`, req);
}

export async function queryQuiz(
  smeltId: number
): Promise<QuizQueryResponseBody> {
  const res = await api.get(`/smelts/${smeltId}/quizzes`);
  return res.data;
}

export async function solveQuiz(
  smeltId: number,
  req: QuizSolveRequestBody
): Promise<QuizSolveResponseBody> {
  const res = await api.patch(`/smelts/${smeltId}/quizzes`, req);
  return res.data;
}

export async function querySmeltsDetail(
  smeltId: number
): Promise<SmeltsLetterQueryResponseBody> {
  const res = await api.get(`/smelts/${smeltId}`);
  return res.data;
}

export async function querySmeltsCategory(): Promise<SmeltsCategoryQueryResponseBody> {
  const res = await api.get(`/smelts/types`);
  return res.data;
}
