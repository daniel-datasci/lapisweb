/**
 * The single list of indexable routes. It drives prerendering, the sitemap, llms.txt,
 * share images and `npm run verify:seo`, and every page reads its title and description
 * from here, so metadata is defined once.
 */
import { solutions, type PillarId } from '@/data/solutions';
import { services } from '@/data/services';
import { industries } from '@/data/industries';
import { caseStudies } from '@/data/testimonials';
import { blogPosts } from '@/data/blog';
import { aiRescue, aiWorkforce, leadDesk, ngn, usd } from '@/data/pricing';
import { DEFAULT_OG_TITLE, SLOGAN } from '@/data/site';

export type ShareImage = { eyebrow: string; headline: string };

export type PageMeta = {
  path: string;
  title: string;
  description: string;
  /** Short name used in breadcrumbs and llms.txt. */
  label: string;
  /** Text for the committed share image; pages without one use the default image. */
  og?: ShareImage;
};

export type SiteRoute = PageMeta & {
  group: 'core' | 'solution' | 'service' | 'industry' | 'case-study' | 'blog';
  /** Repo-relative files whose last commit date is used as the sitemap <lastmod>. */
  sources: string[];
  /** Explicit <lastmod> (blog posts). */
  lastmod?: string;
};

/** Built from the price book, so the snippet always matches the Pricing page. */
const pricingDescription = `Lead Desk from ${usd(leadDesk.startingPrice.usd)}/month (${ngn(leadDesk.startingPrice.ngn)}), AI Workforce from ${usd(aiWorkforce.startingPrice.usd)} per AI worker and the 45-Day AI Rescue from ${usd(aiRescue.startingPrice.usd)}. Monitoring, fixes and reports included.`;

export const PAGES = {
  home: {
    path: '/',
    title: 'AI Automation & AI Workers on Subscription | The Lapis AI',
    description:
      'Hire AI workers, not more staff. We build, run and report on AI automation and AI agents for growing businesses, from $390/month. Book a free discovery call.',
    label: 'Home',
    og: { eyebrow: SLOGAN, headline: DEFAULT_OG_TITLE },
  },
  solutions: {
    path: '/solutions',
    title: 'AI Solutions for Capacity, Leads and ROI | The Lapis AI',
    description:
      'Grow without hiring, never miss a lead and make your AI pay: Lead Desk, AI Workforce and the 45-Day AI Rescue, built and run for you by one team every month.',
    label: 'Solutions',
  },
  services: {
    path: '/services',
    title: 'AI Consulting, Automation & Agent Services | The Lapis AI',
    description:
      'AI consulting, automation, agentic workflows, infrastructure and training, delivered as AI workers on a monthly subscription. Book a free discovery call.',
    label: 'Services',
  },
  industries: {
    path: '/industries',
    title: 'AI Automation & AI Agents by Industry | The Lapis AI',
    description:
      'AI automation and agents for professional services, clinics, real estate, hospitality, e-commerce, logistics, education and SaaS, in Nigeria and worldwide.',
    label: 'Industries',
    og: { eyebrow: 'Industries', headline: 'Different industries. The same three walls.' },
  },
  howItWorks: {
    path: '/how-it-works',
    title: 'How It Works: From Discovery Call to Go-Live | The Lapis AI',
    description:
      'Six steps from a free 30-minute discovery call to AI workers on the job: a paid audit, a proposal, onboarding, go-live in 2–4 weeks and a monthly impact report.',
    label: 'How It Works',
  },
  pricing: {
    path: '/pricing',
    title: 'AI Automation Pricing: Plans From $390/Month | The Lapis AI',
    description: pricingDescription,
    label: 'Pricing',
  },
  caseStudies: {
    path: '/case-studies',
    title: 'AI Automation Case Studies & Results | The Lapis AI',
    description:
      'AI automation case studies from real estate, hospitality and SaaS: real systems and measured results, from hours returned to revenue recovered. Read them.',
    label: 'Case Studies',
  },
  about: {
    path: '/about',
    title: 'About Us: The Lagos AI Team That Stays | The Lapis AI',
    description:
      'Founded in 2022 and based in Lagos, The Lapis AI builds and runs AI systems for growing businesses across Africa, the UK, US, Canada and Europe.',
    label: 'About',
  },
  blog: {
    path: '/blog',
    title: 'Blog | Practical AI for Growing Businesses | The Lapis AI',
    description:
      'Practical AI for growing businesses: guides on AI automation, AI agents, lead response and making AI pay, from the team that builds and runs them. Read on.',
    label: 'Blog',
  },
  contact: {
    path: '/contact',
    title: 'Contact Us: Book a Free Discovery Call | The Lapis AI',
    description:
      'Book a free 30-minute discovery call with The Lapis AI. No obligation and a reply within one business day. Call, WhatsApp or email our team in Lagos, Nigeria.',
    label: 'Contact',
  },
  notFound: {
    path: '/404',
    title: 'Page Not Found | The Lapis AI',
    description:
      "The page you're looking for doesn't exist or has moved. Explore our AI solutions, pricing and industries, or book a free discovery call with our team.",
    label: 'Page not found',
  },
} satisfies Record<string, PageMeta>;

type SolutionMeta = { title: string; description: string; headline: string; source: string };

const SOLUTION_META: Record<PillarId, SolutionMeta> = {
  capacity: {
    title: 'Grow Without Hiring | AI Automation & Agents | The Lapis AI',
    description:
      'Take on more work without more people. Lapis AI Workforce runs managed AI workers for your admin, operations and reporting, from $1,250 per AI worker a month.',
    headline: 'Take on more work without taking on more people.',
    source: 'src/pages/solutions/GrowWithoutHiring.tsx',
  },
  leads: {
    title: 'AI Lead Response on WhatsApp, Phone & Web | The Lapis AI',
    description:
      'Lapis Lead Desk answers every enquiry on WhatsApp, phone and web chat in under 60 seconds, qualifies it and books it, day and night. From $390 a month.',
    headline: 'Every enquiry answered in under 60 seconds. On every channel.',
    source: 'src/pages/solutions/NeverMissALead.tsx',
  },
  'ai-spend': {
    title: 'AI Pilot to Production in 45 Days, With ROI | The Lapis AI',
    description:
      'Stalled AI pilots, unused licences, no ROI? The 45-Day AI Rescue takes your AI into production in 45 days, or we keep working for free until it is live.',
    headline: "You've tried AI. Now make it pay.",
    source: 'src/pages/solutions/MakeYourAIPay.tsx',
  },
};

export const solutionMeta = (id: PillarId): PageMeta => {
  const s = solutions.find((x) => x.id === id)!;
  const m = SOLUTION_META[id];
  return {
    path: s.path,
    title: m.title,
    description: m.description,
    label: s.name,
    og: { eyebrow: `Solution ${s.num} · ${s.theme}`, headline: m.headline },
  };
};

const postTitle = (p: (typeof blogPosts)[number]) => p.seoTitle ?? `${p.title} | The Lapis AI`;
const postDescription = (p: (typeof blogPosts)[number]) => p.seoDescription ?? p.excerpt;

export const blogPostMeta = (p: (typeof blogPosts)[number]): PageMeta => ({
  path: `/blog/${p.slug}`,
  title: postTitle(p),
  description: postDescription(p),
  label: p.title,
  og: { eyebrow: `Blog · ${solutions.find((s) => s.id === p.category)!.name}`, headline: p.title },
});

export const caseStudyMeta = (c: (typeof caseStudies)[number]): PageMeta => ({
  path: `/case-studies/${c.slug}`,
  title: c.seoTitle,
  description: c.seoDescription,
  label: `${c.industry}: ${c.client}`,
  og: { eyebrow: `Case study · ${c.industry}`, headline: c.title },
});

export const serviceMeta = (s: (typeof services)[number]): PageMeta => ({
  path: s.path,
  title: s.seoTitle,
  description: s.seoDescription,
  label: s.name,
  og: { eyebrow: `Service ${s.num} · ${s.name}`, headline: s.headline },
});

export const industryMeta = (i: (typeof industries)[number]): PageMeta => ({
  path: i.path,
  title: i.seoTitle,
  description: i.metaDescription,
  label: i.name,
});

/** Breadcrumb trail from Home through the given pages (the last one is the current page). */
export const crumbsFor = (...pages: Pick<PageMeta, 'label' | 'path'>[]) => [
  { name: PAGES.home.label, path: PAGES.home.path },
  ...pages.map((p) => ({ name: p.label, path: p.path })),
];

const core = (meta: PageMeta, sources: string[]): SiteRoute => ({ ...meta, group: 'core', sources });

export const siteRoutes: SiteRoute[] = [
  core(PAGES.home, ['src/pages/Home.tsx', 'src/pages/Home.css']),
  core(PAGES.solutions, ['src/pages/solutions/Solutions.tsx', 'src/data/solutions.ts']),
  ...solutions.map((s) => ({
    ...solutionMeta(s.id),
    group: 'solution' as const,
    sources: [SOLUTION_META[s.id].source, 'src/data/faqs.ts'],
  })),
  core(PAGES.services, ['src/pages/services/Services.tsx', 'src/data/services.ts']),
  ...services.map((s) => ({
    ...serviceMeta(s),
    group: 'service' as const,
    sources: ['src/pages/services/ServiceDetail.tsx', 'src/data/services.ts', 'src/data/faqs.ts'],
  })),
  core(PAGES.industries, ['src/pages/industries/Industries.tsx', 'src/data/industries.ts']),
  ...industries.map((i) => ({
    ...industryMeta(i),
    group: 'industry' as const,
    sources: ['src/components/IndustryPage.tsx', 'src/data/industries.ts'],
  })),
  core(PAGES.howItWorks, ['src/pages/HowItWorks.tsx', 'src/data/process.ts', 'src/data/faqs.ts']),
  core(PAGES.pricing, ['src/pages/Pricing.tsx', 'src/data/pricing.ts']),
  core(PAGES.caseStudies, ['src/pages/CaseStudies.tsx', 'src/data/testimonials.ts']),
  ...caseStudies.map((c) => ({
    ...caseStudyMeta(c),
    group: 'case-study' as const,
    sources: ['src/pages/CaseStudyDetail.tsx', 'src/data/testimonials.ts'],
  })),
  core(PAGES.about, ['src/pages/About.tsx']),
  core(PAGES.blog, ['src/pages/Blog.tsx', 'src/data/blog.ts']),
  ...blogPosts.map((p) => ({
    ...blogPostMeta(p),
    group: 'blog' as const,
    sources: ['src/data/blog.ts'],
    lastmod: p.updated ?? p.date,
  })),
  core(PAGES.contact, ['src/pages/Contact.tsx']),
];

/** Everything prerendered: the indexable routes plus the 404 page. */
export const NOT_FOUND_PATH = PAGES.notFound.path;
