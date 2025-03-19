import axios from "axios";
import { getCookie } from "../hook/auth/useCheckAuth";

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = getCookie("refresh_token");
      if (!refreshToken) {
        window.location.href = "/login";
        return Promise.reject(error);
      }
      const resp = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: "post",
        credentials: "include",
      });
      if (resp.ok) {
        console.log("토큰 재발급 성공");
        return api(originalRequest);
      } else {
        console.log("토큰 재발급 실패");
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }
  }
);
