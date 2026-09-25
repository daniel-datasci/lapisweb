import { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import { appRoutes } from '@/routes';

function PageLoader() {
  return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 15, color: 'var(--ink-faint)', letterSpacing: '1px' }}>
        Loading&hellip;
      </span>
    </div>
  );
}

/** Router-agnostic shell: BrowserRouter wraps it in the browser, StaticRouter at build time. */
function App() {
  const routes = useRoutes(appRoutes);
  return (
    <>
      <ScrollToTop />
      <Header />
      <main id="main">
        <Suspense fallback={<PageLoader />}>{routes}</Suspense>
      </main>
      <Footer />
      <SpeedInsights />
      <Analytics />
    </>
  );
}

export default App;
