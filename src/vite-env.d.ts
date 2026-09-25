/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_SITE_VERIFICATION?: string;
  readonly VITE_BING_SITE_VERIFICATION?: string;
}

interface Window {
  /** Set by the inline script in index.html: removes the `js` class if the app never hydrates. */
  __lapisFallback?: number;
}