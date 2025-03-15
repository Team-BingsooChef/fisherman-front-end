import { sendComment } from "../../api/smelts/apis";
import { CommentSendRequestBody } from "../../api/smelts/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useReply = (smeltId: number) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation<void, Error, CommentSendRequestBody>({
    mutationFn: (req: CommentSendRequestBody) => sendComment(smeltId, req), // smeltId와 req를 전달
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["smeltsDetail", smeltId] });
    },
  });

  return { mutate };
};
