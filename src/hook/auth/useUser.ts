import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants/const.ts";
import { ApiError } from "../../api/global/apis.ts";
import { EmailSignInRequest } from "../../api/auth/types.ts";
import { LoginResponse, emailLogin } from "../../api/auth/apis.ts";
import { getUserId, queryUserInfo } from "../../api/user/apis.ts";
import { getFishingSpotId } from "../../api/fishingspot/apis.ts";

export interface UserModel {
  email: string;
  nickname: string;
  fishingSpotId: number;
  userId: number;
}

interface UserState {
  user?: UserModel;
  error: ApiError | null;
  login: (req: EmailSignInRequest) => Promise<void>;
}

export function useUser(): UserState {
  const queryClient = useQueryClient();

  const { data: user, error } = useQuery<UserModel, ApiError>({
    queryKey: ["user"],
    queryFn: async () => {
      const userId = await getUserId();
      const userInfo = await queryUserInfo(userId);
      const fishingSpotIdResponse = await getFishingSpotId();
      const fishingSpotId = fishingSpotIdResponse.fishingSpotId;

      return {
        email: userInfo.email,
        nickname: userInfo.nickname,
        fishingSpotId: fishingSpotId,
        userId: userId,
      };
    },
    enabled: !!localStorage.getItem(ACCESS_TOKEN), // 토큰이 있을 때만 실행
  });

  const loginMutation = useMutation<
    LoginResponse,
    ApiError,
    EmailSignInRequest
  >(emailLogin, {
    onSuccess: async (response) => {


      const userId = await getUserId();
      const userInfo = await queryUserInfo(userId);
      const fishingSpotIdResponse = await getFishingSpotId();
      const fishingSpotId = fishingSpotIdResponse.fishingSpotId;

      const userModel: UserModel = {
        email: userInfo.email,
        nickname: userInfo.nickname,
        fishingSpotId: fishingSpotId,
        userId: userId,
      };

      queryClient.setQueryData(["user"], userModel);
    },
  });

  return {
    user,
    error,
    login: async (req) => {
      await loginMutation.mutateAsync(req);
    },
  };
}
