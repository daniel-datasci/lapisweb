import Seo from '@/components/Seo';
import PageHero from '@/components/PageHero';
import RelatedLinks, { type RelatedLink } from '@/components/RelatedLinks';
import { PAGES } from '@/seo/routes';

const destinations: RelatedLink[] = [
  {
    kicker: 'Solutions',
    title: 'Three problems, one team',
    body: 'Grow without hiring, never miss a lead and make your AI investment pay.',
    to: PAGES.solutions.path,
    linkLabel: 'See our solutions',
  },
  {
    kicker: 'Services',
    title: 'Five capabilities',
    body: 'AI consulting, AI automation, agentic workflows, AI infrastructure and AI and analytics training.',
    to: PAGES.services.path,
    linkLabel: 'See our services',
  },
  {
    kicker: 'Industries',
    title: 'Built for your sector',
    body: 'What we deploy for professional services, clinics, real estate, hospitality, e-commerce, logistics, education and SaaS.',
    to: PAGES.industries.path,
    linkLabel: 'Find your industry',
  },
  {
    kicker: 'Case studies',
    title: 'Real systems, measured results',
    body: 'Hours returned, revenue recovered and AI that pays.',
    to: PAGES.caseStudies.path,
    linkLabel: 'Read the case studies',
  },
  {
    kicker: 'Blog',
    title: 'Practical AI thinking',
    body: 'Guides on getting hours back, never missing a lead and making AI pay.',
    to: PAGES.blog.path,
    linkLabel: 'Read the blog',
  },
  {
    kicker: 'How it works',
    title: 'Audit, build, run, report',
    body: 'Something live within the first month, and a team that keeps it running.',
    to: PAGES.howItWorks.path,
    linkLabel: 'See how it works',
  },
];

/** Rendered for unknown URLs, and prerendered to 404.html so the server answers with HTTP 404. */
export default function NotFound() {
  return (
    <>
      <Seo {...PAGES.notFound} noindex />

      <PageHero
        eyebrow="404 · Page not found"
        text="This page doesn't exist, or it has moved."
        splitIndex={0}
        staticHeading
        subtext="The link may be out of date, or the address may have a typo. Pick up from one of the sections below, or book a free AI audit with our team."
        ctaLabel="Book My Free AI Audit"
        ctaTo={PAGES.contact.path}
        secondaryLabel="Go to the Homepage"
        secondaryTo={PAGES.home.path}
      />

      <RelatedLinks eyebrow="Where to next" title="Popular pages" items={destinations} variant="paper" />
    </>
  );
}
