// import { UserModel } from "@/user/api/user-response.ts";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/global/const/const.ts";
// import { getMyInfo } from "@/user/api/user-api.ts";
// import { ApiError } from "@/global/api/response.ts";
// import { LoginResponse } from "@/user/api/auth-response.ts";
// import { emailLogin, EmailLoginRequest, signup } from "@/user/api/auth-api.ts";
// import { SignupRequest } from "@/user/api/auth-request.ts";

// interface UserState {
//   user?: UserModel;
//   error: ApiError | null;
//   signup: (req: SignupRequest) => Promise<void>;
//   login: (req: EmailLoginRequest) => Promise<void>;
// }

// export function useUser(): UserState {
//   const { data, error } = useQuery<UserModel, ApiError, UserModel>({
//     queryKey: ["userInfo"],
//     enabled: localStorage.getItem(ACCESS_TOKEN) != null, // 토큰이 없으면 쿼리를 실행x
//     queryFn: getMyInfo,
//     staleTime: 1000 * 60 * 60, // 1시간동안 캐시 유지
//     gcTime: 1000 * 60 * 30, // 30분 후에 캐시 삭제
//   });

//   const queryClient = useQueryClient();

//   const loginMutation = useMutation<
//     LoginResponse,
//     ApiError,
//     EmailLoginRequest,
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
