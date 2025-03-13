import axios from "axios";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants/const";
import { ApiError } from "../api/global/apis";
import { useQueryClient } from "@tanstack/react-query";

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// api.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;
//     if (
//       (error.response.status === 401 || error.response.status === 500) &&
//       !originalRequest._retry
//     ) {
//       originalRequest._retry = true;
//       const refreshToken = localStorage.getItem(REFRESH_TOKEN);
//       if (!refreshToken) {
//         window.location.href = "/login";
//         return Promise.reject(error);
//       }
//       const resp = await fetch(`${API_BASE_URL}/auth/refresh`, {
//         method: "post",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${refreshToken}`,
//         },
//       });
//       if (resp.ok) {
//         console.log("토큰 재발급 성공");
//         const res = await resp.json();
//         localStorage.setItem(ACCESS_TOKEN, res.accessToken);
//         localStorage.setItem(REFRESH_TOKEN, res.refreshToken);
//         return api(originalRequest);
//       } else {
//         console.log("토큰 재발급 실패");
//         localStorage.removeItem(ACCESS_TOKEN);
//         localStorage.removeItem(REFRESH_TOKEN);
//         window.location.href = "/login";
//       }
//       return Promise.reject(error);
//     }
//   }
// );
