import { lazy, Suspense } from 'react';
import { SpeedInsights } from "@vercel/speed-insights/react"
import { Analytics } from "@vercel/analytics/react"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import Home from '@/pages/Home';

const AIConsulting = lazy(() => import('@/pages/services/AIConsulting'));
const MarketIntelligence = lazy(() => import('@/pages/services/MarketIntelligence'));
const AIAgents = lazy(() => import('@/pages/services/AIAgents'));
const AIInfrastructure = lazy(() => import('@/pages/services/AIInfrastructure'));
const SaaS = lazy(() => import('@/pages/industries/SaaS'));
const RealEstate = lazy(() => import('@/pages/industries/RealEstate'));
const Hospitality = lazy(() => import('@/pages/industries/Hospitality'));
const HowItWorks = lazy(() => import('@/pages/HowItWorks'));
const Pricing = lazy(() => import('@/pages/Pricing'));
const CaseStudies = lazy(() => import('@/pages/CaseStudies'));
const CaseStudyDetail = lazy(() => import('@/pages/CaseStudyDetail'));
const About = lazy(() => import('@/pages/About'));
const Blog = lazy(() => import('@/pages/Blog'));
const BlogPost = lazy(() => import('@/pages/BlogPost'));
const Contact = lazy(() => import('@/pages/Contact'));

function PageLoader() {
  return (
    <div style={{ minHeight: 'calc(100vh - 160px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
            <Route path="/services/ai-consulting" element={<AIConsulting />} />
            <Route path="/services/market-intelligence" element={<MarketIntelligence />} />
            <Route path="/services/ai-agents" element={<AIAgents />} />
            <Route path="/services/ai-infrastructure" element={<AIInfrastructure />} />
            <Route path="/industries/saas" element={<SaaS />} />
            <Route path="/industries/real-estate" element={<RealEstate />} />
            <Route path="/industries/hospitality" element={<Hospitality />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/contact" element={<Contact />} />
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
