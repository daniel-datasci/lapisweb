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
import { DISCOVERY_CTA, discoveryLink } from '@/data/site';
import { useHydrated } from '@/hooks/useHydrated';
import { PAGES, caseStudyMeta, crumbsFor } from '@/seo/routes';
import { itemListId, itemListNode } from '@/seo/schema';
import '@/components/PricingBlocks.css';

const crumbs = crumbsFor(PAGES.caseStudies);

type Filter = 'all' | PillarId;

const isFilter = (v: string | null): v is Filter => pillarFilters.some((f) => f.value === v);

export default function CaseStudies() {
  const [params, setParams] = useSearchParams();
  // The static HTML lists every case study; the filter from the URL applies after hydration.
  const hydrated = useHydrated();
  const raw = hydrated ? params.get('pillar') : null;
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
        {...PAGES.caseStudies}
        pageType="CollectionPage"
        crumbs={crumbs}
        mainEntityId={itemListId(PAGES.caseStudies.path)}
        schema={[
          itemListNode(
            PAGES.caseStudies.path,
            'Case studies',
            caseStudies.map((c) => ({ name: c.title, path: caseStudyMeta(c).path })),
          ),
        ]}
      />

      <PageHero
        crumbs={crumbs}
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
                  <CaseCard study={cs} headingAs="h2" />
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal>
              <div className="card empty-state">
                <span className="card-kicker">③ Make Your AI Pay</span>
                <h2 className="card-title">No published case study for this one yet.</h2>
                <p className="card-body">
                  We only publish results we've measured. The 45-Day AI Rescue takes one stalled AI project into
                  production in 45 days, or we keep working free until it's live. Start with a free discovery call.
                </p>
                <div className="cta-row-center">
                  <Button to={discoveryLink('ai-spend', 'ai-rescue')} variant="primary" size="lg" borderWrap icon>
                    {DISCOVERY_CTA}
                  </Button>
                  <Button to="/solutions/make-your-ai-pay" variant="ghost-light" size="lg">
                    See the 45-Day AI Rescue
                  </Button>
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      <CTASection
        heading="Want results like these?"
        subtext="Every engagement starts with a free 30-minute discovery call. We'll talk through where you're leaking time, leads and money, and which AI workers would fix it."
      />
    </>
  );
}
