import { emailLogin } from "../../api/auth/apis";
import { EmailSignInRequest } from "../../api/auth/types";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export const useEmailLogin = (onSuccess: (data: AxiosResponse) => void) => {
  const { mutate, data, isPending, isError, error } = useMutation({
    mutationFn: (req: EmailSignInRequest) => emailLogin(req),
    onSuccess: (data) => {
      onSuccess(data);
    },
  });

  return { mutate, data, isPending, isError, error };
};
