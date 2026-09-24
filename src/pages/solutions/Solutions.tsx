import { Link } from 'react-router-dom';
import Seo from '@/components/Seo';
import PageHero from '@/components/PageHero';
import ResponsiveTable from '@/components/ResponsiveTable';
import Button from '@/components/Button';
import Reveal from '@/components/Reveal';
import { solutionById } from '@/data/solutions';
import { breadcrumbLd } from '@/data/site';
import '@/components/ContentBlocks.css';

const rows = [
  {
    quote: "I'm the bottleneck. We can't take on more without hiring.",
    id: 'capacity' as const,
    deliver:
      'Automations and AI agents for admin, operations, reporting and customer questions, run and maintained by us',
    measure: 'Hours returned each month',
  },
  {
    quote: "We're losing enquiries to slow replies and missed calls.",
    id: 'leads' as const,
    deliver: 'One response system across WhatsApp, phone, web, email and social that answers, qualifies and books',
    measure: 'Response time, bookings and revenue recovered',
  },
  {
    quote: "We've spent on AI and have little to show for it.",
    id: 'ai-spend' as const,
    deliver: 'An audit of your AI spend, then one high-return workflow in production in 45 days, with governance',
    measure: 'Workflows live and ROI on your dashboard',
  },
];

export default function Solutions() {
  return (
    <>
      <Seo
        title="Solutions | The Lapis AI"
        description="Grow without hiring, never miss a lead, and make your AI investment pay. Three problems, one team that builds and runs the fix."
        path="/solutions"
        jsonLd={breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'Solutions', path: '/solutions' },
        ])}
      />

      <PageHero
        eyebrow="Solutions"
        text="Start with the problem, not the technology."
        splitIndex={0}
        subtext={`Most businesses don't need "more AI." They need more hours in the week, fewer lost customers and a return on what they've already spent. Pick the problem that costs you most, and we'll show you how we fix it.`}
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
              return [
                <span className="rtable-quote">&ldquo;{r.quote}&rdquo;</span>,
                <Link to={s.path}>
                  {s.num} {s.name}
                </Link>,
                r.deliver,
                r.measure,
              ];
            })}
          />
          <Reveal>
            <div className="section-note">
              <p>
                Not sure which one applies? Most clients start with one and add the others. The free audit tells you
                where to begin.
              </p>
              <Button to="/contact" variant="primary" borderWrap icon>
                Book My Free AI Audit
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
