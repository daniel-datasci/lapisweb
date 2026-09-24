import { Link } from 'react-router-dom';
import { Check, Star } from 'lucide-react';
import Seo from '@/components/Seo';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import Button from '@/components/Button';
import Rich from '@/components/Rich';
import { pricingTiers } from '@/data/pricing';
import { breadcrumbLd, SITE_URL } from '@/data/site';
import './Pricing.css';

const DESCRIPTION =
  "Start with a free AI audit. Then pay for systems that are built, run and measured, with a monthly report of what they're worth.";

export default function Pricing() {
  return (
    <>
      <Seo
        title="Pricing | The Lapis AI"
        description={DESCRIPTION}
        path="/pricing"
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'OfferCatalog',
            name: 'The Lapis AI pricing',
            url: `${SITE_URL}/pricing`,
            itemListElement: pricingTiers
              .filter((t) => t.price.startsWith('$'))
              .map((t) => ({
                '@type': 'Offer',
                name: t.name,
                price: t.price.replace(/[^0-9.]/g, ''),
                priceCurrency: 'USD',
                description: t.tagline.replace(/\*/g, ''),
              })),
          },
          breadcrumbLd([
            { name: 'Home', path: '/' },
            { name: 'Pricing', path: '/pricing' },
          ]),
        ]}
      />

      <PageHero
        eyebrow="Pricing"
        text="Start free. Pay for results you can see."
        splitIndex={0}
        subtext="Every engagement starts with a free audit, so you see the opportunity before you spend anything. From there, you scale when the numbers justify it, not when a contract says so."
        ctaLabel=""
      />

      <section className="section section-paper">
        <div className="container">
          <div className="pricing-grid">
            {pricingTiers.map((tier, i) => (
              <Reveal key={tier.name} delay={(i + 1) as 1 | 2 | 3}>
                <div className={`pricing-card ${tier.popular ? 'pricing-popular' : ''}`}>
                  {tier.popular && (
                    <div className="border-wrap border-wrap-card pricing-border-wrap" aria-hidden="true">
                      <div className="pricing-popular-inner" />
                    </div>
                  )}
                  {tier.popular && (
                    <span className="pricing-badge">
                      <Star size={14} fill="currentColor" aria-hidden="true" /> Most chosen
                    </span>
                  )}
                  <div className="pricing-card-content">
                    <h2 className="pricing-name">{tier.name}</h2>
                    <div className="pricing-price">
                      <span className="pricing-amount">{tier.price}</span>
                    </div>
                    <p className="pricing-tagline">
                      <Rich text={tier.tagline} />
                    </p>
                    <ul className="pricing-features">
                      {tier.features.map((f) => (
                        <li key={f}>
                          <span className="pricing-check" aria-hidden="true">
                            <Check size={16} />
                          </span>
                          <span>
                            <Rich text={f} />
                          </span>
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
              <p>
                Pricing is available in NGN for Nigerian clients, and in USD, GBP or EUR for international clients. Not
                sure which tier fits? <Link to="/contact">Book a free call</Link> and we'll tell you honestly.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
