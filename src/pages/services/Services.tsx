import Seo from '@/components/Seo';
import PageHero from '@/components/PageHero';
import InfoCards, { InfoCard } from '@/components/InfoCards';
import DarkCallout from '@/components/DarkCallout';
import CTASection from '@/components/CTASection';
import { services, lapisRun } from '@/data/services';
import { serviceIcon } from '@/data/icons';
import { PAGES, crumbsFor } from '@/seo/routes';
import { itemListId, itemListNode } from '@/seo/schema';

const crumbs = crumbsFor(PAGES.services);

export default function Services() {
  const cards: InfoCard[] = services.map((s) => ({
    icon: serviceIcon(s.slug),
    kicker: `Service ${s.num}`,
    title: s.headline,
    body: s.body,
    points: s.bullets,
    note: `${s.delivery.short} Powers: ${s.powersLine}.`,
    to: s.path,
    linkLabel: `Explore ${s.name}`,
  }));

  return (
    <>
      <Seo
        {...PAGES.services}
        pageType="CollectionPage"
        crumbs={crumbs}
        mainEntityId={itemListId(PAGES.services.path)}
        schema={[itemListNode(PAGES.services.path, 'Services', services.map((s) => ({ name: s.name, path: s.path })))]}
      />

      <PageHero
        crumbs={crumbs}
        eyebrow="Services"
        text="Five capabilities, delivered and run by one team."
        splitIndex={0}
        subtext="Five capabilities sit behind every AI worker we run. You don't buy them one by one: they're delivered through Lapis Lead Desk, Lapis AI Workforce and the 45-Day AI Rescue, and run by the same team every month."
        ctaLabel=""
      />

      <section className="section section-paper">
        <div className="container">
          <InfoCards items={cards} columns={2} dark className="services-grid" />
        </div>
      </section>

      <DarkCallout eyebrow={lapisRun.label} title={lapisRun.title} body={lapisRun.body} />

      <CTASection
        heading="Not sure which service you need?"
        subtext="You don't have to know. Book a free 30-minute discovery call and we'll tell you where to start."
        secondaryLabel="See plans & pricing"
        secondaryTo="/pricing"
      />
    </>
  );
}
