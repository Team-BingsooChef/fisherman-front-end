import { getEmailCode } from "../../api/auth/apis";
import { EmailCodeSendRequest } from "../../api/auth/types";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const useGetEmailCode = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const getEmailCodeMutation = useMutation({
    mutationFn: (req: EmailCodeSendRequest) => getEmailCode(req),
    onSuccess: () => {
      toast({
        title: "인증 코드를 전송했습니다",
        status: "success",
        duration: 3000,
      });
      navigate("/emailcheck", { state: { from: "signup" } });
    },
    onError: () => {
      toast({
        title: "인증 코드 전송 실패",
        status: "error",
        duration: 3000,
      });
    },
  });

  return {
    getEmailCode: getEmailCodeMutation.mutateAsync,
    isSending: getEmailCodeMutation.isPending,
  };
};
