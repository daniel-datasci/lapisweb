import { Helmet } from 'react-helmet-async';
import PageHero from '@/components/PageHero';
import IncludedGrid from '@/components/IncludedGrid';
import DarkCallout from '@/components/DarkCallout';
import CTASection from '@/components/CTASection';
import Reveal from '@/components/Reveal';
import SavingsEstimator from '@/components/SavingsEstimator';
import { Database, Plug, Cpu, LayoutDashboard } from 'lucide-react';
import './AIInfrastructure.css';

const heading = 'Most pilots fail because the infrastructure underneath them is missing.';

const included = [
  { title: 'Data Pipelines', body: 'We build the extraction, cleaning, and consolidation pipelines that turn your fragmented data into one reliable source an AI can actually use.' },
  { title: 'System Integrations', body: 'We connect your CRM, billing, analytics, PMS, MLS, and monitoring agents into a unified system \u2014 each integration built, secured, and maintained.' },
  { title: 'Model Orchestration', body: 'We orchestrate your AI models \u2014 calling them in the right order, with fallbacks and evaluation loops, so outputs are trustworthy and consistent.' },
  { title: 'Custom Dashboards', body: 'We build dashboards your team actually uses \u2014 fed by live data, designed for the decisions you make, not the metrics that look impressive in a demo.' },
  { title: 'Evaluation & Monitoring', body: 'We don\u2019t just deploy and walk away. We monitor your systems for accuracy, drift, and uptime \u2014 so they keep working after launch.' },
  { title: 'Security & Governance', body: 'We build access control, audit logging, and data governance into every layer \u2014 so your AI systems are safe to rely on.' },
];

const stack = [
  { icon: <LayoutDashboard size={24} />, label: 'Dashboard', desc: 'What your team sees', layer: 4 },
  { icon: <Cpu size={24} />, label: 'Model Orchestration', desc: 'AI models, coordinated', layer: 3 },
  { icon: <Plug size={24} />, label: 'Integrations', desc: 'Connected systems', layer: 2 },
  { icon: <Database size={24} />, label: 'Data Pipelines', desc: 'Clean, reliable inputs', layer: 1 },
];

export default function AIInfrastructure() {
  return (
    <>
      <Helmet>
        <title>AI Infrastructure | The Lapis AI</title>
        <meta
          name="description"
          content="The foundation under reliable intelligence. The data pipelines, integrations, and orchestration layers that make custom AI systems dependable, accurate, and ready for production use."
        />
        <link rel="canonical" href="https://thelapisai.com.ng/services/ai-infrastructure" />

        {/* Open Graph */}
        <meta property="og:title" content="AI Infrastructure | The Lapis AI" />
        <meta
          property="og:description"
          content="The foundation under reliable intelligence. The data pipelines, integrations, and orchestration layers that make custom AI systems dependable, accurate, and ready for production use."
        />
        <meta property="og:url" content="https://thelapisai.com.ng/services/ai-infrastructure" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://thelapisai.com.ng/og-back.png" />
        <meta property="og:site_name" content="The Lapis AI" />
        <meta property="og:locale" content="en_NG" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://thelapisai.com.ng/og-back.png" />
      </Helmet>

      {/* Service structured data */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'AI Infrastructure',
          provider: {
            '@type': 'Organization',
            name: 'The Lapis AI',
            url: 'https://thelapisai.com.ng',
          },
          description:
            'The data pipelines, integrations, and orchestration layers that make custom AI systems dependable, accurate, and ready for production use.',
          serviceType: 'AI Infrastructure',
          url: 'https://thelapisai.com.ng/services/ai-infrastructure',
          areaServed: 'Worldwide',
        })}
      </script>

      <div>
        <PageHero
          eyebrow="AI Infrastructure"
          text={heading}
          splitIndex={54}
          subtext="The data pipelines, integrations, orchestration, and dashboards that make systems reliable, accurate, and production-grade."
          ctaLabel="Book a Free Readiness Audit"
        >
          {/* Stack diagram */}
          <div className="stack-diagram fade-up" style={{ animationDelay: '2s' }}>
            {stack.map((s) => (
              <div key={s.label} className={`stack-layer stack-layer-${s.layer}`}>
                <span className="stack-layer-icon">{s.icon}</span>
                <div className="stack-layer-text">
                  <span className="stack-layer-label">{s.label}</span>
                  <span className="stack-layer-desc">{s.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </PageHero>

        <section className="section section-paper">
          <div className="container">
            <Reveal>
              <span className="eyebrow">What&rsquo;s Included</span>
              <h2 className="section-title">
                The four layers <span className="accent">under every smart system.</span>
              </h2>
              <p className="section-intro">
                Skip any layer and the whole thing collapses. We build all of them.
              </p>
            </Reveal>
            <IncludedGrid items={included} className="included-grid-equal" />
          </div>
        </section>

        <SavingsEstimator
          subtitle="Solid infrastructure doesn't just prevent outages, it compounds. Model your current tooling and data spend to see what a unified AI stack could save."
          laborSavingsRate={0.40}
          toolSavingsRate={0.45}
          analyticsSavingsRate={0.50}
          growthRate={0.06}
        />

        <DarkCallout
          eyebrow="Why This Matters"
          title="The dashboard is the easy part. It&rsquo;s the three layers below it that fail."
          body="Most AI pilots build the dashboard and ignore the infrastructure underneath. It looks impressive in the demo. Then someone asks where the data comes from, and the answer is we&rsquo;re not sure. We build from the bottom up - pipelines first, orchestration second, dashboard last - so the system you rely on is the system that actually works."
        />

        <CTASection
          heading="Build the foundation before the dashboard."
          subtext="If your AI pilot stalled, the infrastructure is why. Let&rsquo;s fix it."
          ctaLabel="Book My Free Audit"
        />
      </div>
    </>
  );
}