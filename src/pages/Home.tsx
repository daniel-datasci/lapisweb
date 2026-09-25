import {
  LogOut,
  Puzzle,
  MessageSquareX,
  FileX,
  Wifi,
  Smartphone,
  Coins,
  ShieldCheck,
  Search,
  Hammer,
  Activity,
} from 'lucide-react';
import Seo from '@/components/Seo';
import Button from '@/components/Button';
import TypewriterHeading from '@/components/TypewriterHeading';
import OrbitVisualization from '@/components/OrbitVisualization';
import ClientLogoStrip from '@/components/ClientLogoStrip';
import SectionHeading from '@/components/SectionHeading';
import PillarGrid from '@/components/PillarGrid';
import InfoCards, { InfoCard } from '@/components/InfoCards';
import ResponsiveTable from '@/components/ResponsiveTable';
import StatGrid from '@/components/StatGrid';
import PersonaGrid from '@/components/PersonaGrid';
import ProcessSteps from '@/components/ProcessSteps';
import QuoteGrid from '@/components/QuoteGrid';
import CTASection from '@/components/CTASection';
import Reveal from '@/components/Reveal';
import { ProductCards, WorkerEssentialCards } from '@/components/PricingBlocks';
import { caseStudies } from '@/data/testimonials';
import { AUDIT_PRICE, PRICING_NOTE, everyPlanIncludes, leadDesk, ngn, pricePair, usd } from '@/data/pricing';
import { DEFAULT_OG_TITLE, discoveryLink } from '@/data/site';
import { PAGES } from '@/seo/routes';
import './Home.css';

const heroText = 'Hire AI workers, not more staff.';

const whyItFails: InfoCard[] = [
  {
    icon: <LogOut size={26} />,
    title: 'The builder who leaves',
    body: 'An agency or freelancer builds an automation, hands it over and disappears. When it breaks, nobody knows how to fix it.',
  },
  {
    icon: <Puzzle size={26} />,
    title: 'The tool that almost fits',
    body: 'Off-the-shelf software handles 80% of your workflow. Your team does the other 20% by hand, forever.',
  },
  {
    icon: <MessageSquareX size={26} />,
    title: 'The bot customers hate',
    body: "A chatbot that can't answer real questions, invents policies and sends good customers to competitors.",
  },
  {
    icon: <FileX size={26} />,
    title: 'The deck that never ships',
    body: 'An expensive strategy report full of recommendations, with nobody around to build them.',
  },
];

const differenceRows = [
  ['After launch', "Handover, then you're on your own", 'An operator runs, monitors and fixes it under a service-level agreement'],
  ['Proof of value', '"It\'s working" (probably)', 'A monthly impact report on hours returned, leads answered and revenue recovered'],
  ['How you pay', 'A project fee, then extra for every fix', 'One monthly fee with running, fixes, upgrades and hosting included. No hourly billing'],
  ['Your data', 'Tested on clean demo examples', 'Built on data pipelines that handle your real, messy data'],
  ['Customers', 'The bot handles everything, badly', 'AI handles the routine; your people step in when it matters'],
  ['Fit', 'One-size-fits-all templates', 'Designed around your workflows, tools and market'],
  ['Who you work with', 'Account managers', 'The senior team that designs and builds your AI workers'],
];

const results = [
  { value: '8+ hrs', label: 'returned per agent, every week (real estate)' },
  { value: '14%', label: 'RevPAR improvement (hospitality)' },
  { value: '<4 hrs', label: 'to spot and flag market changes (SaaS)' },
  { value: '2–4 wks', label: 'to go live after signing' },
];

const personas = [
  {
    role: 'Founders & CEOs',
    need: 'You need the business to grow without every decision going through you, and without burning out to get there.',
  },
  {
    role: 'COOs & Operations Leads',
    need: "You need processes that don't break every time volume doubles or a key person goes on leave.",
  },
  {
    role: 'CFOs & Finance Leads',
    need: 'You need to grow output without growing payroll, and to see a real return on every naira, pound or dollar spent on AI.',
  },
  {
    role: 'Sales & Revenue Leaders',
    need: 'You need every enquiry answered fast and followed up properly, so pipeline stops leaking between channels.',
  },
  {
    role: 'Customer Experience Leads',
    need: 'You need faster responses without a bot that frustrates customers or makes things up.',
  },
  {
    role: 'Growing SMEs & Scale-ups',
    need: "You've outgrown spreadsheets and WhatsApp groups, but a Big-4 consultancy isn't the answer.",
  },
];

const nigeria: InfoCard[] = [
  {
    icon: <Smartphone size={26} />,
    title: 'WhatsApp-first',
    body: 'Your customers live on WhatsApp. Our systems answer, qualify and book there first, then on phone, web and email.',
  },
  {
    icon: <Wifi size={26} />,
    title: 'Built for real conditions',
    body: 'Designed to keep working through patchy connectivity, legacy tools and data spread across a dozen places.',
  },
  {
    icon: <Coins size={26} />,
    title: 'Priced in naira and dollars',
    body: 'Every plan has a naira and a US dollar price. Nigeria-based businesses pay in naira by card, direct debit or bank transfer.',
  },
  {
    icon: <ShieldCheck size={26} />,
    title: 'Privacy by design',
    body: 'Access control, audit logs and data governance in every build, aligned with NDPA and GDPR expectations.',
  },
];

const steps = [
  {
    icon: <Search size={26} />,
    phase: 'Step 1 · Discover',
    title: 'Find the right AI workers',
    body: `A free 30-minute discovery call, then a paid AI Opportunity Audit (${pricePair(AUDIT_PRICE)}, credited if you subscribe) that ranks the AI workers worth hiring and what each is worth every month.`,
  },
  {
    icon: <Hammer size={26} />,
    phase: 'Weeks 1–4 · Onboard',
    title: 'Build it properly',
    body: 'Pick a plan and we build your AI workers on solid infrastructure, connected to the tools you already use. They go live 2–4 weeks after signing.',
  },
  {
    icon: <Activity size={26} />,
    phase: 'Every month · Run',
    title: 'Run it and prove it',
    body: 'We monitor, fix and improve your AI workers 24/7, and send a monthly impact report. At 90 days, we propose the next AI worker.',
  },
];

const quotes = caseStudies.map((c) => ({
  quote: c.testimonial.quote,
  cite: `${c.testimonial.name}, ${c.testimonial.company}`,
}));

export default function Home() {
  return (
    <>
      <Seo {...PAGES.home} ogTitle={DEFAULT_OG_TITLE} />

      <div className="home">
        <section className="page-hero page-hero-navy home-hero">
          <div className="container home-hero-grid">
            <div className="home-hero-left">
              <span className="eyebrow hero-eyebrow">Lagos · London · Toronto · New York</span>
              <TypewriterHeading
                text={heroText}
                splitIndex={17}
                colorBefore="var(--white)"
                colorAfter="var(--cyan-400)"
                className="hero-title"
              />
              <p className="hero-sub fade-up" style={{ animationDelay: '1.5s' }}>
                We build them, run them, and show you what they did every month. The Lapis AI gives growing businesses
                operated AI on subscription: AI workers that answer every enquiry in under a minute, take repetitive work
                off your team and turn stalled AI projects into systems that pay their way. Each one comes with a job
                description, a KPI, an operator and a monthly impact report.
              </p>
              <div className="hero-cta-row fade-up" style={{ animationDelay: '1.8s' }}>
                <Button to={discoveryLink()} variant="primary" size="lg" borderWrap icon>
                  <span className="hide-xs">Book a </span>Free Discovery Call
                </Button>
                <Button to="/pricing" variant="ghost-light" size="lg">
                  See Plans &amp; Pricing
                </Button>
              </div>
              <p className="home-trust fade-up" style={{ animationDelay: '2s' }}>
                Free 30-minute discovery call · Plans from {usd(leadDesk.startingPrice.usd)}/month (
                {ngn(leadDesk.startingPrice.ngn)}) · No hourly billing
              </p>
            </div>
            <div className="home-hero-right">
              <OrbitVisualization />
            </div>
          </div>
        </section>

        <ClientLogoStrip label="Trusted by growing teams across Africa and beyond" />

        <section className="section section-paper">
          <div className="container">
            <SectionHeading
              eyebrow="Three problems"
              title="Three things that keep owners awake at 3am."
              intro="Every growing business hits them eventually. We solve all three, and the fix for one usually helps with the other two."
            />
            <div className="section-body">
              <PillarGrid />
            </div>
          </div>
        </section>

        <section className="section section-dark">
          <div className="container">
            <SectionHeading
              eyebrow="Operated AI"
              title="Every AI worker comes with four things."
              intro="You're not buying software or a one-off build. You're hiring an AI worker with a clear job, and we stay accountable for it."
            />
            <div className="section-body">
              <WorkerEssentialCards />
            </div>
          </div>
        </section>

        <section className="section section-paper">
          <div className="container">
            <SectionHeading
              eyebrow="Plans & pricing"
              title="Three ways to hire AI workers."
              accent="One monthly fee."
              intro={`Start with the problem that costs you most. ${PRICING_NOTE}`}
            />
            <div className="section-body">
              <ProductCards />
            </div>
            <Reveal>
              <p className="pricing-includes">
                <strong>Every plan includes:</strong> {everyPlanIncludes.join(' · ')}.
              </p>
            </Reveal>
            <Reveal>
              <div className="cta-row-center home-plans-cta">
                <Button to="/pricing" variant="primary" borderWrap icon>
                  See Plans &amp; Pricing
                </Button>
                <Button to={discoveryLink()} variant="ghost-light">
                  Book a Free Discovery Call
                </Button>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section section-dark">
          <div className="container">
            <SectionHeading
              eyebrow="Why most AI help fails"
              title="The problem isn't AI."
              accent="It's how AI gets sold to you."
              intro="You've probably met at least one of these. We built The Lapis AI to be the opposite."
            />
            <div className="section-body">
              <InfoCards items={whyItFails} columns={4} />
            </div>
          </div>
        </section>

        <section className="section section-paper">
          <div className="container">
            <SectionHeading
              eyebrow="The Lapis difference"
              title="We don't just build it."
              accent="We run it."
              intro="Every Lapis AI worker has an operator who monitors it, maintains it and improves it, plus a monthly impact report that shows you exactly what it's worth."
            />
            <div className="section-body">
              <ResponsiveTable
                caption="How The Lapis AI compares with a typical AI agency or tool"
                variant="vs"
                columns={[{ label: 'Compared on', hideLabel: true }, { label: 'Typical AI agency or tool' }, { label: 'The Lapis AI' }]}
                rows={differenceRows}
              />
            </div>
          </div>
        </section>

        <section className="section section-dark">
          <div className="container">
            <SectionHeading eyebrow="Results" title="Real systems." accent="Measured results." />
            <div className="section-body">
              <StatGrid stats={results} />
            </div>
          </div>
        </section>

        <section className="section section-paper">
          <div className="container">
            <SectionHeading eyebrow="Who it's for" title="Built for the people holding the business together." />
            <div className="section-body">
              <PersonaGrid personas={personas} />
            </div>
          </div>
        </section>

        <section className="section section-dark">
          <div className="container">
            <SectionHeading
              eyebrow="Nigeria and beyond"
              title="Built in Lagos."
              accent="Working from Lagos to London."
              intro="We understand how business actually runs in fast-growing markets, and we build to the standards international clients expect."
            />
            <div className="section-body">
              <InfoCards items={nigeria} columns={4} />
            </div>
          </div>
        </section>

        <section className="section section-paper">
          <div className="container">
            <SectionHeading
              eyebrow="How it works"
              title="From first call to AI workers on the job, in weeks."
            />
            <div className="section-body">
              <ProcessSteps steps={steps} />
            </div>
            <Reveal>
              <div className="cta-row-center home-plans-cta">
                <Button to="/how-it-works" variant="ghost-light">
                  See How It Works
                </Button>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section section-dark">
          <div className="container">
            <SectionHeading eyebrow="What clients say" center />
            <div className="section-body">
              <QuoteGrid items={quotes} />
            </div>
          </div>
        </section>

        <CTASection
          heading="Find out which AI worker to hire first."
          subtext="Book a free 30-minute discovery call. We'll talk through where your business is losing time, leads and money, and which plan fits, whether or not you work with us."
          ctaTo={discoveryLink()}
          secondaryLabel="See Plans & Pricing"
          secondaryTo="/pricing"
        />
      </div>
    </>
  );
}
