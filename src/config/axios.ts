import axios from "axios";

export const API_BASE_URL = "https://api.smelt-fishing.com";

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

    if (
      (error.response.status === 401 || error.response.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
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
          return Promise.reject(error);
        }
      } catch (refreshError) {
        console.log("토큰 재발급 요청 실패", refreshError);
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    if (error.response.status === 500) {
      console.log("서버 내부 오류 발생");
      // window.location.href = "/login";
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);
