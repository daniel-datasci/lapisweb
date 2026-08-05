import { Helmet } from 'react-helmet-async';
import Button from '@/components/Button';
import TypewriterHeading from '@/components/TypewriterHeading';
import OrbitVisualization from '@/components/OrbitVisualization';
import ProblemGrid from '@/components/ProblemGrid';
import PillarGrid from '@/components/PillarGrid';
import DiffTable from '@/components/DiffTable';
import ProcessSteps from '@/components/ProcessSteps';
import PersonaGrid from '@/components/PersonaGrid';
import LogoTicker from '@/components/LogoTicker';
import CTASection from '@/components/CTASection';
import Reveal from '@/components/Reveal';
import CountUp from '@/components/CountUp';
import ClientLogoStrip from '@/components/ClientLogoStrip';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { caseStudies } from '@/data/testimonials';
import './Home.css';

const heroText = 'Data is cheap. Knowing what to do with it is the advantage.';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>The Lapis AI — Competitive Intelligence &amp; AI Agents</title>
        <meta
          name="description"
          content="AI competitive intelligence, custom agents, and the infrastructure underneath them. Start with a free AI readiness audit."
        />
        <link rel="canonical" href="https://thelapisai.com.ng" />

        {/* Open Graph */}
        <meta property="og:title" content="The Lapis AI — Competitive Intelligence &amp; AI Agents" />
        <meta
          property="og:description"
          content="AI competitive intelligence, custom agents, and the infrastructure underneath them. Start with a free AI readiness audit."
        />
        <meta property="og:url" content="https://thelapisai.com.ng" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://thelapisai.com.ng/og-back.png" />
        <meta property="og:site_name" content="The Lapis AI" />
        <meta property="og:locale" content="en_NG" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://thelapisai.com.ng/og-back.png" />
      </Helmet>

      {/* Organization structured data */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'The Lapis AI',
          url: 'https://thelapisai.com.ng',
          logo: 'https://thelapisai.com.ng/og-back.png',
          description:
            'AI competitive intelligence, custom agents, and infrastructure. We help leadership teams act faster, spot market shifts earlier, and make better decisions.',
          sameAs: [
            // Add your social links when available
            // 'https://twitter.com/yourhandle',
            // 'https://linkedin.com/company/yourcompany',
          ],
        })}
      </script>

      {/* WebSite structured data (optional but helpful) */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'The Lapis AI',
          url: 'https://thelapisai.com.ng',
          potentialAction: {
            '@type': 'SearchAction',
            target: 'https://thelapisai.com.ng/search?q={search_term_string}',
            'query-input': 'required name=search_term_string',
          },
        })}
      </script>

      <div className="home">
        {/* Hero */}
        <section className="page-hero page-hero-navy home-hero">
          <div className="container home-hero-grid">
            <div className="home-hero-left">
              <span className="eyebrow hero-eyebrow">The Lapis AI</span>
              <TypewriterHeading
                text={heroText}
                splitIndex={14}
                colorBefore="var(--white)"
                colorAfter="var(--gold-500)"
                className="hero-title"
              />
              <p className="hero-sub fade-up" style={{ animationDelay: '1.5s' }}>
                We engineer AI systems that turn fragmented market signals into clear, prioritized decisions. From readiness audit to fully deployed agent, your first win is only weeks away—not months.
              </p>
              <div className="hero-cta-row fade-up" style={{ animationDelay: '1.8s' }}>
                <Button to="/contact" variant="primary" size="lg" borderWrap icon>
                  Book My Free Audit
                </Button>
                <Button to="/how-it-works" variant="ghost-light" size="lg">
                  Explore Our Approach
                </Button>
              </div>
            </div>
            <div className="home-hero-right">
              <OrbitVisualization />
            </div>
          </div>
        </section>

        <ClientLogoStrip />
        <ProblemGrid />
        <PillarGrid />
        <DiffTable />
        <ProcessSteps />
        <PersonaGrid />

        {/* Case study teaser */}
        <section className="section section-dark">
          <div className="container">
            <Reveal>
              <span className="eyebrow">Real Systems. Real Results.</span>
              <h2 className="section-title">
                What it looks like <span className="accent">when the blind spots close.</span>
              </h2>
            </Reveal>
            <div className="home-stats" style={{ marginTop: 56 }}>
              <Reveal>
                <div className="home-stat">
                  <div className="home-stat-value">
                    <CountUp target={24} suffix="/7" />
                  </div>
                  <div className="home-stat-label">Continuous monitoring</div>
                </div>
              </Reveal>
              <Reveal delay={2}>
                <div className="home-stat">
                  <div className="home-stat-value">
                    <CountUp target={6} suffix="+" />
                  </div>
                  <div className="home-stat-label">Agents working at once</div>
                </div>
              </Reveal>
              <Reveal delay={3}>
                <div className="home-stat">
                  <div className="home-stat-value">
                    <CountUp target={5} />
                    <span className="home-stat-unit">Weeks</span>
                  </div>
                  <div className="home-stat-label">From audit to live system</div>
                </div>
              </Reveal>
            </div>
            <Reveal delay={2}>
              <div className="home-case-teaser">
                <div className="home-case-quote">
                  &ldquo;{caseStudies[0].testimonial.quote}&rdquo;
                </div>
                <div className="home-case-attr">
                  &mdash; {caseStudies[0].testimonial.name}, {caseStudies[0].testimonial.company}
                </div>
                <Link to="/case-studies" className="home-case-link">
                  See all case studies <ArrowRight size={18} />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        <LogoTicker />

        <CTASection
          heading="Stop being the last to know."
          subtext="Get a free AI readiness audit. We&rsquo;ll map your blind spots and show you exactly where AI closes them &mdash; in 60 minutes, no obligation."
          ctaLabel="Book My Free Audit"
        />
      </div>
    </>
  );
}