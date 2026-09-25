import { Link } from 'react-router-dom';
import Seo from '@/components/Seo';
import PageHero from '@/components/PageHero';
import ResponsiveTable from '@/components/ResponsiveTable';
import Button from '@/components/Button';
import Reveal from '@/components/Reveal';
import { solutionById, solutions } from '@/data/solutions';
import { productById, productFromPrice } from '@/data/pricing';
import { DISCOVERY_CTA, discoveryLink } from '@/data/site';
import { PAGES, crumbsFor } from '@/seo/routes';
import { itemListId, itemListNode } from '@/seo/schema';
import '@/components/ContentBlocks.css';
import '@/components/PricingBlocks.css';

const crumbs = crumbsFor(PAGES.solutions);

const rows = [
  {
    quote: "I'm the bottleneck. We can't take on more without hiring.",
    id: 'capacity' as const,
    deliver:
      'AI workers for admin, operations, reporting and customer questions, each with a job description and a KPI, run and maintained by us',
    measure: 'Hours returned, in your monthly impact report',
  },
  {
    quote: "We're losing enquiries to slow replies and missed calls.",
    id: 'leads' as const,
    deliver: 'One lead desk across WhatsApp, phone, web, email and social that answers, qualifies and books',
    measure: 'Response time, bookings and revenue recovered',
  },
  {
    quote: "We've spent on AI and have little to show for it.",
    id: 'ai-spend' as const,
    deliver: 'One high-return workflow taken into production in 45 days, with governance, then run as an AI worker',
    measure: 'Workflows live and ROI on your dashboard',
  },
];

export default function Solutions() {
  return (
    <>
      <Seo
        {...PAGES.solutions}
        pageType="CollectionPage"
        crumbs={crumbs}
        mainEntityId={itemListId(PAGES.solutions.path)}
        schema={[itemListNode(PAGES.solutions.path, 'Solutions', solutions.map((s) => ({ name: s.name, path: s.path })))]}
      />

      <PageHero
        crumbs={crumbs}
        eyebrow="Solutions"
        text="Start with the problem, not the technology."
        splitIndex={0}
        subtext={`Most businesses don't need "more AI." They need more hours in the week, fewer lost customers and a return on what they've already spent. Pick the problem that costs you most: each one is solved by a Lapis product we build, run and report on every month.`}
        ctaLabel=""
      />

      <section className="section section-paper">
        <div className="container">
          <ResponsiveTable
            caption="Which Lapis solution fits your problem"
            columns={[
              { label: 'If this sounds like you…' },
              { label: 'Your solution' },
              { label: 'What we deliver' },
              { label: "How you'll know it's working" },
            ]}
            rows={rows.map((r) => {
              const s = solutionById[r.id];
              const product = productById[s.productId];
              return [
                <span className="rtable-quote">&ldquo;{r.quote}&rdquo;</span>,
                <>
                  <Link to={s.path}>
                    {s.num} {s.name}
                  </Link>
                  <span className="rtable-sub">
                    {s.product}. {productFromPrice(product)}
                  </span>
                </>,
                r.deliver,
                r.measure,
              ];
            })}
          />
          <Reveal>
            <div className="section-note">
              <p>
                Not sure which one applies? Most clients start with one and add the others. A free 30-minute discovery
                call will tell you where to begin.
              </p>
              <div className="cta-row-center">
                <Button to={discoveryLink()} variant="primary" borderWrap icon>
                  {DISCOVERY_CTA}
                </Button>
                <Button to="/pricing" variant="ghost-light">
                  See plans &amp; pricing
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
