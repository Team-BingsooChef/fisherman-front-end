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
    if (error.response.status === 500) {
      console.log("서버 내부 오류 발생");
      // window.location.href = "/login";
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);
