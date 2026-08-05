import { Helmet } from 'react-helmet-async';
import PageHero from '@/components/PageHero';
import CTASection from '@/components/CTASection';
import Reveal from '@/components/Reveal';
import { Link } from 'react-router-dom';
import { Check, AlertTriangle, ArrowRight, Cloud, Building2, BedDouble, Bot, Server, Sparkles, type LucideIcon } from 'lucide-react';
import type { Industry } from '@/data/industries';
import './IndustryPage.css';

const iconMap: Record<string, LucideIcon> = {
  Cloud,
  Building2,
  BedDouble,
  Bot,
  Server,
};

function getIcon(name: string): LucideIcon {
  return iconMap[name] || Sparkles;
}

export default function IndustryPage({ industry }: { industry: Industry }) {
  const CrossIcon = getIcon(industry.icon);

  return (
    <>
      <Helmet>
        <title>{industry.name} Competitive Intelligence | The Lapis AI</title>
        <meta
          name="description"
          content={industry.offer}
        />
        <link rel="canonical" href={`https://thelapisai.com.ng${industry.path}`} />

        {/* Open Graph */}
        <meta property="og:title" content={`${industry.name} Competitive Intelligence | The Lapis AI`} />
        <meta property="og:description" content={industry.offer} />
        <meta property="og:url" content={`https://thelapisai.com.ng${industry.path}`} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://thelapisai.com.ng/og-back.png" />
        <meta property="og:site_name" content="The Lapis AI" />
        <meta property="og:locale" content="en_NG" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://thelapisai.com.ng/og-back.png" />
      </Helmet>

      {/* Industry-specific Service structured data */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: `${industry.name} Competitive Intelligence`,
          provider: {
            '@type': 'Organization',
            name: 'The Lapis AI',
            url: 'https://thelapisai.com.ng',
          },
          description: industry.offer,
          serviceType: `Market Intelligence for ${industry.name}`,
          url: `https://thelapisai.com.ng${industry.path}`,
          areaServed: 'Worldwide',
        })}
      </script>

      <div>
        <PageHero
          eyebrow={`Industries \u2014 ${industry.name}`}
          text={industry.heroHeading}
          splitIndex={Math.floor(industry.heroHeading.length * 0.55)}
          subtext=""
          ctaLabel={industry.finalCta}
        />

        {/* The Pain */}
        <section className="section section-paper">
          <div className="container">
            <Reveal>
              <span className="eyebrow">{industry.painTitle}</span>
              <h2 className="section-title">
                What it looks like <span className="accent">when you&rsquo;re the last to know.</span>
              </h2>
            </Reveal>
            <div className="industry-pain-list" style={{ marginTop: 48 }}>
              {industry.pains.map((pain, i) => (
                <Reveal key={i} delay={((i % 2) + 1) as 1 | 2}>
                  <div className="industry-pain-item">
                    <span className="industry-pain-icon">
                      <AlertTriangle size={20} />
                    </span>
                    <p>{pain}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* The Cost */}
        <section className="section section-dark">
          <div className="container" style={{ maxWidth: 880 }}>
            <Reveal>
              <span className="eyebrow">{industry.costTitle}</span>
              <h2 className="section-title">
                What stale information <span className="accent">actually costs you.</span>
              </h2>
              <p className="industry-cost-body">{industry.cost}</p>
            </Reveal>
          </div>
        </section>

        {/* The Offer */}
        <section className="section section-paper">
          <div className="container" style={{ maxWidth: 880 }}>
            <Reveal>
              <span className="eyebrow">The Offer</span>
              <div className="industry-offer">
                <span className="industry-offer-quote">{industry.offer}</span>
              </div>
            </Reveal>
          </div>
        </section>

        {/* What's Included */}
        <section className="section section-navy">
          <div className="container" style={{ maxWidth: 880 }}>
            <Reveal>
              <span className="eyebrow">What&rsquo;s Included</span>
              <h2 className="section-title">
                Exactly what we build <span className="accent">and deliver.</span>
              </h2>
            </Reveal>
            <ul className="industry-included" style={{ marginTop: 40 }}>
              {industry.included.map((item, i) => (
                <Reveal key={i}>
                  <li className="industry-included-item">
                    <span className="included-check included-check-dark">
                      <Check size={18} />
                    </span>
                    <span>{item}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* Risk Reversal */}
        <section className="section section-paper">
          <div className="container" style={{ maxWidth: 880 }}>
            <Reveal>
              <div className="risk-box">
                <h3 className="risk-box-title">Risk reversal: we prove it before you pay.</h3>
                <p className="risk-box-body">{industry.riskReversal}</p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Cross-sell */}
        <section className="section section-paper industry-cross-section">
          <div className="container">
            <Reveal>
              <span className="eyebrow">Also Relevant</span>
              <h2 className="section-title">Also relevant to your team.</h2>
            </Reveal>
            <div className="grid grid-2" style={{ marginTop: 48 }}>
              {industry.crossSell.map((cs, i) => {
                const Icon = getIcon(cs.icon);
                return (
                  <Reveal key={cs.path} delay={(i + 1) as 1 | 2}>
                    <Link to={cs.path} className="card industry-cross-card">
                      <span className="card-icon">
                        <Icon size={24} />
                      </span>
                      <h3 className="card-title">{cs.label}</h3>
                      <span className="pillar-link">
                        Learn more <ArrowRight size={16} />
                      </span>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <CTASection
          heading={industry.finalCta}
          subtext="Two weeks free. You see the results before you decide."
          ctaLabel="Start My Free Trial"
        />
      </div>
    </>
  );
}