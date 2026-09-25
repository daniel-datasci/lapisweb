import { Navigate, matchRoutes, type RouteObject } from 'react-router-dom';
import { lazyPage } from '@/lib/lazyPage';

const Home = lazyPage(() => import('@/pages/Home'), 'src/pages/Home.tsx');
const Solutions = lazyPage(() => import('@/pages/solutions/Solutions'), 'src/pages/solutions/Solutions.tsx');
const GrowWithoutHiring = lazyPage(() => import('@/pages/solutions/GrowWithoutHiring'), 'src/pages/solutions/GrowWithoutHiring.tsx');
const NeverMissALead = lazyPage(() => import('@/pages/solutions/NeverMissALead'), 'src/pages/solutions/NeverMissALead.tsx');
const MakeYourAIPay = lazyPage(() => import('@/pages/solutions/MakeYourAIPay'), 'src/pages/solutions/MakeYourAIPay.tsx');
const Services = lazyPage(() => import('@/pages/services/Services'), 'src/pages/services/Services.tsx');
const ServiceDetail = lazyPage(() => import('@/pages/services/ServiceDetail'), 'src/pages/services/ServiceDetail.tsx');
const Industries = lazyPage(() => import('@/pages/industries/Industries'), 'src/pages/industries/Industries.tsx');
const IndustryPage = lazyPage(() => import('@/components/IndustryPage'), 'src/components/IndustryPage.tsx');
const HowItWorks = lazyPage(() => import('@/pages/HowItWorks'), 'src/pages/HowItWorks.tsx');
const Pricing = lazyPage(() => import('@/pages/Pricing'), 'src/pages/Pricing.tsx');
const CaseStudies = lazyPage(() => import('@/pages/CaseStudies'), 'src/pages/CaseStudies.tsx');
const CaseStudyDetail = lazyPage(() => import('@/pages/CaseStudyDetail'), 'src/pages/CaseStudyDetail.tsx');
const About = lazyPage(() => import('@/pages/About'), 'src/pages/About.tsx');
const Blog = lazyPage(() => import('@/pages/Blog'), 'src/pages/Blog.tsx');
const BlogPost = lazyPage(() => import('@/pages/BlogPost'), 'src/pages/BlogPost.tsx');
const Contact = lazyPage(() => import('@/pages/Contact'), 'src/pages/Contact.tsx');
const NotFound = lazyPage(() => import('@/pages/NotFound'), 'src/pages/NotFound.tsx');

const pages = [
  Home,
  Solutions,
  GrowWithoutHiring,
  NeverMissALead,
  MakeYourAIPay,
  Services,
  ServiceDetail,
  Industries,
  IndustryPage,
  HowItWorks,
  Pricing,
  CaseStudies,
  CaseStudyDetail,
  About,
  Blog,
  BlogPost,
  Contact,
  NotFound,
];

/** Old URLs, mirrored as 301s in vercel.json. */
const redirects: { from: string; to: string }[] = [
  { from: '/services/market-intelligence', to: '/solutions/grow-without-hiring#market-watch' },
  { from: '/services/ai-agents', to: '/services/agentic-workflows' },
  { from: '/blog/cost-of-finding-competitor-price-change-too-late', to: '/blog/real-cost-of-a-slow-reply' },
  { from: '/blog/what-is-ai-competitive-intelligence', to: '/blog/market-watch-what-competitors-changed-this-week' },
];

type AppRoute = RouteObject & { preload?: () => Promise<void>; source?: string };

const page = (path: string, Page: (typeof pages)[number], element: JSX.Element): AppRoute => ({
  path,
  element,
  preload: Page.preload,
  source: Page.source,
});

export const appRoutes: AppRoute[] = [
  page('/', Home, <Home />),
  page('/solutions', Solutions, <Solutions />),
  page('/solutions/grow-without-hiring', GrowWithoutHiring, <GrowWithoutHiring />),
  page('/solutions/never-miss-a-lead', NeverMissALead, <NeverMissALead />),
  page('/solutions/make-your-ai-pay', MakeYourAIPay, <MakeYourAIPay />),
  page('/services', Services, <Services />),
  page('/services/ai-consulting', ServiceDetail, <ServiceDetail slug="ai-consulting" />),
  page('/services/ai-automation', ServiceDetail, <ServiceDetail slug="ai-automation" />),
  page('/services/agentic-workflows', ServiceDetail, <ServiceDetail slug="agentic-workflows" />),
  page('/services/ai-infrastructure', ServiceDetail, <ServiceDetail slug="ai-infrastructure" />),
  page('/services/ai-analytics-training', ServiceDetail, <ServiceDetail slug="ai-analytics-training" />),
  page('/industries', Industries, <Industries />),
  page('/industries/:slug', IndustryPage, <IndustryPage />),
  page('/how-it-works', HowItWorks, <HowItWorks />),
  page('/pricing', Pricing, <Pricing />),
  page('/case-studies', CaseStudies, <CaseStudies />),
  page('/case-studies/:slug', CaseStudyDetail, <CaseStudyDetail />),
  page('/about', About, <About />),
  page('/blog', Blog, <Blog />),
  page('/blog/:slug', BlogPost, <BlogPost />),
  page('/contact', Contact, <Contact />),
  ...redirects.map((r) => ({ path: r.from, element: <Navigate to={r.to} replace /> })),
  page('*', NotFound, <NotFound />),
];

/** Loads the code for whichever page matches `pathname`, so it can render without a fallback. */
export const preloadRoute = (pathname: string) =>
  Promise.all((matchRoutes(appRoutes, pathname) ?? []).map((m) => (m.route as AppRoute).preload?.())).then(
    () => undefined,
  );

/** Source files of the page modules rendered for pathname (used by the prerenderer). */
export const routeSources = (pathname: string) =>
  (matchRoutes(appRoutes, pathname) ?? []).flatMap((m) => ((m.route as AppRoute).source ? [(m.route as AppRoute).source!] : []));

/** Loads every page (used by the prerenderer). */
export const preloadAll = () => Promise.all(pages.map((p) => p.preload())).then(() => undefined);
