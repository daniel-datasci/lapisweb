import { useSearchParams } from 'react-router-dom';
import Seo from '@/components/Seo';
import PageHero from '@/components/PageHero';
import CTASection from '@/components/CTASection';
import Reveal from '@/components/Reveal';
import Button from '@/components/Button';
import CaseCard from '@/components/CaseCard';
import FilterChips from '@/components/FilterChips';
import { caseStudies } from '@/data/testimonials';
import { pillarFilters, type PillarId } from '@/data/solutions';
import { auditLink, breadcrumbLd, SITE_URL } from '@/data/site';

type Filter = 'all' | PillarId;

const isFilter = (v: string | null): v is Filter => pillarFilters.some((f) => f.value === v);

export default function CaseStudies() {
  const [params, setParams] = useSearchParams();
  const raw = params.get('pillar');
  const filter: Filter = isFilter(raw) ? raw : 'all';
  const visible = filter === 'all' ? caseStudies : caseStudies.filter((c) => c.pillar === filter);

  const onChange = (value: Filter) => {
    const next = new URLSearchParams(params);
    if (value === 'all') next.delete('pillar');
    else next.set('pillar', value);
    setParams(next, { replace: true, preventScrollReset: true });
  };

  return (
    <>
      <Seo
        title="Case Studies | The Lapis AI"
        description="Real systems and measured results: hours returned, revenue recovered and AI that pays."
        path="/case-studies"
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Case Studies | The Lapis AI',
            url: `${SITE_URL}/case-studies`,
            hasPart: caseStudies.map((c) => ({
              '@type': 'Article',
              headline: c.title,
              url: `${SITE_URL}/case-studies/${c.slug}`,
            })),
          },
          breadcrumbLd([
            { name: 'Home', path: '/' },
            { name: 'Case Studies', path: '/case-studies' },
          ]),
        ]}
      />

      <PageHero
        eyebrow="Case studies"
        text="Real systems. Measured results."
        splitIndex={0}
        subtext="We don't sell theory. These are systems we've built and still run, the problems they solved and the numbers they moved. Filter by the problem you want to fix."
        ctaLabel=""
      >
        <div className="hero-filters fade-up" style={{ animationDelay: '1.8s' }}>
          <FilterChips options={pillarFilters} value={filter} onChange={onChange} label="Filter case studies by problem" />
        </div>
      </PageHero>

      <section className="section section-paper" aria-live="polite">
        <div className="container">
          {visible.length > 0 ? (
            <div className="case-grid">
              {visible.map((cs, i) => (
                <Reveal key={cs.slug} delay={((i % 3) + 1) as 1 | 2 | 3}>
                  <CaseCard study={cs} />
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal>
              <div className="card empty-state">
                <span className="card-kicker">③ Make Your AI Pay</span>
                <h2 className="card-title">No published case study for this one yet.</h2>
                <p className="card-body">
                  We only publish results we've measured. Book a free AI spend audit. We'll tell you honestly what's
                  working, what isn't, and which one workflow will pay for the rest.
                </p>
                <Button to={auditLink('ai-spend')} variant="primary" size="lg" borderWrap icon>
                  Book My Free AI Spend Audit
                </Button>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      <CTASection
        heading="Want results like these?"
        subtext="Every engagement starts with a free audit. We'll show you where you're leaking time, leads and money, and what fixing it is worth."
      />
    </>
  );
}
