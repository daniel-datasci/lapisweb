import { Helmet } from 'react-helmet-async';
import PageHero from '@/components/PageHero';
import IncludedGrid from '@/components/IncludedGrid';
import DarkCallout from '@/components/DarkCallout';
import CTASection from '@/components/CTASection';
import Reveal from '@/components/Reveal';
import SavingsEstimator from '@/components/SavingsEstimator';
import { UserCheck, FileText, ShieldAlert, BarChart3, MessageSquareHeart, FlaskConical } from 'lucide-react';

const heading = 'Not another chatbot. Agents that actually do the work.';

const agents = [
  { title: 'Lead Qualification', body: 'Agents that score, route, and respond to inbound leads in real time \u2014 so your team talks to the right prospect at the right moment.', icon: <UserCheck size={24} /> },
  { title: 'Document Parsing', body: 'Agents that extract structured data from contracts, invoices, and reports \u2014 eliminating manual data entry and the errors that come with it.', icon: <FileText size={24} /> },
  { title: 'Compliance Monitoring', body: 'Agents that continuously check your operations against regulatory requirements and flag issues before they become problems.', icon: <ShieldAlert size={24} /> },
  { title: 'Internal Metrics', body: 'Agents that pull from every system you use, consolidate your KPIs, and surface anomalies the moment they appear.', icon: <BarChart3 size={24} /> },
  { title: 'Customer Sentiment', body: 'Agents that monitor reviews, support tickets, and feedback channels to alert you the moment sentiment shifts.', icon: <MessageSquareHeart size={24} /> },
  { title: 'Research & Reporting', body: 'Agents that gather, synthesize, and format research into reports your team actually reads \u2014 on a schedule or on demand.', icon: <FlaskConical size={24} /> },
];

export default function AIAgents() {
  return (
    <>
      <Helmet>
        <title>AI Agents | The Lapis AI</title>
        <meta
          name="description"
          content="Custom AI systems that execute the work. Custom-built agents that handle real workflows with precision — from lead qualification and document processing to compliance monitoring and executive reporting."
        />
        <link rel="canonical" href="https://thelapisai.com.ng/services/ai-agents" />

        {/* Open Graph */}
        <meta property="og:title" content="AI Agents | The Lapis AI" />
        <meta
          property="og:description"
          content="Custom AI systems that execute the work. Custom-built agents that handle real workflows with precision — from lead qualification and document processing to compliance monitoring and executive reporting."
        />
        <meta property="og:url" content="https://thelapisai.com.ng/services/ai-agents" />
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
          name: 'AI Agents',
          provider: {
            '@type': 'Organization',
            name: 'The Lapis AI',
            url: 'https://thelapisai.com.ng',
          },
          description:
            'Custom AI systems that execute the work. Custom-built agents that handle real workflows with precision — from lead qualification and document processing to compliance monitoring and executive reporting.',
          serviceType: 'AI Agent Development',
          url: 'https://thelapisai.com.ng/services/ai-agents',
          areaServed: 'Worldwide',
        })}
      </script>

      <div>
        <PageHero
          eyebrow="AI Agents"
          text={heading}
          splitIndex={23}
          subtext="Custom-built agents that handle real workflows, not chat windows. They connect to your systems, run on reliable infrastructure, and do the work your team doesn't have time for."
          ctaLabel="Book a Free Readiness Audit"
        />

        <section className="section section-paper">
          <div className="container">
            <Reveal>
              <span className="eyebrow">Example Agents</span>
              <h2 className="section-title">
                Six agents we build <span className="accent">that replace real work.</span>
              </h2>
              <p className="section-intro">
                These aren't demos. They're production systems connected to your data, running on
                infrastructure that doesn't break.
              </p>
            </Reveal>
            <div className="grid grid-3" style={{ marginTop: 56 }}>
              {agents.map((a, i) => (
                <Reveal key={a.title} delay={((i % 3) + 1) as 1 | 2 | 3}>
                  <div className="card">
                    <span className="card-icon">{a.icon}</span>
                    <h3 className="card-title">{a.title}</h3>
                    <p className="card-body">{a.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <SavingsEstimator
          subtitle="Every agent we build replaces hours of manual work. Model your current operational spend to see what automation could return."
          laborSavingsRate={0.65}
          toolSavingsRate={0.35}
          analyticsSavingsRate={0.60}
          growthRate={0.05}
        />

        <DarkCallout
          eyebrow="Why Custom, Not Off-the-Shelf"
          title="Generic tools solve generic problems. Your workflows aren't generic."
          body="Off-the-shelf AI tools work for common tasks. The moment your workflow has a specific data source, a specific decision logic, or a specific output format your team relies on, the generic tool starts fighting you. Custom agents are slower to start and exact to fit \u2014 they do precisely what your workflow needs, connected to precisely your systems."
        />

        <CTASection
          heading="Stop paying for tools that almost fit."
          subtext="Tell us the workflow you want automated. We&rsquo;ll tell you whether an agent can do it \u2014 honestly."
          ctaLabel="Book My Free Audit"
        />
      </div>
    </>
  );
}