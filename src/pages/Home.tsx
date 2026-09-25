import Seo from '@/components/Seo';
import Button from '@/components/Button';
import TypewriterHeading from '@/components/TypewriterHeading';
import OrbitVisualization from '@/components/OrbitVisualization';
import ClientLogoStrip from '@/components/ClientLogoStrip';
import SectionHeading from '@/components/SectionHeading';
import PillarGrid from '@/components/PillarGrid';
import StatGrid from '@/components/StatGrid';
import QuoteGrid from '@/components/QuoteGrid';
import CTASection from '@/components/CTASection';
import Reveal from '@/components/Reveal';
import { ProductCards, WorkerEssentialCards } from '@/components/PricingBlocks';
import { caseStudies } from '@/data/testimonials';
import { PRICING_NOTE, leadDesk, usd } from '@/data/pricing';
import { DEFAULT_OG_TITLE, discoveryLink } from '@/data/site';
import { PAGES } from '@/seo/routes';
import './Home.css';

const heroText = 'Hire AI workers, not more staff.';

const results = [
  { value: '8+ hrs', label: 'returned per agent, every week (real estate)' },
  { value: '14%', label: 'RevPAR improvement (hospitality)' },
  { value: '<4 hrs', label: 'to spot and flag market changes (SaaS)' },
  { value: '2–4 wks', label: 'to go live after signing' },
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
              <span className="eyebrow hero-eyebrow">Operated AI on subscription</span>
              <TypewriterHeading
                text={heroText}
                splitIndex={17}
                colorBefore="var(--white)"
                colorAfter="var(--cyan-400)"
                className="hero-title"
              />
              <p className="hero-sub fade-up" style={{ animationDelay: '1.5s' }}>
                We build them, run them, and show you what they did every month: AI workers that answer every enquiry in
                under a minute, take repetitive work off your team and turn stalled AI projects into systems that pay their
                way.
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
                Free 30-minute discovery call · Plans from {usd(leadDesk.startingPrice.usd)}/month · No hourly billing
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
            <SectionHeading eyebrow="Results" title="Real systems." accent="Measured results." />
            <div className="section-body">
              <StatGrid stats={results} />
            </div>
            <div className="section-body">
              <QuoteGrid items={quotes} />
            </div>
          </div>
        </section>

        <CTASection
          heading="Find out which AI worker to hire first."
          subtext="Book a free 30-minute discovery call. We'll talk through where your business is losing time, leads and money, and which plan fits, whether or not you work with us."
          ctaTo={discoveryLink()}
          secondaryLabel="See How It Works"
          secondaryTo="/how-it-works"
        />
      </div>
    </>
  );
}
