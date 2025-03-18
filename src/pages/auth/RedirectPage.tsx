import { useEmailLogin } from "../../hook/auth/useEmailLogin";

export default function RedirectPage() {
  const { error, isError, isPending } = useEmailLogin();

  return (
    <div>
      <h1>RedirectPage</h1>
      {isPending && <p>로그인 중입니다...</p>}
      {isError && <p>로그인 실패: {error?.message}</p>}
    </div>
  );
}
