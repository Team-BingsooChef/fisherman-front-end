import { useState, useEffect, useCallback } from "react";

export const useVerificationTimer = (initialTime = 300) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [timeExpired, setTimeExpired] = useState(false);
  const [code, setCode] = useState<string[]>(Array(6).fill(""));

  const startTimer = useCallback(() => {
    setTimeLeft(initialTime);
    setTimeExpired(false);
  }, [initialTime]);

  useEffect(() => {
    if (timeLeft <= 0) {
      setTimeExpired(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleCodeChange = useCallback((index: number, value: string) => {
    setCode((prev) => {
      const newCode = [...prev];
      newCode[index] = value.slice(0, 1);
      return newCode;
    });
  }, []);

  return {
    timeLeft,
    timeExpired,
    code,
    startTimer,
    handleCodeChange,
    setCode,
  };
};
