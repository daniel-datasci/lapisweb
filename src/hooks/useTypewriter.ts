import { useEffect, useRef, useState } from 'react';

export function useTypewriter(
  text: string,
  speed = 35,
  startDelay = 400,
): { displayed: string; done: boolean } {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const textRef = useRef(text);
  textRef.current = text;

  useEffect(() => {
    setDisplayed('');
    setDone(false);
    let i = 0;
    let interval: ReturnType<typeof setInterval>;
    let timeout: ReturnType<typeof setTimeout>;

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

    timeout = setTimeout(start, startDelay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text, speed, startDelay]);

  return { displayed, done };
}
