import { useEffect, useRef, useState } from 'react';

export function useTypewriter(
  text: string,
  speed = 35,
  startDelay = 400,
): { displayed: string; done: boolean } {
  const [displayed, setDisplayed] = useState(() => (speed <= 0 ? text : ''));
  const [done, setDone] = useState(() => speed <= 0);
  const textRef = useRef(text);
  textRef.current = text;

  useEffect(() => {
    setDisplayed('');
    setDone(false);

    if (speed <= 0) {
      setDisplayed(textRef.current);
      setDone(true);
      return;
    }

    let i = 0;
    let interval: ReturnType<typeof setInterval>;
    let timeout: ReturnType<typeof setTimeout> | null = null;

    const start = () => {
      interval = setInterval(() => {
        i++;
        setDisplayed(textRef.current.slice(0, i));
        if (i >= textRef.current.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
    };

    if (startDelay <= 0) {
      start();
    } else {
      timeout = setTimeout(start, startDelay);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
      clearInterval(interval);
    };
  }, [text, speed, startDelay]);

  return { displayed, done };
}
