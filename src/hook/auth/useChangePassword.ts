import { changePassword, ChangePasswordRequest } from "../../api/auth/apis";
import { getUserId } from "../../api/user/apis";
import { useQuery } from "@tanstack/react-query";

export const useChangePassword = () => {
  const { data: userId } = useQuery<number>({
    queryKey: ["userId"],
    queryFn: getUserId,
  });

  const changePasswordMutation = async (req: ChangePasswordRequest) => {
    await changePassword(userId as number, req);
  };

  return { changePasswordMutation };
};
