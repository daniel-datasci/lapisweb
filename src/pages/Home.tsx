import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Seo from '@/components/Seo';
import Button from '@/components/Button';
import ClientLogoStrip from '@/components/ClientLogoStrip';
import SectionHeading from '@/components/SectionHeading';
import CTASection from '@/components/CTASection';
import Reveal from '@/components/Reveal';
import Photo from '@/components/Photo';
import Sparkle from '@/components/Sparkle';
import HeroChips from '@/components/HeroChips';
import HowWeWork from '@/components/HowWeWork';
import SolutionMockup from '@/components/SolutionMockups';
import '@/components/SolutionMockups.css';
import { ProductCards } from '@/components/PricingBlocks';
import { caseStudies, type CaseStudy } from '@/data/testimonials';
import { solutionById, type PillarId } from '@/data/solutions';
import { PRICING_NOTE, leadDesk, usd, workerEssentials } from '@/data/pricing';
import { DEFAULT_OG_TITLE, FOUNDING_YEAR, LOCATION, discoveryLink } from '@/data/site';
import { photoSet } from '@/data/photos';
import { PAGES } from '@/seo/routes';
import './Home.css';

const heroChips = ['WhatsApp replies', 'Lead qualification', 'Follow-ups', 'Market Watch', 'Monthly impact report'];

/** Order on the page: the reference's chart, flow and stat mockups. */
const solutionOrder: PillarId[] = ['leads', 'capacity', 'ai-spend'];

const caseBySlug = Object.fromEntries(caseStudies.map((c) => [c.slug, c])) as Record<string, CaseStudy>;

type WallItem =
  | { kind: 'quote'; study: CaseStudy; featured?: boolean }
  | { kind: 'stat'; value: string; label: string; tag: string; to: string };

/** Masonry columns for the results wall: the real quotes and results, nothing else. */
const wall: WallItem[][] = [
  [
    {
      kind: 'stat',
      value: '8+ hrs',
      label: 'returned per agent, every week',
      tag: 'Real estate',
      to: '/case-studies/real-estate-market-monitor',
    },
    { kind: 'quote', study: caseBySlug['real-estate-market-monitor'] },
  ],
  [
    {
      kind: 'stat',
      value: '14%',
      label: 'RevPAR improvement',
      tag: 'Hospitality',
      to: '/case-studies/hospitality-rate-intelligence',
    },
    { kind: 'quote', study: caseBySlug['saas-competitive-intelligence'], featured: true },
    {
      kind: 'stat',
      value: '<4 hrs',
      label: 'to spot and flag market changes',
      tag: 'SaaS',
      to: '/case-studies/saas-competitive-intelligence',
    },
  ],
  [
    { kind: 'quote', study: caseBySlug['hospitality-rate-intelligence'] },
    { kind: 'stat', value: '2–4 wks', label: 'to go live after signing', tag: 'Every plan', to: '/how-it-works' },
  ],
];

const initials = (role: string) =>
  role
    .split(/\s+/)
    .filter((w) => /^[A-Z]/.test(w))
    .map((w) => w[0])
    .slice(0, 2)
    .join('');

function WallCard({ item }: { item: WallItem }) {
  if (item.kind === 'stat') {
    return (
      <Link to={item.to} className="wall-card wall-stat">
        <p className="wall-stat-value">{item.value}</p>
        <p className="wall-stat-label">{item.label}</p>
        <span className="wall-foot">
          <span className="wall-tag">{item.tag}</span>
          <ArrowUpRight size={16} aria-hidden="true" className="wall-arrow" />
        </span>
      </Link>
    );
  }
  const { study, featured } = item;
  const t = study.testimonial;
  return (
    <figure className={`wall-card wall-quote ${featured ? 'wall-featured' : ''}`}>
      <blockquote className="wall-quote-text">{t.quote}</blockquote>
      <figcaption className="wall-foot">
        <span className="wall-avatar" aria-hidden="true">
          {initials(t.name)}
        </span>
        <span className="wall-cite">
          <span className="wall-name">{t.name}</span>
          <span className="wall-role">{t.company}</span>
        </span>
        <Link to={`/case-studies/${study.slug}`} className="wall-chip">
          {study.industry}
          <span className="sr-only"> case study</span>
        </Link>
      </figcaption>
    </figure>
  );
}

export default function Home() {
  const tall = photoSet('home-hero-tall');
  return (
    <>
      <Seo {...PAGES.home} ogTitle={DEFAULT_OG_TITLE} />

      <div className="home">
        {/* 1. Hero */}
        <section className="home-hero" aria-labelledby="home-hero-title">
          <div className="home-hero-media" aria-hidden="true">
            <picture>
              <source media="(max-width: 700px)" srcSet={tall.srcSet} sizes="100vw" width={tall.width} height={tall.height} />
              <Photo name="home-hero" priority className="home-hero-img" />
            </picture>
          </div>
          <HeroChips items={heroChips} variant="home" />
          <div className="container home-hero-inner">
            <span className="eyebrow hero-eyebrow">Operated AI on subscription</span>
            <h1 className="hero-title home-hero-title fade-up" id="home-hero-title">
              Hire AI workers, not more staff.
            </h1>
            <p className="hero-sub home-hero-sub fade-up" style={{ animationDelay: '0.12s' }}>
              We build them, run them, and show you what they did every month: AI workers that answer every enquiry in
              under a minute, take repetitive work off your team and turn stalled AI projects into systems that pay their
              way.
            </p>
            <div className="hero-cta-row home-hero-ctas fade-up" style={{ animationDelay: '0.22s' }}>
              <Button to={discoveryLink()} variant="primary" size="lg">
                <span className="hide-xs">Book a </span>Free Discovery Call
              </Button>
              <Button to="/pricing" variant="ghost-light" size="lg">
                See Plans &amp; Pricing
              </Button>
            </div>
            <p className="home-trust fade-up" style={{ animationDelay: '0.3s' }}>
              Free 30-minute discovery call · Plans from {usd(leadDesk.startingPrice.usd)}/month · No hourly billing
            </p>
          </div>
        </section>

        {/* 2. Logo strip */}
        <ClientLogoStrip label="Trusted by growing teams across Africa and beyond" />

        {/* 3. About statement */}
        <section className="section home-about" aria-labelledby="home-about-title">
          <div className="container">
            <div className="about-grid">
              <Reveal className="about-eyebrow">
                <span className="eyebrow">Operated AI</span>
              </Reveal>
              <Reveal className="about-copy" delay={1}>
                <h2 className="about-statement" id="home-about-title">
                  <span className="about-lit">You&rsquo;re not buying software or a one-off build.</span>{' '}
                  <span className="about-dim">
                    You&rsquo;re hiring an AI worker
                    <Sparkle size={30} className="about-inline-sparkle" /> with a job description, a KPI, an operator and
                    a monthly impact report.
                  </span>
                </h2>
              </Reveal>
              <Reveal className="about-meta" delay={2}>
                <span className="about-chip">
                  <Sparkle size={10} /> Since {FOUNDING_YEAR}
                </span>
                <p className="about-caption">
                  {LOCATION.city}-based, working with teams across Africa, the UK, US, Canada and Europe.
                </p>
              </Reveal>
              <hr className="about-rule" />
            </div>

            <Reveal className="about-row">
              <div className="about-circle about-circle-spark">
                <Photo name="about-portrait" sizes="(max-width: 768px) 40vw, 260px" className="about-photo" />
                <Sparkle size={64} className="about-circle-mark" />
              </div>
              <div className="about-stadium">
                <Photo name="about-hands" sizes="(max-width: 768px) 92vw, 640px" className="about-photo" />
                <p className="about-stadium-text">We build them, run them, and show you what they did every month.</p>
              </div>
              <Link to="/how-it-works" className="about-arrow" aria-label="See how it works">
                <ArrowRight size={22} aria-hidden="true" />
              </Link>
              <div className="about-circle about-circle-stat">
                <Photo name="about-office" sizes="(max-width: 768px) 40vw, 260px" className="about-photo" />
                <p className="about-stat">
                  <span className="about-stat-value">
                    2–4<sup>wks</sup>
                  </span>
                  <span className="about-stat-label">to go live after signing</span>
                </p>
              </div>
            </Reveal>

            <ul className="about-essentials" aria-label="Every AI worker comes with four things">
              {workerEssentials.map((e, i) => (
                <Reveal as="li" key={e.title} delay={((i % 4) + 1) as 1 | 2 | 3 | 4} className="about-essential">
                  <span className="about-essential-num">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="about-essential-title">{e.title}</h3>
                  <p className="about-essential-text">{e.text}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* 4. Solutions (the reference's services cards) */}
        <section className="section home-solutions">
          <div className="container">
            <SectionHeading
              eyebrow="Three problems"
              title="Three things that keep owners awake at 3am."
              intro="Every growing business hits them eventually. We solve all three, and the fix for one usually helps with the other two."
              action={
                <Button to="/solutions" variant="green">
                  View Solutions
                </Button>
              }
            />
            <div className="section-body solution-grid">
              {solutionOrder.map((id, i) => {
                const s = solutionById[id];
                return (
                  <Reveal key={id} delay={(i + 1) as 1 | 2 | 3}>
                    <Link to={s.path} className="solution-card">
                      <div className="solution-card-bg" aria-hidden="true">
                        <Photo name="forest-mist" sizes="(max-width: 1100px) 92vw, 440px" />
                      </div>
                      <div aria-hidden="true">
                        <SolutionMockup id={id} />
                      </div>
                      <div className="solution-card-copy">
                        <h3 className="solution-card-title">{s.name}</h3>
                        <p className="solution-card-body">
                          {s.quote} {s.navDescription}.
                        </p>
                        <span className="solution-card-link">
                          {s.linkLabel} <ArrowRight size={14} aria-hidden="true" />
                        </span>
                      </div>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* 5. How we work carousel */}
        <HowWeWork />

        {/* 6. Results wall */}
        <section className="section home-results">
          <div className="container">
            <SectionHeading eyebrow="Results" title="Real systems." accent="Measured results." center />
            <div className="section-body wall">
              {wall.map((col, ci) => (
                <div key={ci} className={`wall-col wall-col-${ci + 1}`}>
                  {col.map((item, ii) => (
                    <Reveal key={ii} delay={(((ci + ii) % 3) + 1) as 1 | 2 | 3}>
                      <WallCard item={item} />
                    </Reveal>
                  ))}
                </div>
              ))}
            </div>
            <Reveal className="wall-cta">
              <Button to="/case-studies" variant="ghost-light">
                Read the case studies
              </Button>
            </Reveal>
          </div>
        </section>

        {/* 7. Pricing */}
        <section className="section home-pricing">
          <div className="container">
            <SectionHeading
              eyebrow="Plans & pricing"
              title="Three ways to hire AI workers."
              accent="One monthly fee."
              intro="Start with the problem that costs you most."
            />
            <div className="section-body">
              <ProductCards />
            </div>
            <Reveal>
              <p className="home-pricing-note">{PRICING_NOTE}</p>
            </Reveal>
          </div>
        </section>

        {/* 8. Final CTA */}
        <CTASection
          eyebrow="Take the first step"
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
