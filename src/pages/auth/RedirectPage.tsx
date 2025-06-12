import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useEmailLogin } from "../../hook/auth/useEmailLogin";
import { useGetFishingSpotId } from "../../hook/fishingspot/useGetFishingSpotId";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let gtag: (...args: any[]) => void;

export default function RedirectPage() {
  const navigate = useNavigate();

  const { isPending, isError, error } = useEmailLogin();
  const { data } = useGetFishingSpotId();

  useEffect(
    () => {
      // 가드
      // 만약 useGetFishingSpotId 훅에서 아직 데이터를 받아오지 못했다면 함수 종료
      if (!data) {
        return;
      }
      const searchParams = new URLSearchParams(location.search);
      const isFreshUser = searchParams.get("isFreshUser");
      const fishingSpotId = data?.fishingSpotId;

      if (isFreshUser === "true") {
        navigate("/aftersignup", { state: { oauthuser: true } });
      } else {
        gtag("event", "login", {
          method: "oauth",
        });
        const redirectFishingSpotId = localStorage.getItem(
          "redirectFishingSpotId"
        );
        const isValidId =
          redirectFishingSpotId &&
          // eslint-disable-next-line eqeqeq
          redirectFishingSpotId != null &&
          redirectFishingSpotId.trim() !== "";

        if (!isValidId) {
          navigate(`/spot/${fishingSpotId}`);
        } else {
          navigate(`/spot/${redirectFishingSpotId}`, {
            state: { from: "redirectPage" },
          });
          localStorage.removeItem("redirectFishingSpotId");
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data]
  );

  return (
    <div>
      <h1>RedirectPage</h1>
      {isPending && <p>로그인 중입니다...</p>}
      {isError && <p>로그인 실패: {error?.message}</p>}
    </div>
  );
}
