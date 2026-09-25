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
import { caseStudies } from '@/data/testimonials';
import { DEFAULT_OG_TITLE, organizationLd } from '@/data/site';
import './Home.css';

const heroText = 'Grow without adding headcount, losing leads, or wasting money on AI.';

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
  ['After launch', "Handover, then you're on your own", 'We run, monitor and fix it under a service agreement'],
  ['Proof of value', '"It\'s working" (probably)', 'A monthly report on hours returned, leads answered and revenue recovered'],
  ['Your data', 'Tested on clean demo examples', 'Built on data pipelines that handle your real, messy data'],
  ['Customers', 'The bot handles everything, badly', 'AI handles the routine; your people step in when it matters'],
  ['Fit', 'One-size-fits-all templates', 'Designed around your workflows, tools and market'],
  ['Who you work with', 'Account managers', 'The senior team that designs and builds your system'],
];

const results = [
  { value: '8+ hrs', label: 'returned per agent, every week (real estate)' },
  { value: '14%', label: 'RevPAR improvement (hospitality)' },
  { value: '<4 hrs', label: 'to spot and flag market changes (SaaS)' },
  { value: '5 weeks', label: 'from free audit to a live system' },
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
    title: 'Local & global pricing',
    body: 'Pay in naira in Nigeria, or in dollars, pounds or euros abroad. The same senior team either way.',
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
    phase: 'Week 1 · Audit',
    title: 'Find the leaks',
    body: "A free 60-minute audit to map where you're losing time, leads and money. You leave with a written roadmap of your top three opportunities.",
  },
  {
    icon: <Hammer size={26} />,
    phase: 'Weeks 2–5 · Build',
    title: 'Build it properly',
    body: 'We build your automations and agents on solid infrastructure, connected to the tools you already use. You have something live within the first month.',
  },
  {
    icon: <Activity size={26} />,
    phase: 'Ongoing · Run',
    title: 'Run it and prove it',
    body: 'We monitor, maintain and improve your systems 24/7, and meet with you monthly to review hours returned and revenue recovered.',
  },
];

const quotes = caseStudies.map((c) => ({
  quote: c.testimonial.quote,
  cite: `${c.testimonial.name}, ${c.testimonial.company}`,
}));

export default function Home() {
  return (
    <>
      <Seo
        title="The Lapis AI | Grow Without Hiring, Never Miss a Lead, Make Your AI Pay"
        description="We build and run AI systems that give growing businesses more capacity, answer every enquiry in under 60 seconds, and turn stalled AI into measurable return."
        path="/"
        ogTitle={DEFAULT_OG_TITLE}
        jsonLd={organizationLd}
      />

      <div className="home">
        <section className="page-hero page-hero-navy home-hero">
          <div className="container home-hero-grid">
            <div className="home-hero-left">
              <span className="eyebrow hero-eyebrow">· Lagos · London · Toronto · New York</span>
              <TypewriterHeading
                text={heroText}
                splitIndex={31}
                colorBefore="var(--white)"
                colorAfter="var(--cyan-400)"
                className="hero-title"
              />
              <p className="hero-sub fade-up" style={{ animationDelay: '1.5s' }}>
                The Lapis AI builds and runs the AI systems behind growing businesses. We take repetitive work off your team, 
                answer every enquiry in under a minute, turn stalled AI projects into systems that pay for themselves, 
                and train your team in Advanced Analytics so your data starts paying its way too. Then we stay: 
                we keep everything running and show you the results every month.
              </p>
              <div className="hero-cta-row fade-up" style={{ animationDelay: '1.8s' }}>
                <Button to="/contact" variant="primary" size="lg" borderWrap icon>
                  Book My Free AI Audit
                </Button>
                <Button to="/how-it-works" variant="ghost-light" size="lg">
                  See How It Works
                </Button>
              </div>
              <p className="home-trust fade-up" style={{ animationDelay: '2s' }}>
                Free 60-minute audit · Written roadmap you keep · No obligation
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
              intro="Every Lapis system comes with a team that monitors it, maintains it and improves it, plus a monthly report that shows you exactly what it's worth."
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
              title="From first conversation to a system that runs itself, in weeks."
            />
            <div className="section-body">
              <ProcessSteps steps={steps} />
            </div>
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
          heading="Find out where your business is leaking time, leads and money."
          subtext="A free 60-minute AI audit. You leave with a written roadmap of your top three opportunities, whether or not you work with us."
        />
      </div>
    </>
  );
}
