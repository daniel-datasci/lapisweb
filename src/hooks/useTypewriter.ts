import { useEffect, useState } from 'react';

/**
 * Number of characters of `text` revealed so far. It starts at 0 on the server and on the
 * first client render, so hydration matches, then counts up one character every `speed` ms.
 */
export function useTypewriter(text: string, speed = 35, startDelay = 400): { count: number; done: boolean } {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(0);
    let interval: ReturnType<typeof setInterval> | undefined;
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        setCount((n) => {
          const next = n + 1;
          if (next >= text.length) clearInterval(interval);
          return Math.min(next, text.length);
        });
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text, speed, startDelay]);

  return { count, done: count >= text.length };
}
