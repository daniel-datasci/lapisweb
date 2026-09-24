import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Seo from '@/components/Seo';
import PageHero from '@/components/PageHero';
import CTASection from '@/components/CTASection';
import OrbitVisualization from '@/components/OrbitVisualization';
import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';
import StatGrid from '@/components/StatGrid';
import QuoteGrid from '@/components/QuoteGrid';
import { caseStudyBySlug } from '@/data/testimonials';
import { pillarTag, solutionById } from '@/data/solutions';
import { breadcrumbLd, SITE_URL } from '@/data/site';
import './CaseStudyDetail.css';

export default function CaseStudyDetail() {
  const { slug } = useParams<{ slug: string }>();
  const study = caseStudyBySlug(slug);

  if (!study) return <Navigate to="/case-studies" replace />;

  const solution = solutionById[study.pillar];
  const path = `/case-studies/${study.slug}`;

  return (
    <>
      <Seo
        title={`${study.industry} Case Study | The Lapis AI`}
        description={`${study.title} ${study.problem}`}
        path={path}
        type="article"
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: study.title,
            description: study.problem,
            about: solution.name,
            url: `${SITE_URL}${path}`,
            publisher: { '@type': 'Organization', name: 'The Lapis AI', url: SITE_URL },
          },
          breadcrumbLd([
            { name: 'Home', path: '/' },
            { name: 'Case Studies', path: '/case-studies' },
            { name: study.industry, path },
          ]),
        ]}
      />

      <PageHero
        eyebrow={`Case study · ${study.industry}`}
        text={study.title}
        splitIndex={0}
        subtext={study.client}
        ctaLabel=""
      >
        <div className="case-hero-meta fade-up" style={{ animationDelay: '1.8s' }}>
          <Link to={solution.path} className="case-pillar-tag">
            {pillarTag(study.pillar)}
          </Link>
          <Link to="/case-studies" className="case-back">
            <ArrowLeft size={16} aria-hidden="true" /> All case studies
          </Link>
        </div>
      </PageHero>

      <section className="section section-paper">
        <div className="container" style={{ maxWidth: 880 }}>
          <Reveal>
            <span className="eyebrow">The problem</span>
            <p className="case-detail-body">{study.problem}</p>
          </Reveal>
          <Reveal>
            <div style={{ marginTop: 48 }}>
              <span className="eyebrow">What we built</span>
              <p className="case-detail-body">{study.built}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {study.featured && (
        <section className="section section-dark">
          <div className="container">
            <SectionHeading eyebrow="The system" title="A network of agents," accent="working 24/7." center />
            <div style={{ marginTop: 24 }}>
              <OrbitVisualization
                preset="market-watch"
                centerValue={6}
                centerSuffix="+"
                centerLabel="Agents watching"
              />
            </div>
          </div>
        </section>
      )}

      <section className="section section-navy">
        <div className="container">
          <SectionHeading eyebrow="The results" title="What changed" accent="after the system went live." />
          <div className="section-body">
            <StatGrid stats={study.results} columns={3} />
          </div>
        </div>
      </section>

      <section className="section section-paper">
        <div className="container" style={{ maxWidth: 820 }}>
          <QuoteGrid
            large
            items={[{ quote: study.testimonial.quote, cite: study.testimonial.name, detail: study.testimonial.company }]}
          />
        </div>
      </section>

      <CTASection
        heading="Want results like these?"
        subtext="Every engagement starts with a free audit. We'll show you where you're leaking time, leads and money, and what fixing it is worth."
      />
    </>
  );
}
