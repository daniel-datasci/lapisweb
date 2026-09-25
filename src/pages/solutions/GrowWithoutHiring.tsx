import {
  ClipboardList,
  MessagesSquare,
  BarChart3,
  Share2,
  Receipt,
  UserPlus,
  FileText,
  ShieldCheck,
  Radar,
} from 'lucide-react';
import Seo from '@/components/Seo';
import PageHero from '@/components/PageHero';
import SectionHeading from '@/components/SectionHeading';
import PainList from '@/components/PainList';
import StatGrid from '@/components/StatGrid';
import InfoCards, { InfoCard } from '@/components/InfoCards';
import ProcessSteps from '@/components/ProcessSteps';
import DiffCards from '@/components/DiffCards';
import QuoteGrid from '@/components/QuoteGrid';
import CTASection from '@/components/CTASection';
import Reveal from '@/components/Reveal';
import FaqSection from '@/components/FaqList';
import RelatedLinks from '@/components/RelatedLinks';
import { auditLink } from '@/data/site';
import { solutionFaqs } from '@/data/faqs';
import { solutionRelated } from '@/data/related';
import { PAGES, crumbsFor, solutionMeta } from '@/seo/routes';
import { serviceId, serviceNode, tierOffer } from '@/seo/schema';

const META = solutionMeta('capacity');
const PATH = META.path;
const CRUMBS = crumbsFor(PAGES.solutions, META);
const FAQS = solutionFaqs.capacity;
const GROWTH_OFFER = tierOffer('Growth System');
const pains = [
  'Every decision, approval and customer issue ends up on your desk.',
  'Your team answers the same questions all day, every day.',
  'Processes that worked at 5 people fall apart at 20.',
  'Reports take days to pull together and are out of date by the time anyone reads them.',
  'Growth means hiring, and hiring is slow, expensive and risky.',
  "You haven't taken a real holiday in years, because if you stop, everything stops.",
];

const stats = [
  { value: '80%', label: 'of workers and leaders lack the time or energy to do their work', source: 'Microsoft WTI 2025' },
  { value: '53%', label: 'of leaders say productivity must increase', source: 'Microsoft WTI 2025' },
  {
    value: '82%',
    label: 'of leaders plan to use AI agents to expand capacity within 18 months',
    source: 'Microsoft WTI 2025',
  },
  {
    value: '70.9%',
    label: "of EU firms that considered AI but didn't adopt it cite a lack of expertise",
    source: 'Eurostat',
  },
];

const workflows: InfoCard[] = [
  {
    icon: <ClipboardList size={26} />,
    title: 'Admin & data entry',
    body: 'Agents pull data from emails, forms, invoices and contracts, check it and enter it into your systems. No more copy-paste.',
  },
  {
    icon: <MessagesSquare size={26} />,
    title: 'Customer & staff questions',
    body: 'Assistants on WhatsApp, email and your website answer repeat questions accurately from your own policies, and pass anything unusual to a person.',
  },
  {
    icon: <BarChart3 size={26} />,
    title: 'Reporting & KPIs',
    body: 'Live dashboards and automatic weekly briefs that pull from every system you use, so nobody spends Friday building spreadsheets.',
  },
  {
    icon: <Share2 size={26} />,
    title: 'Approvals & handoffs',
    body: 'Requests are routed to the right person with the right context, and work stops sitting in inboxes waiting for you.',
  },
  {
    icon: <Receipt size={26} />,
    title: 'Invoicing & payment chasing',
    body: 'Invoices go out on time and polite, persistent reminders follow up automatically, so cash comes in without you chasing it.',
  },
  {
    icon: <UserPlus size={26} />,
    title: 'Onboarding',
    body: 'New clients and new hires get the right documents, accounts and next steps automatically, the same way every time.',
  },
  {
    icon: <FileText size={26} />,
    title: 'Document processing',
    body: 'Contracts, KYC files, claims and reports are read, summarised and filed, with anything that needs a human flagged.',
  },
  {
    icon: <ShieldCheck size={26} />,
    title: 'Compliance checks',
    body: 'Operations are checked continuously against your rules and regulations, and issues are flagged before they become problems.',
  },
  {
    id: 'market-watch',
    icon: <Radar size={26} />,
    title: 'Market watch',
    body: "Agents track competitors' prices, launches and hiring, plus market shifts, and send you a short brief, so you always know what changed.",
  },
];

const steps = [
  { phase: 'Step 1', title: 'Map', body: "We find where your team's hours actually go, and which tasks only you can do." },
  {
    phase: 'Step 2',
    title: 'Build',
    body: 'We build the automations and agents on top of your existing tools, with proper data pipelines underneath.',
  },
  { phase: 'Step 3', title: 'Run', body: 'We monitor every workflow 24/7 and fix issues before your team notices.' },
  { phase: 'Step 4', title: 'Prove', body: 'Each month, you get a report of hours returned, tasks completed and errors caught.' },
];

export default function GrowWithoutHiring() {
  return (
    <>
      <Seo
        {...META}
        crumbs={CRUMBS}
        faqs={FAQS}
        mainEntityId={serviceId(PATH)}
        schema={[
          serviceNode({
            path: PATH,
            name: META.label,
            description: META.description,
            serviceType: 'AI automation and AI agents for business operations',
            audience: 'Growing businesses',
            offers: GROWTH_OFFER ? [GROWTH_OFFER] : undefined,
          }),
        ]}
      />

      <PageHero
        crumbs={CRUMBS}
        eyebrow="Solution ① · Capacity"
        text="Take on more work without taking on more people."
        splitIndex={0}
        subtext="When everything runs through you, the business can only grow as fast as you can work. We automate the repetitive work, handoffs and approvals that clog your team's week, then run those systems for you. You get more capacity, with no new salaries and no one to babysit."
        ctaLabel="Find My Lost Hours: Free Audit"
        ctaTo={auditLink('capacity')}
        secondaryLabel="See What We Automate"
        secondaryTo={`${PATH}#what-we-automate`}
      />

      <section className="section section-paper">
        <div className="container">
          <SectionHeading eyebrow="The problem" title="Sound familiar?" />
          <div className="section-body">
            <PainList items={pains} />
          </div>
          <div className="section-body">
            <StatGrid stats={stats} />
          </div>
        </div>
      </section>

      <section className="section section-dark" id="what-we-automate">
        <div className="container">
          <SectionHeading
            eyebrow="What we automate"
            title="Your AI workforce, built around how you actually work."
            intro="Every business is different, but these are the workflows that most often give growing teams their hours back."
          />
          <div className="section-body">
            <InfoCards items={workflows} columns={3} />
          </div>
        </div>
      </section>

      <section className="section section-paper">
        <div className="container">
          <SectionHeading eyebrow="How it works" title="Map it. Build it. Run it. Prove it." />
          <div className="section-body">
            <ProcessSteps steps={steps} columns={4} />
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container">
          <SectionHeading eyebrow="Why Lapis" title="Most automations get built and then abandoned." accent="Ours are run." />
          <div className="section-body">
            <DiffCards
              withoutTitle="What usually happens"
              withoutItems={[
                'A freelancer builds a workflow in Zapier or n8n, then moves on',
                'It breaks the first time someone types "Sept." instead of "September"',
                "Only one person understands it, and they've left",
                'Nobody can say whether it actually saves time',
              ]}
              withTitle="What happens with Lapis"
              withItems={[
                'A senior team designs the workflow around how your business works',
                "It's tested on your real, messy data before it goes live",
                'We monitor, maintain and document everything under a service agreement',
                'Hours returned are reported to you every month',
              ]}
            />
          </div>
          <Reveal>
            <p className="diff-note">
              <strong>This is about capacity, not cutting jobs.</strong> Our clients use their hours back to serve more
              customers, grow into new markets and stop burning out their best people.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section section-paper">
        <div className="container">
          <QuoteGrid
            large
            items={[
              {
                quote:
                  "My agents used to spend their mornings pulling comps. Now they wake up to alerts telling them exactly what changed overnight. They're in front of clients instead of spreadsheets.",
                cite: 'Managing Broker, Regional Real Estate Brokerage',
                detail: '8+ hours saved per agent weekly',
              },
            ]}
          />
        </div>
      </section>

      <RelatedLinks title="Go deeper on" accent="Grow Without Hiring." items={solutionRelated('capacity')} />

      <FaqSection items={FAQS} title="Grow Without Hiring:" accent="your questions answered." />

      <CTASection
        heading="Find out how many hours a week you could get back."
        subtext="In a free 60-minute audit, we'll map where your team's time goes and show you the first three workflows to automate."
      />
    </>
  );
}
