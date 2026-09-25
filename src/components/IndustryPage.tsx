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
import { aiWorkforce, leadDesk, productFromPrice, workerEssentials } from '@/data/pricing';
import { pillarTag, solutions } from '@/data/solutions';
import NotFound from '@/pages/NotFound';
import { DISCOVERY_CTA, discoveryLink } from '@/data/site';
import { PAGES, crumbsFor, industryMeta } from '@/seo/routes';
import { offersFor, serviceId, serviceNode } from '@/seo/schema';
import './PricingBlocks.css';

const OFFERS = {
  'lead-desk': {
    product: leadDesk,
    topic: 'leads',
    title: 'Never miss another enquiry.',
    intro:
      'Lapis Lead Desk answers, qualifies and books every enquiry in under 60 seconds, day and night. We run it for you and show you what it recovered every month.',
    points: [
      'Every enquiry answered in under 60 seconds, 24/7',
      'Leads qualified and booked into your calendar or CRM',
      'A monthly lead report, in plain numbers',
      "Miss the response-time SLA in a month, and that month's fee is credited",
    ],
    plansLabel: 'See Lead Desk plans',
  },
  'ai-workforce': {
    product: aiWorkforce,
    topic: 'capacity',
    title: 'AI workers for the work that slows you down.',
    intro:
      'Lapis AI Workforce gives you AI workers that take repetitive work off your team, run by us under an SLA, so your people can move to higher-value work.',
    points: workerEssentials.map((e) => `${e.title}: ${e.text}`),
    plansLabel: 'See AI Workforce plans',
  },
} as const;

export default function IndustryPage() {
  const { slug } = useParams();
  const industry = industryBySlug(slug);
  if (!industry) return <NotFound />;

  const meta = industryMeta(industry);
  const crumbs = crumbsFor(PAGES.industries, meta);

  const study = caseStudyBySlug(industry.caseStudySlug);
  const offer = OFFERS[industry.offer];
  const ctaTo = discoveryLink(offer.topic, offer.product.plan);

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
            offers: offersFor(industry.offer),
          }),
        ]}
      />

      <PageHero
        crumbs={crumbs}
        eyebrow={`Industries · ${industry.name}`}
        text={industry.heroHeading}
        splitIndex={0}
        subtext={industry.heroSub}
        ctaTo={ctaTo}
        secondaryLabel={offer.plansLabel}
        secondaryTo={`/pricing#${offer.product.anchor}`}
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
            <div className="offer-box">
              <span className="eyebrow">{offer.product.name}</span>
              <h2 className="section-title">{offer.title}</h2>
              <p className="section-intro">{offer.intro}</p>
              <p className="product-price">{productFromPrice(offer.product)}</p>
              <ul className="check-list offer-list">
                {offer.points.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <div className="cta-row-center">
                <Button to={ctaTo} variant="primary" size="lg" borderWrap icon>
                  {DISCOVERY_CTA}
                </Button>
                <Button to={`/pricing#${offer.product.anchor}`} variant="ghost-light" size="lg">
                  {offer.plansLabel}
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection
        heading="Find out where your business is leaking time, leads and money."
        subtext="Book a free 30-minute discovery call. We'll talk through where AI workers would help most, and which plan fits, whether or not you work with us."
        ctaTo={ctaTo}
      />
    </>
  );
}
