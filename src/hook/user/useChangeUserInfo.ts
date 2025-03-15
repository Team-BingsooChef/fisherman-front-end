import {
  changePassword,
  ChangePasswordRequest,
  changeNickName,
  getUserId,
} from "../../api/user/apis";
import { useQuery, useMutation } from "@tanstack/react-query";

export const useChangeUserInfo = () => {
  const { data: userId } = useQuery<number>({
    queryKey: ["userId"],
    queryFn: getUserId,
  });

  const changePasswordMutation = useMutation<
    void,
    Error,
    ChangePasswordRequest
  >({
    mutationFn: (req: ChangePasswordRequest) =>
      changePassword(userId as number, req),
  });

  const changeNickNameMutation = useMutation<void, Error, string>({
    mutationFn: (nickname: string) =>
      changeNickName(userId as number, nickname),
  });

  return {
    changePw: changePasswordMutation.mutate,
    changeNickname: changeNickNameMutation.mutate,
  };
};
