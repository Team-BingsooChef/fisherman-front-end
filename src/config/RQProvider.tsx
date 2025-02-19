import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type Props = {
  children: React.ReactNode;
};

function RQProvider({ children }: Props) {
  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 0, // 0 minutes 동안 fresh data를 유지(fresh -> stale) fresh일때는 cache를 사용한다.
          gcTime: 1000 * 60 * 5, // 5 minutes 동안 garbage collection을 하지 않음. gc이후에는 cache를 제거하고 다시 fetch한다.
          refetchOnWindowFocus: false,
          retry: false,
        },
      },
    })
  );

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

export default RQProvider;
