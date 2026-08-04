import { useEffect, useRef, useState } from 'react';

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export function useCountUp(target: number, duration = 2000, startDelay = 0): number {
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    let raf = 0;
    let timeout: ReturnType<typeof setTimeout>;

    const run = () => {
      const startTime = performance.now();
      const animate = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        setValue(target * easeOutCubic(progress));
        if (progress < 1) {
          raf = requestAnimationFrame(animate);
        } else {
          setValue(target);
        }
      };
      raf = requestAnimationFrame(animate);
    };

    if (startDelay > 0) {
      timeout = setTimeout(() => {
        if (!startedRef.current) {
          startedRef.current = true;
          run();
        }
      }, startDelay);
    } else {
      run();
    }

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timeout);
    };
  }, [target, duration, startDelay]);

  return value;
}
