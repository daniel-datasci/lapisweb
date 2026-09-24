import { Link, Navigate } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import Seo from '@/components/Seo';
import PageHero from '@/components/PageHero';
import SectionHeading from '@/components/SectionHeading';
import DarkCallout from '@/components/DarkCallout';
import CTASection from '@/components/CTASection';
import Reveal from '@/components/Reveal';
import StackDiagram from '@/components/StackDiagram';
import InfoCards from '@/components/InfoCards';
import { programmeIcon } from '@/data/icons';
import { serviceBySlug, lapisRun, ServiceSlug } from '@/data/services';
import { solutionById } from '@/data/solutions';
import { breadcrumbLd, serviceLd } from '@/data/site';

export default function ServiceDetail({ slug }: { slug: ServiceSlug }) {
  const service = serviceBySlug[slug];
  if (!service) return <Navigate to="/services" replace />;

  const { programmes, heroCta } = service;
  const callout = service.callout ?? lapisRun;

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

  return (
    <>
      <Seo
        title={service.seoTitle}
        description={service.body}
        path={service.path}
        jsonLd={[
          serviceLd(service.name, service.body, service.path),
          breadcrumbLd([
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
            { name: service.name, path: service.path },
          ]),
        ]}
      />

      <PageHero
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

      <DarkCallout eyebrow={callout.label} title={callout.title} body={callout.body} />

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
          subtext="A free 60-minute AI audit. You leave with a written roadmap of your top three opportunities, whether or not you work with us."
        />
      )}
    </>
  );
}
