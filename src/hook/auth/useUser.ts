// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { ApiError } from "../../api/global/apis";
// import {
//   EmailSignInRequestBody,
//   EmailSignUpRequestBody,
// } from "../../api/auth/types";
// export interface LoginResponse {
//   accessToken: string;
//   refreshToken: string;
// }

// interface UserState {
//   error: ApiError | null;
//   signup: (req: EmailSignUpRequestBody) => Promise<void>;
//   login: (req: EmailSignInRequestBody) => Promise<void>;
// }

// export function useUser(): UserState {
//   const queryClient = useQueryClient();

//   const loginMutation = useMutation<
//     LoginResponse,
//     ApiError,
//     EmailSignInRequestBody,
//     LoginResponse
//   >({
//     mutationFn: emailLogin,
//     onSuccess: async (response) => {
//       localStorage.setItem(ACCESS_TOKEN, response.accessToken);
//       localStorage.setItem(REFRESH_TOKEN, response.refreshToken);
//       const userInfo = await getMyInfo();
//       await queryClient.setQueryData(["userInfo"], userInfo);
//     },
//   });

//   const signupMutation = useMutation<void, ApiError, SignupRequest, void>({
//     mutationFn: signup,
//     onSuccess: async (data, req) => {
//       await loginMutation.mutateAsync({
//         username: req.username,
//         password: req.password,
//       });
//     },
//   });

//   return {
//     user: data,
//     error: error,
//     signup: async (req) => {
//       await signupMutation.mutateAsync(req);
//     },
//     login: async (req) => {
//       await loginMutation.mutateAsync(req);
//     },
//   };
// }
