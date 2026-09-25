import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import Seo from '@/components/Seo';
import PageHero from '@/components/PageHero';
import SectionHeading from '@/components/SectionHeading';
import DarkCallout from '@/components/DarkCallout';
import CTASection from '@/components/CTASection';
import Reveal from '@/components/Reveal';
import StackDiagram from '@/components/StackDiagram';
import InfoCards from '@/components/InfoCards';
import FaqSection from '@/components/FaqList';
import RelatedLinks from '@/components/RelatedLinks';
import { AuditOffer } from '@/components/PricingBlocks';
import NotFound from '@/pages/NotFound';
import { programmeIcon } from '@/data/icons';
import { serviceBySlug, lapisRun, ServiceSlug } from '@/data/services';
import { solutionById } from '@/data/solutions';
import { caseStudies } from '@/data/testimonials';
import { serviceFaqs } from '@/data/faqs';
import { caseStudyLink } from '@/data/related';
import type { ContactTopic } from '@/data/site';
import { PAGES, crumbsFor, serviceMeta } from '@/seo/routes';
import { offersFor, serviceId, serviceNode, type OfferGroup } from '@/seo/schema';

const SERVICE_OFFERS: Record<ServiceSlug, OfferGroup[]> = {
  'ai-consulting': ['audit', 'fractional-head-of-ai'],
  'ai-automation': ['ai-workforce'],
  'agentic-workflows': ['lead-desk', 'ai-workforce', 'market-watch'],
  'ai-infrastructure': [],
  'ai-analytics-training': ['workshop'],
};

const AUDIT_TOPIC: Partial<Record<ServiceSlug, ContactTopic>> = {
  'ai-consulting': 'ai-spend',
  'ai-automation': 'capacity',
  'ai-analytics-training': 'training',
};

export default function ServiceDetail({ slug }: { slug: ServiceSlug }) {
  const service = serviceBySlug[slug];
  if (!service) return <NotFound />;

  const meta = serviceMeta(service);
  const crumbs = crumbsFor(PAGES.services, meta);
  const faqs = serviceFaqs[slug];
  const { programmes, heroCta } = service;
  const callout = service.callout ?? lapisRun;
  const { delivery } = service;
  const offers = offersFor(...SERVICE_OFFERS[slug]);

  const powers = service.powers.map((id) => {
    const s = solutionById[id];
    return {
      kicker: `${s.num} ${s.theme}`,
      title: s.name,
      body: s.body,
      to: s.path,
      linkLabel: s.linkLabel,
    };
  });

  const related = caseStudies.filter((c) => service.powers.includes(c.pillar)).map(caseStudyLink);

  return (
    <>
      <Seo
        {...meta}
        crumbs={crumbs}
        faqs={faqs}
        mainEntityId={serviceId(meta.path)}
        schema={[
          serviceNode({
            path: meta.path,
            name: service.name,
            description: service.body,
            serviceType: service.name,
            audience: 'Growing businesses',
            offers: offers.length ? offers : undefined,
          }),
        ]}
      />

      <PageHero
        crumbs={crumbs}
        eyebrow={`Service ${service.num} · ${service.name}`}
        text={service.headline}
        splitIndex={0}
        subtext={service.body}
        ctaLabel={heroCta?.label}
        ctaTo={heroCta?.to}
        secondaryLabel={heroCta?.secondaryLabel}
        secondaryTo={heroCta?.secondaryHash ? `${service.path}#${heroCta.secondaryHash}` : undefined}
      >
        {slug === 'ai-infrastructure' && <StackDiagram />}
      </PageHero>

      {programmes ? (
        <section className="section section-dark" id="programmes">
          <div className="container">
            <SectionHeading eyebrow="The programmes" />
            <div className="section-body">
              <InfoCards
                columns={3}
                dark
                items={programmes.map((p, i) => ({
                  icon: programmeIcon(i),
                  kicker: `Programme ${i + 1}`,
                  title: p.title,
                  body: p.body,
                  points: p.points,
                }))}
              />
            </div>
          </div>
        </section>
      ) : (
        <section className="section section-dark">
          <div className="container">
            <SectionHeading eyebrow="What's included" />
            <ul className="check-rows section-body">
              {service.bullets.map((b, i) => (
                <Reveal as="li" key={b} delay={((i % 2) + 1) as 1 | 2} className="check-row">
                  <span className="check-row-icon" aria-hidden="true">
                    <Check size={16} strokeWidth={2.5} />
                  </span>
                  <span>{b}</span>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="section section-paper">
        <div className="container">
          <SectionHeading eyebrow="Powers" intro={service.powersLine} center />
          <div className="section-body powers-grid">
            {powers.map((p, i) => (
              <Reveal key={p.title} delay={(i + 1) as 1 | 2 | 3}>
                <Link to={p.to} className="card card-dark pillar-card">
                  <span className="card-kicker">{p.kicker}</span>
                  <h3 className="card-title-light">{p.title}</h3>
                  <p className="card-body-light">{p.body}</p>
                  <span className="pillar-link">
                    {p.linkLabel} <ArrowRight size={16} aria-hidden="true" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark" id="pricing">
        <div className="container">
          <SectionHeading
            eyebrow="How it's delivered & priced"
            title={delivery.title}
            accent={delivery.accent}
            intro={delivery.body}
          />
          <div className="section-body">
            <InfoCards
              columns={delivery.items.length === 2 ? 2 : 3}
              dark
              items={delivery.items.map((d) => ({
                kicker: d.kicker,
                title: d.title,
                body: d.body,
                note: d.price,
                to: d.to,
                linkLabel: d.linkLabel,
              }))}
            />
          </div>
        </div>
      </section>

      <section className="section section-paper">
        <div className="container">
          <AuditOffer topic={AUDIT_TOPIC[slug]} />
        </div>
      </section>

      <DarkCallout eyebrow={callout.label} title={callout.title} body={callout.body} />

      <FaqSection items={faqs} title={`${service.name}:`} accent="your questions answered." />

      <RelatedLinks eyebrow="See it working" title="Real systems." accent="Measured results." items={related} />

      {service.cta ? (
        <CTASection
          heading={service.cta.heading}
          subtext={service.cta.subtext}
          ctaLabel={service.cta.label}
          ctaTo={service.cta.to}
        />
      ) : (
        <CTASection
          heading="Find out where your business is leaking time, leads and money."
          subtext="Book a free 30-minute discovery call. We'll talk through where AI could help and which plan, if any, fits your business."
        />
      )}
    </>
  );
}
