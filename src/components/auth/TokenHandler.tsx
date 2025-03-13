import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// ✅ URL에서 토큰을 추출하는 함수
const extractTokensFromURL = () => {
  const params = new URLSearchParams(window.location.search);
  const accessToken = params.get("access_token");
  const refreshToken = params.get("refresh_token");
  const isFreshUser = params.get("is_fresh_user") === "true";

  return { accessToken, refreshToken, isFreshUser };
};

export const TokenHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const { accessToken, refreshToken, isFreshUser } = extractTokensFromURL();

    if (accessToken && refreshToken) {
      // ✅ 토큰 저장
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      // ✅ URL 클리어 (토큰 노출 방지)
      window.history.replaceState({}, document.title, "/");

      // ✅ 로컬 환경이면 localhost로 이동
      if (window.location.hostname !== "localhost") {
        const newURL = new URL(window.location.href);
        newURL.hostname = "localhost";
        newURL.port = "5173";
        window.location.href = newURL.toString();
      } else {
        navigate(isFreshUser ? "/aftersignup" : "/");
      }
    }
  }, [navigate]);

  return null;
};
