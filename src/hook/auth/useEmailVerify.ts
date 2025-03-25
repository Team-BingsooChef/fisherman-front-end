// src/hooks/auth/useEmailAuth.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";
import { verifyEmailCode, getEmailCode } from "../../api/auth/apis";
import { EmailCodeSendRequest } from "../../api/auth/types";

export const useEmailVerify = () => {
  const toast = useToast();
  const queryClient = useQueryClient();

  const verifyMutation = useMutation({
    mutationFn: ({
      auth_code,
      req,
    }: {
      auth_code: string;
      req: EmailCodeSendRequest;
    }) => verifyEmailCode(auth_code, req),
    onSuccess: () => {
      toast({
        title: "이메일 인증 성공",
        status: "success",
        duration: 3000,
      });
      queryClient.invalidateQueries({ queryKey: ["auth-status"] });
    },
    onError: () => {
      toast({
        title: "인증 코드가 틀렸습니다",
        status: "error",
        duration: 3000,
      });
    },
  });

  // ✅ 인증 코드 재전송 Mutation (auth_code 제거됨)
  const resendMutation = useMutation({
    mutationFn: (req: EmailCodeSendRequest) => getEmailCode(req),
    onSuccess: () => {
      toast({
        title: "인증 코드를 재전송했습니다",
        status: "success",
        duration: 3000,
      });
    },
    onError: () => {
      toast({
        title: "재전송 실패",
        description: "잠시 후 다시 시도해주세요",
        status: "error",
        duration: 3000,
      });
    },
  });

  return {
    verifyCode: verifyMutation.mutateAsync,
    resendCode: resendMutation.mutateAsync,
    isVerifying: verifyMutation.isPending,
    isResending: resendMutation.isPending,
  };
};
