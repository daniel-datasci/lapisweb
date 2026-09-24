import { lazy, Suspense } from 'react';
import { SpeedInsights } from "@vercel/speed-insights/react"
import { Analytics } from "@vercel/analytics/react"
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';

const Home = lazy(() => import('@/pages/Home'));
const Solutions = lazy(() => import('@/pages/solutions/Solutions'));
const GrowWithoutHiring = lazy(() => import('@/pages/solutions/GrowWithoutHiring'));
const NeverMissALead = lazy(() => import('@/pages/solutions/NeverMissALead'));
const MakeYourAIPay = lazy(() => import('@/pages/solutions/MakeYourAIPay'));
const Services = lazy(() => import('@/pages/services/Services'));
const ServiceDetail = lazy(() => import('@/pages/services/ServiceDetail'));
const Industries = lazy(() => import('@/pages/industries/Industries'));
const IndustryPage = lazy(() => import('@/components/IndustryPage'));
const HowItWorks = lazy(() => import('@/pages/HowItWorks'));
const Pricing = lazy(() => import('@/pages/Pricing'));
const CaseStudies = lazy(() => import('@/pages/CaseStudies'));
const CaseStudyDetail = lazy(() => import('@/pages/CaseStudyDetail'));
const About = lazy(() => import('@/pages/About'));
const Blog = lazy(() => import('@/pages/Blog'));
const BlogPost = lazy(() => import('@/pages/BlogPost'));
const Contact = lazy(() => import('@/pages/Contact'));

/** Old URLs, mirrored as 301s in vercel.json. */
const redirects: { from: string; to: string }[] = [
  { from: '/services/market-intelligence', to: '/solutions/grow-without-hiring#market-watch' },
  { from: '/services/ai-agents', to: '/services/agentic-workflows' },
  { from: '/blog/cost-of-finding-competitor-price-change-too-late', to: '/blog/real-cost-of-a-slow-reply' },
  { from: '/blog/what-is-ai-competitive-intelligence', to: '/blog/market-watch-what-competitors-changed-this-week' },
];

function PageLoader() {
  return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 15, color: 'var(--ink-faint)', letterSpacing: '1px' }}>
        Loading&hellip;
      </span>
    </div>
  );
}

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Header />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/solutions/grow-without-hiring" element={<GrowWithoutHiring />} />
            <Route path="/solutions/never-miss-a-lead" element={<NeverMissALead />} />
            <Route path="/solutions/make-your-ai-pay" element={<MakeYourAIPay />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/ai-consulting" element={<ServiceDetail slug="ai-consulting" />} />
            <Route path="/services/ai-automation" element={<ServiceDetail slug="ai-automation" />} />
            <Route path="/services/agentic-workflows" element={<ServiceDetail slug="agentic-workflows" />} />
            <Route path="/services/ai-infrastructure" element={<ServiceDetail slug="ai-infrastructure" />} />
            <Route path="/services/ai-analytics-training" element={<ServiceDetail slug="ai-analytics-training" />} />
            <Route path="/industries" element={<Industries />} />
            <Route path="/industries/:slug" element={<IndustryPage />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/contact" element={<Contact />} />
            {redirects.map((r) => (
              <Route key={r.from} path={r.from} element={<Navigate to={r.to} replace />} />
            ))}
          </Routes>
        </Suspense>
        <Footer />
        <SpeedInsights />
        <Analytics />
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
