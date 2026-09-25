import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const FIND_TIMEOUT_MS = 3000;
const SETTLE_MS = 2500;

/**
 * Scrolls to the top on route changes, or to the element named by the URL hash.
 * When arriving from another route, lazy pages and the typewriter hero change the
 * layout after the first paint, so the target is looked up for a short while and
 * re-aligned until the page settles (or the user starts scrolling themselves).
 */
export default function ScrollToTop() {
  const { pathname, hash, key } = useLocation();
  const previousPath = useRef<string | null>(null);

  useEffect(() => {
    const firstRun = previousPath.current === null;
    const samePage = previousPath.current === pathname;
    previousPath.current = pathname;

    if (!hash) {
      // On the first load the browser owns the scroll position (reload, back/forward restore).
      if (!samePage && !firstRun) window.scrollTo(0, 0);
      return;
    }

    let id = hash.slice(1);
    try {
      id = decodeURIComponent(id);
    } catch {
      /* keep the raw id */
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const align = (smooth: boolean) => {
      const el = document.getElementById(id);
      if (!el) return false;
      el.scrollIntoView({ behavior: smooth && !reduceMotion ? 'smooth' : 'auto', block: 'start' });
      return true;
    };

    if (samePage && align(true)) return;

    let frame = 0;
    let settleTimer = 0;
    let observer: ResizeObserver | null = null;
    let cancelled = false;
    const started = performance.now();

    const stop = () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      window.clearTimeout(settleTimer);
      observer?.disconnect();
      window.removeEventListener('wheel', stop);
      window.removeEventListener('touchstart', stop);
      window.removeEventListener('keydown', stop);
    };

    window.addEventListener('wheel', stop, { passive: true });
    window.addEventListener('touchstart', stop, { passive: true });
    window.addEventListener('keydown', stop);

    const find = () => {
      if (cancelled) return;
      if (align(false)) {
        observer = new ResizeObserver(() => {
          if (!cancelled) align(false);
        });
        observer.observe(document.body);
        settleTimer = window.setTimeout(stop, SETTLE_MS);
        return;
      }
      if (performance.now() - started < FIND_TIMEOUT_MS) {
        frame = requestAnimationFrame(find);
      } else {
        stop();
      }
    };

    window.scrollTo(0, 0);
    frame = requestAnimationFrame(find);
    return stop;
  }, [pathname, hash, key]);

  return null;
}
