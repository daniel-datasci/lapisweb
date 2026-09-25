/* eslint-disable react-refresh/only-export-components -- server entry, never hot-reloaded */
import { StrictMode } from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { HelmetProvider, type HelmetServerState } from 'react-helmet-async';
import App from './App';
import { preloadAll } from './routes';

export { routeSources } from './routes';

export { siteRoutes, PAGES, NOT_FOUND_PATH } from './seo/routes';
export { ogImageSlug, ogImagePath } from './seo/og';
export { buildLlmsTxt, buildLlmsFullTxt } from './seo/llms';
export { SITE_URL, absoluteUrl } from './data/site';

const headTags = (helmet?: HelmetServerState | null) =>
  helmet
    ? [helmet.title, helmet.meta, helmet.link, helmet.script]
        .map((part) => part.toString())
        .filter(Boolean)
        .join('\n    ')
    : '';

/**
 * Renders one route into `sink` (a Node Writable supplied by scripts/prerender.mjs) once every
 * lazy page and Suspense boundary has resolved. Resolves with the page's head tags.
 */
export async function render(url: string, sink: NodeJS.WritableStream): Promise<string> {
  await preloadAll();
  const helmetContext: { helmet?: HelmetServerState | null } = {};

  return new Promise<string>((resolve, reject) => {
    const stream = renderToPipeableStream(
      <StrictMode>
        <HelmetProvider context={helmetContext}>
          <StaticRouter location={url}>
            <App />
          </StaticRouter>
        </HelmetProvider>
      </StrictMode>,
      {
        onAllReady() {
          stream.pipe(sink);
          resolve(headTags(helmetContext.helmet));
        },
        onShellError: reject,
        onError: reject,
      },
    );
  });
}
