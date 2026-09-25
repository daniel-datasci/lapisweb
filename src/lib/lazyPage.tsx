import { lazy, useState, type ComponentType } from 'react';

type Loader<P> = () => Promise<{ default: ComponentType<P> }>;

export type LazyPage<P extends object> = ComponentType<P> & {
  preload: () => Promise<void>;
  /** Repo-relative source file, used by the prerenderer to find the page's CSS and JS chunks. */
  source: string;
};

/**
 * A code-split page that can be loaded ahead of rendering. Once `preload()` has resolved,
 * the page renders synchronously (no Suspense fallback), which is what the server render
 * and the first client render (hydration) both rely on.
 */
export function lazyPage<P extends object>(loader: Loader<P>, source: string): LazyPage<P> {
  let Loaded: ComponentType<P> | null = null;
  let pending: Promise<void> | null = null;

  const preload = () => {
    pending ??= loader().then((mod) => {
      Loaded = mod.default;
    });
    return pending;
  };

  const Deferred = lazy(() => preload().then(() => ({ default: Loaded as ComponentType<P> }))) as unknown as ComponentType<P>;

  function Page(props: P) {
    // Fixed per mount, so a page that first rendered through Suspense never remounts.
    const [Component] = useState(() => Loaded ?? Deferred);
    return <Component {...props} />;
  }

  Page.preload = preload;
  Page.source = source;
  return Page;
}
