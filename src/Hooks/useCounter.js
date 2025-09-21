import { useEffect, useRef, useState } from "react";

export function useCounter(initialSeconds = 60) {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const timerRef = useRef(null);

  useEffect(() => {
    if (timeLeft <= 0) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current)
  }, []); // وابستگی خالی فقط یکبار اجرا می‌شود

  const reset = (time) => {
    clearInterval(timerRef.current);
    setTimeLeft(time);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `( ${minutes < 10 ? "0" + minutes : minutes}:${
    seconds < 10 ? "0" + seconds : seconds
  } )`;

  return {
    timeLeft,
    formattedTime,
    reset,
    isFinished: timeLeft <= 0,
  };
}
