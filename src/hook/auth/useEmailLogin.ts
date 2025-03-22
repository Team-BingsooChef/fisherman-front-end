import { useMutation } from "@tanstack/react-query";
// import { AxiosResponse } from "axios";
import { EmailSignInRequest } from "../../api/auth/types";
import { emailLogin } from "../../api/auth/apis";

export const useEmailLogin = () => {
  return useMutation({
    mutationFn: (req: EmailSignInRequest) => emailLogin(req),
    // onSuccess: (data: AxiosResponse) => {
    //   if (data.status === 302 && data.headers.location) {
    //     window.location.href = data.headers.location;
    //   }
    // },
  });
};
