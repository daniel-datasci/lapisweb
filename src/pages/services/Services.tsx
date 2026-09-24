import Seo from '@/components/Seo';
import PageHero from '@/components/PageHero';
import InfoCards, { InfoCard } from '@/components/InfoCards';
import DarkCallout from '@/components/DarkCallout';
import CTASection from '@/components/CTASection';
import { services, lapisRun } from '@/data/services';
import { serviceIcon } from '@/data/icons';
import { breadcrumbLd, organizationLd, SITE_URL } from '@/data/site';

const DESCRIPTION = 'Four capabilities and one team that stays. The services behind every Lapis solution.';

export default function Services() {
  const cards: InfoCard[] = services.map((s) => ({
    icon: serviceIcon(s.slug),
    kicker: `Service ${s.num}`,
    title: s.headline,
    body: s.body,
    points: s.bullets,
    note: `Powers: ${s.powersLine}`,
    to: s.path,
    linkLabel: `Explore ${s.name}`,
  }));

  return (
    <>
      <Seo
        title="AI Consulting, Automation, Agentic Workflows & Infrastructure | The Lapis AI"
        description={DESCRIPTION}
        path="/services"
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Services',
            itemListElement: services.map((s, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              item: {
                '@type': 'Service',
                name: s.name,
                description: s.body,
                url: `${SITE_URL}${s.path}`,
                provider: { '@type': 'Organization', name: organizationLd.name, url: SITE_URL },
              },
            })),
          },
          breadcrumbLd([
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
          ]),
        ]}
      />

      <PageHero
        eyebrow="Services"
        text="Four capabilities, delivered and run by one team."
        splitIndex={0}
        subtext="Our solutions are built from four capabilities that work together. Most providers offer one and leave you to stitch the rest together. We deliver all four, then run what we build."
        ctaLabel=""
      />

      <section className="section section-paper">
        <div className="container">
          <InfoCards items={cards} columns={2} dark />
        </div>
      </section>

      <DarkCallout eyebrow={lapisRun.label} title={lapisRun.title} body={lapisRun.body} />

      <CTASection
        heading="Not sure which service you need?"
        subtext="You don't have to know. Start with the free audit and we'll tell you."
      />
    </>
  );
}
