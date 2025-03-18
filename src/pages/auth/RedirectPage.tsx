import { useEmailLogin } from "../../hook/auth/useEmailLogin";
import { AxiosResponse } from "axios";

export default function RedirectPage() {
  const onSuccess = (data: AxiosResponse) => {
    console.log("로그인 성공:", data);

    if (data.status === 302 && data.headers.location) {
      window.location.href = data.headers.location;
    }
  };

  const { error, isError, isPending } = useEmailLogin(onSuccess);

  return (
    <div>
      {isPending && <p>로그인 중입니다...</p>}
      {isError && <p>로그인 실패: {error?.message}</p>}
    </div>
  );
}
