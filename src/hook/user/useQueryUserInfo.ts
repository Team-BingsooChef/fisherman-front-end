import { queryUserInfo, getUserId } from "../../api/user/apis";
import { useQuery } from "@tanstack/react-query";

export const useQueryUserInfo = () => {
  const { data: userId } = useQuery({
    queryKey: ["userId"],
    queryFn: getUserId,
  });

  const { data, error, isLoading } = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => queryUserInfo(userId as number),
    enabled: !!userId,
  });

  return { data, error, isLoading };
};
