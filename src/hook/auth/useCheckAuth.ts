import { useEffect, useState } from "react";

export function useCheckAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const accessToken = getCookie("access_token");
    setIsLoggedIn(!!accessToken);
  }, []);

  return { isLoggedIn };
}

function getCookie(key: string): string | undefined {
  const cookieString = document.cookie;
  const keyValuePairs = cookieString.split("; ");

  for (const pair of keyValuePairs) {
    const [cookieKey, cookieValue] = pair.split("=");
    if (cookieKey === key) {
      return cookieValue;
    }
  }

  return undefined;
}
