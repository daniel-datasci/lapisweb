import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import { preloadRoute } from './routes.tsx';
import './index.css';

const container = document.getElementById('root')!;

const app = (
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);

if (container.firstElementChild) {
  // Prerendered page: load this route's code first so hydration matches the server HTML.
  preloadRoute(window.location.pathname).then(() => {
    hydrateRoot(container, app);
    window.clearTimeout(window.__lapisFallback);
  });
} else {
  createRoot(container).render(app);
  window.clearTimeout(window.__lapisFallback);
}
