import { useEffect, useLayoutEffect, useRef, useState } from 'react';

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

type Props = {
  target: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
};

/**
 * Renders the final number on the server (so it's in the static HTML), then resets to 0 on the
 * client before the first paint and counts up when scrolled into view.
 */
export default function CountUp({ target, duration = 2000, prefix = '', suffix = '', className = '' }: Props) {
  const [value, setValue] = useState(target);
  const [armed, setArmed] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const startedRef = useRef(false);

  useIsomorphicLayoutEffect(() => {
    if (startedRef.current) return;
    setValue(0);
    setArmed(true);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || !armed) return;
    if (typeof IntersectionObserver === 'undefined') {
      setValue(target);
      return;
    }
    let raf = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true;
          const startTime = performance.now();
          const animate = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1);
            setValue(target * easeOutCubic(progress));
            if (progress < 1) {
              raf = requestAnimationFrame(animate);
            } else {
              setValue(target);
            }
          };
          raf = requestAnimationFrame(animate);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target, duration, armed]);

  const display = target % 1 !== 0 ? value.toFixed(0) : Math.round(value).toString();

  return (
    <span ref={ref} className={className} data-countup={armed ? 'armed' : 'pending'}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
