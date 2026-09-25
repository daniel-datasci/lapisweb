import { Link, useParams } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Seo from '@/components/Seo';
import PageHero from '@/components/PageHero';
import SectionHeading from '@/components/SectionHeading';
import PainList from '@/components/PainList';
import InfoCards, { InfoCard } from '@/components/InfoCards';
import CaseCard from '@/components/CaseCard';
import CTASection from '@/components/CTASection';
import Button from '@/components/Button';
import Reveal from '@/components/Reveal';
import { industryBySlug } from '@/data/industries';
import { caseStudyBySlug } from '@/data/testimonials';
import { pricingTiers } from '@/data/pricing';
import { pillarTag, solutions } from '@/data/solutions';
import NotFound from '@/pages/NotFound';
import { auditLink } from '@/data/site';
import { PAGES, crumbsFor, industryMeta } from '@/seo/routes';
import { serviceId, serviceNode } from '@/seo/schema';

const freeAudit = pricingTiers[0];

export default function IndustryPage() {
  const { slug } = useParams();
  const industry = industryBySlug(slug);
  if (!industry) return <NotFound />;

  const meta = industryMeta(industry);
  const crumbs = crumbsFor(PAGES.industries, meta);

  const study = caseStudyBySlug(industry.caseStudySlug);
  const leadLeak = industry.offer === 'lead-leak';

  const pains = solutions.map((s) => ({ tag: pillarTag(s.id), text: industry.pains[s.id] }));
  const deploy: InfoCard[] = solutions.map((s) => ({
    kicker: `${s.num} ${s.theme}`,
    title: s.name,
    body: industry.deploy[s.id],
    to: s.path,
    linkLabel: s.linkLabel,
  }));

  return (
    <>
      <Seo
        {...meta}
        crumbs={crumbs}
        mainEntityId={serviceId(meta.path)}
        schema={[
          serviceNode({
            path: meta.path,
            name: `AI automation and AI agents for ${industry.name}`,
            description: industry.metaDescription,
            serviceType: 'AI automation and AI agents',
            audience: industry.examples ?? industry.name,
          }),
        ]}
      />

      <PageHero
        crumbs={crumbs}
        eyebrow={`Industries · ${industry.name}`}
        text={industry.heroHeading}
        splitIndex={0}
        subtext={industry.heroSub}
        ctaLabel={leadLeak ? 'Get a Free Lead Leak Audit' : 'Book My Free AI Audit'}
        ctaTo={leadLeak ? auditLink('leads') : '/contact'}
      />

      <section className="section section-paper">
        <div className="container">
          <SectionHeading eyebrow="The problem" title="Sound familiar?" />
          <div className="section-body">
            <PainList items={pains} columns={3} />
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container">
          <SectionHeading eyebrow="What we deploy" title="How we fix it." />
          <div className="section-body">
            <InfoCards items={deploy} columns={3} dark />
          </div>
        </div>
      </section>

      <section className="section section-paper">
        <div className="container">
          <SectionHeading eyebrow="Case study" />
          <div className="section-body industry-case">
            {study ? (
              <Reveal>
                <CaseCard study={study} />
              </Reveal>
            ) : (
              <Reveal>
                <div className="card empty-state">
                  <p className="card-body">
                    We haven't published a {industry.matrixName.toLowerCase()} case study yet. See the systems we've built and
                    the results they delivered in other industries.
                  </p>
                  <Link to="/case-studies" className="pillar-link">
                    See all case studies <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container">
          <Reveal>
            {leadLeak ? (
              <div className="offer-box">
                <span className="eyebrow">Free Lead Leak Audit</span>
                <h2 className="section-title">See what you're missing, free.</h2>
                <p className="section-intro">
                  We'll review your enquiry channels and show you how many leads went unanswered, how long replies took
                  and what that likely cost you. If it doesn't change how you handle leads, you owe nothing.
                </p>
                <Button to={auditLink('leads')} variant="primary" size="lg" borderWrap icon>
                  Get a Free Lead Leak Audit
                </Button>
              </div>
            ) : (
              <div className="offer-box">
                <span className="eyebrow">
                  {freeAudit.name} · {freeAudit.price}
                </span>
                <h2 className="section-title">{freeAudit.tagline}</h2>
                <ul className="check-list offer-list">
                  {freeAudit.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <Button to="/contact" variant="primary" size="lg" borderWrap icon>
                  Book My Free AI Audit
                </Button>
              </div>
            )}
          </Reveal>
        </div>
      </section>

      <CTASection
        heading="Find out where your business is leaking time, leads and money."
        subtext="A free 60-minute AI audit. You leave with a written roadmap of your top three opportunities, whether or not you work with us."
      />
    </>
  );
}
