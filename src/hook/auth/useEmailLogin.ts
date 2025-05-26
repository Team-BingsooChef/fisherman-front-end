import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { EmailSignInRequest, EmailSignInResponse } from "../../api/auth/types";
import { emailLogin } from "../../api/auth/apis";
import { useGetFishingSpotId } from "../fishingspot/useGetFishingSpotId";

export const useEmailLogin = () => {
  const { data: fishingSpotId } = useGetFishingSpotId();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (req: EmailSignInRequest) => emailLogin(req),
    onSuccess: (data: EmailSignInResponse) => {
      if (data.freshUser === true) {
        navigate("/aftersignup", { state: { oauthuser: false } });
      } else {
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
  });
};
