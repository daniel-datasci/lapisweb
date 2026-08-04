import PageHero from '@/components/PageHero';
import CTASection from '@/components/CTASection';
import Reveal from '@/components/Reveal';
import Button from '@/components/Button';
import { Check, Star } from 'lucide-react';
import { pricingTiers } from '@/data/pricing';
import './Pricing.css';

const heading = 'Start Free. Scale When You\u2019re Ready.';

export default function Pricing() {
  return (
    <div>
      <PageHero
        eyebrow="Pricing"
        text={heading}
        splitIndex={11}
        subtext="Every engagement starts with a free readiness audit. You see the value before you spend a dollar. From there, you scale when you're ready, not when a contract says so."
        ctaLabel="Book My Free Audit"
      />

      <section className="section section-paper">
        <div className="container">
          <div className="pricing-grid">
            {pricingTiers.map((tier, i) => (
              <Reveal key={tier.name} delay={(i + 1) as 1 | 2 | 3}>
                <div className={`pricing-card ${tier.popular ? 'pricing-popular' : ''}`}>
                  {tier.popular && (
                    <div className="border-wrap border-wrap-card pricing-border-wrap">
                      <div className="pricing-popular-inner" />
                    </div>
                  )}
                  {tier.popular && (
                    <span className="pricing-badge">
                      <Star size={14} fill="currentColor" /> Most Popular
                    </span>
                  )}
                  <div className="pricing-card-content">
                    <h3 className="pricing-name">{tier.name}</h3>
                    <div className="pricing-price">
                      <span className="pricing-amount">{tier.price}</span>
                      <span className="pricing-cadence">{tier.cadence}</span>
                    </div>
                    <p className="pricing-tagline">{tier.tagline}</p>
                    <ul className="pricing-features">
                      {tier.features.map((f) => (
                        <li key={f}>
                          <span className="pricing-check">
                            <Check size={16} />
                          </span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      to="/contact"
                      variant={tier.popular ? 'primary' : 'ghost'}
                      size="lg"
                      borderWrap={tier.popular}
                      icon
                      className="pricing-cta"
                    >
                      {tier.cta}
                    </Button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="pricing-bottom-cta">
              <p>Not sure which tier fits? Book a free call and we&rsquo;ll tell you honestly.</p>
              <Button to="/contact" variant="primary" size="lg" icon>
                Book a Free Call
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection
        heading="Every tier starts with the same free audit."
        subtext="No matter where you land, the first step is the same: a 60-minute readiness audit, on us."
        ctaLabel="Book My Free Audit"
      />
    </div>
  );
}
