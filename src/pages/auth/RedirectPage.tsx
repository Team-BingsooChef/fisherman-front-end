import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useEmailLogin } from "../../hook/auth/useEmailLogin";
import { useGetFishingSpotId } from "../../hook/fishingspot/useGetFishingSpotId";

export default function RedirectPage() {
  const navigate = useNavigate();

  const { isPending, isError, error } = useEmailLogin();
  const { data } = useGetFishingSpotId();

  useEffect(
    () => {
      const searchParams = new URLSearchParams(location.search);
      const isFreshUser = searchParams.get("isFreshUser");
      const fishingSpotId = data?.fishingSpotId;

      if (isFreshUser === "true") {
        navigate("/aftersignup", { state: { oauthuser: true } });
      } else if (isFreshUser === "false") {
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
          navigate(`/spot/${redirectFishingSpotId}`);
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <div>
      <h1>RedirectPage</h1>
      {isPending && <p>로그인 중입니다...</p>}
      {isError && <p>로그인 실패: {error?.message}</p>}
    </div>
  );
}
