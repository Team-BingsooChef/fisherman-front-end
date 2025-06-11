import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { EmailSignInRequest, EmailSignInResponse } from "../../api/auth/types";
import { emailLogin } from "../../api/auth/apis";
import { useGetFishingSpotId } from "../fishingspot/useGetFishingSpotId";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let gtag: (...args: any[]) => void;

export const useEmailLogin = () => {
  const navigate = useNavigate();
  const { data: fishingSpotId, refetch: refetchFishingSpotId } =
    useGetFishingSpotId({
      enabled: false,
    });

  return useMutation({
    mutationFn: (req: EmailSignInRequest) => emailLogin(req),
    onSuccess: async (data: EmailSignInResponse) => {
      if (data.freshUser === true) {
        navigate("/aftersignup", { state: { oauthuser: false } });
      } else {
        gtag("event", "login", {
          method: "email",
        });

        // 로그인 성공 후 fishingSpotId 조회 실행
        await refetchFishingSpotId();

        const redirectFishingSpotId = localStorage.getItem(
          "redirectFishingSpotId"
        );
        const isValidId =
          redirectFishingSpotId &&
          // eslint-disable-next-line eqeqeq
          redirectFishingSpotId != null &&
          redirectFishingSpotId.trim() !== "";

        if (!isValidId) {
          navigate(`/spot/${fishingSpotId?.fishingSpotId}`);
        } else {
          navigate(`/spot/${redirectFishingSpotId}`);
          localStorage.removeItem("redirectFishingSpotId");
        }
      }
    },
  });
};
