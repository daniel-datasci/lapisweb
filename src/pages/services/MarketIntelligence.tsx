import PageHero from '@/components/PageHero';
import CTASection from '@/components/CTASection';
import Reveal from '@/components/Reveal';
import OrbitVisualization from '@/components/OrbitVisualization';
import SavingsEstimator from '@/components/SavingsEstimator';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeftRight, Radar, Bell } from 'lucide-react';

const heading = 'Know what your competitors are doing the same day, not the same week your customer tells you.';

const steps = [
  { icon: <ArrowLeftRight size={28} />, title: 'Tell Us What Matters', body: 'You tell us which competitors, which markets, and which signals matter to you \u2014 pricing, features, hiring, positioning, demand shifts.' },
  { icon: <Radar size={28} />, title: 'Agents Work 24/7', body: 'Our agents monitor those sources continuously \u2014 scraping, verifying, and flagging changes within hours, not weeks.' },
  { icon: <Bell size={28} />, title: 'You Get Alerts', body: 'The moment something changes, you get an alert and a daily intelligence brief. Your team sells and decides on current information.' },
];

export default function MarketIntelligence() {
  return (
    <div>
      <PageHero
        eyebrow="Market & Competitive Intelligence"
        text={heading}
        splitIndex={56}
        subtext="Continuous monitoring that watches your competitors, market signals, and pricing changes, then alerts you as soon as something shifts."
        ctaLabel="Book a Free Readiness Audit"
        variant="split"
      >
        <OrbitVisualization variant="simplified" centerValue={24} centerSuffix="/7" centerLabel="Continuous Monitoring" />
      </PageHero>

      {/* How it works */}
      <section className="section section-paper">
        <div className="container">
          <Reveal>
            <span className="eyebrow">How It Works</span>
            <h2 className="section-title">
              Three steps. <span className="accent">Continuous coverage.</span>
            </h2>
          </Reveal>
          <div className="grid grid-3" style={{ marginTop: 56 }}>
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={(i + 1) as 1 | 2 | 3}>
                <div className="card">
                  <span className="card-icon">{s.icon}</span>
                  <h3 className="card-title">{s.title}</h3>
                  <p className="card-body">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Built for your industry */}
      <section className="section section-navy">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Built For Your Industry</span>
            <h2 className="section-title">
              Intelligence tuned to <span className="accent">how your market actually moves.</span>
            </h2>
          </Reveal>
          <div className="grid grid-3" style={{ marginTop: 56 }}>
            {[
              { name: 'SaaS', path: '/industries/saas', desc: 'Pricing pages, feature launches, hiring signals tracked daily.' },
              { name: 'Real Estate', path: '/industries/real-estate', desc: 'New listings, price changes, and inventory shifts in real time.' },
              { name: 'Hospitality', path: '/industries/hospitality', desc: 'Competitor rates and demand signals monitored hourly.' },
            ].map((ind, i) => (
              <Reveal key={ind.name} delay={(i + 1) as 1 | 2 | 3}>
                <Link to={ind.path} className="card card-dark pillar-card">
                  <h3 className="card-title-light">{ind.name}</h3>
                  <p className="card-body-light">{ind.desc}</p>
                  <span className="pillar-link">
                    Explore <ArrowRight size={16} />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <SavingsEstimator
        subtitle="Knowing what your competitors are doing before they do it isn't just defense \u2014 it's margin. Model your current intel and research spend to see what continuous monitoring could save."
        laborSavingsRate={0.50}
        toolSavingsRate={0.20}
        analyticsSavingsRate={0.75}
        growthRate={0.045}
      />

      {/* Risk reversal */}
      <section className="section section-paper">
        <div className="container" style={{ maxWidth: 880 }}>
          <Reveal>
            <div className="risk-box">
              <h3 className="risk-box-title">We&rsquo;ll prove it before you pay.</h3>
              <p className="risk-box-body">
                We&rsquo;ll run the monitoring on your top competitors for two weeks for free and show you exactly
                what changed. If it isn&rsquo;t useful, you owe nothing. No contracts, no pressure.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection
        heading="See what your competitors changed this month - free."
        subtext="Two weeks of free monitoring. You see the intelligence before you decide."
        ctaLabel="Show Me What Changed"
      />
    </div>
  );
}
