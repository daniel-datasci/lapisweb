import PageHero from '@/components/PageHero';
import CTASection from '@/components/CTASection';
import Reveal from '@/components/Reveal';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { caseStudies } from '@/data/testimonials';
import './CaseStudies.css';

const heading = 'Real Systems. Real Results. See What We\u2019ve Built.';

export default function CaseStudies() {
  return (
    <div>
      <PageHero
        eyebrow="Case Studies"
        text={heading}
        splitIndex={23}
        subtext="We don't sell theory. These are the systems we&rsquo;ve built, the problems they solved, and the results they delivered."
        ctaLabel="Get Results Like These"
      />

      <section className="section section-paper">
        <div className="container">
          <div className="case-grid">
            {caseStudies.map((cs, i) => (
              <Reveal key={cs.slug} delay={((i % 2) + 1) as 1 | 2}>
                <Link to={`/case-studies/${cs.slug}`} className="case-card">
                  <div className="case-card-top">
                    <span className="case-card-industry">{cs.industry}</span>
                    <span className="case-card-client">{cs.client}</span>
                  </div>
                  <div className="case-card-section">
                    <span className="case-card-label">Problem</span>
                    <p>{cs.problem}</p>
                  </div>
                  <div className="case-card-section">
                    <span className="case-card-label">What We Built</span>
                    <p>{cs.built}</p>
                  </div>
                  <div className="case-card-results">
                    {cs.results.map((r) => (
                      <div key={r.label} className="case-card-result">
                        <span className="case-card-result-value">
                          {r.prefix}
                          {r.value}
                          {r.suffix}
                        </span>
                        <span className="case-card-result-label">{r.label}</span>
                      </div>
                    ))}
                  </div>
                  <span className="case-card-link">
                    Read the full story <ArrowRight size={16} />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        heading="Want results like these?"
        subtext="It starts with a free audit. We&rsquo;ll show you where your blind spots are and what closing them looks like."
        ctaLabel="Get Results Like These"
      />
    </div>
  );
}
