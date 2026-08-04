import { useParams, Link, Navigate } from 'react-router-dom';
import PageHero from '@/components/PageHero';
import CTASection from '@/components/CTASection';
import OrbitVisualization from '@/components/OrbitVisualization';
import Reveal from '@/components/Reveal';
import CountUp from '@/components/CountUp';
import { ArrowLeft, Quote } from 'lucide-react';
import { caseStudies } from '@/data/testimonials';
import './CaseStudyDetail.css';

export default function CaseStudyDetail() {
  const { slug } = useParams<{ slug: string }>();
  const study = caseStudies.find((c) => c.slug === slug);

  if (!study) return <Navigate to="/case-studies" replace />;

  return (
    <div>
      <PageHero
        eyebrow={`Case Study \u2014 ${study.industry}`}
        text={study.client}
        splitIndex={0}
        subtext={study.problem}
        ctaLabel="Get Results Like This"
      >
        <Link to="/case-studies" className="case-back fade-up" style={{ animationDelay: '2s' }}>
          <ArrowLeft size={16} /> All case studies
        </Link>
      </PageHero>

      {/* Approach + Built */}
      <section className="section section-paper">
        <div className="container" style={{ maxWidth: 880 }}>
          <Reveal>
            <span className="eyebrow">The Approach</span>
            <p className="case-detail-body">{study.approach}</p>
          </Reveal>
          <Reveal>
            <div style={{ marginTop: 48 }}>
              <span className="eyebrow">What We Built</span>
              <p className="case-detail-body">{study.built}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Architecture / orbit viz for flagship */}
      {study.featured && (
        <section className="section section-dark">
          <div className="container">
            <Reveal>
              <span className="eyebrow">The System</span>
              <h2 className="section-title" style={{ textAlign: 'center' }}>
                A network of agents, <span className="accent">working 24/7.</span>
              </h2>
            </Reveal>
            <div style={{ marginTop: 24 }}>
              <OrbitVisualization />
            </div>
          </div>
        </section>
      )}

      {/* Results */}
      <section className="section section-navy">
        <div className="container">
          <Reveal>
            <span className="eyebrow">The Results</span>
            <h2 className="section-title">
              What changed <span className="accent">after the system went live.</span>
            </h2>
          </Reveal>
          <div className="case-detail-results" style={{ marginTop: 48 }}>
            {study.results.map((r, i) => (
              <Reveal key={r.label} delay={(i + 1) as 1 | 2 | 3}>
                <div className="case-detail-result">
                  <div className="case-detail-result-value">
                    <CountUp target={r.value} prefix={r.prefix} suffix={r.suffix} />
                  </div>
                  <div className="case-detail-result-label">{r.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="section section-paper">
        <div className="container" style={{ maxWidth: 760 }}>
          <Reveal>
            <div className="case-testimonial">
              <Quote size={36} className="case-testimonial-mark" />
              <p className="case-testimonial-quote">{study.testimonial.quote}</p>
              <div className="case-testimonial-attr">
                <span className="case-testimonial-name">{study.testimonial.name}</span>
                <span className="case-testimonial-title">
                  {study.testimonial.title}, {study.testimonial.company}
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection
        heading="Get results like this."
        subtext="Every engagement starts with a free audit. We&rsquo;ll show you where your blind spots are and what closing them could look like."
        ctaLabel="Book My Free Audit"
      />
    </div>
  );
}
