import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Bell,
  Briefcase,
  GitCommit,
  Layers,
  LayoutDashboard,
  Newspaper,
  ShieldCheck,
  Tag,
  type LucideIcon,
} from 'lucide-react';
import Seo from '@/components/Seo';
import PageHero from '@/components/PageHero';
import CTASection from '@/components/CTASection';
import Photo from '@/components/Photo';
import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';
import Sparkle from '@/components/Sparkle';
import StatGrid from '@/components/StatGrid';
import QuoteGrid from '@/components/QuoteGrid';
import { caseStudyBySlug } from '@/data/testimonials';
import { pillarTag, solutionById } from '@/data/solutions';
import RelatedLinks, { type RelatedLink } from '@/components/RelatedLinks';
import NotFound from '@/pages/NotFound';
import { industries } from '@/data/industries';
import { blogPosts } from '@/data/blog';
import { lowerCase, postLink } from '@/data/related';
import { absoluteUrl } from '@/data/site';
import { ogImagePath } from '@/seo/og';
import { PAGES, caseStudyMeta, crumbsFor } from '@/seo/routes';
import { orgRef, serviceId, webpageId } from '@/seo/schema';
import './CaseStudyDetail.css';

type FlowNode = { label: string; Icon: LucideIcon };

/** The market watch workflow from the SaaS case study: what the agents watch, check and deliver. */
const MARKET_WATCH: { stage: string; nodes: FlowNode[] }[] = [
  {
    stage: 'Watching',
    nodes: [
      { label: 'Pricing pages', Icon: Tag },
      { label: 'Feature pages', Icon: Layers },
      { label: 'Changelogs', Icon: GitCommit },
      { label: 'Hiring signals', Icon: Briefcase },
    ],
  },
  {
    stage: 'Checking',
    nodes: [
      { label: 'Verifier', Icon: ShieldCheck },
      { label: 'Alert engine', Icon: Bell },
    ],
  },
  {
    stage: 'Delivering',
    nodes: [
      { label: 'Weekly brief', Icon: Newspaper },
      { label: 'Dashboard', Icon: LayoutDashboard },
    ],
  },
];

function SystemFlow() {
  return (
    <div className="system-flow">
      <div className="system-flow-bg" aria-hidden="true">
        <Photo name="forest-mist" sizes="(max-width: 1100px) 100vw, 1200px" />
      </div>
      <div className="system-flow-panel">
        <div className="system-flow-head">
          <span className="system-flow-count">6+</span>
          <span className="system-flow-caption">
            Agents watching, <span className="system-flow-live">24/7</span>
          </span>
        </div>
        <ol className="system-flow-stages">
          {MARKET_WATCH.map((s, i) => (
            <li key={s.stage} className="system-flow-stage">
              <span className="system-flow-stage-label">
                <Sparkle size={11} /> 0{i + 1} · {s.stage}
              </span>
              <ul className="system-flow-nodes">
                {s.nodes.map(({ label, Icon }) => (
                  <li key={label} className="system-flow-node">
                    <span className="system-flow-icon" aria-hidden="true">
                      <Icon size={16} strokeWidth={1.6} />
                    </span>
                    {label}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default function CaseStudyDetail() {
  const { slug } = useParams<{ slug: string }>();
  const study = caseStudyBySlug(slug);

  if (!study) return <NotFound />;

  const solution = solutionById[study.pillar];
  const meta = caseStudyMeta(study);
  const path = meta.path;
  const crumbs = crumbsFor(PAGES.caseStudies, meta);
  const articleId = `${absoluteUrl(path)}#article`;
  const industry = industries.find((i) => i.caseStudySlug === study.slug);
  const latestPost = [...blogPosts]
    .filter((p) => p.category === study.pillar)
    .sort((a, b) => b.date.localeCompare(a.date))[0];

  const related: RelatedLink[] = [
    ...(industry
      ? [
          {
            kicker: `Industry · ${industry.name}`,
            title: industry.heroHeading,
            body: industry.heroSub,
            to: industry.path,
            linkLabel: `AI for ${lowerCase(industry.name)}`,
          },
        ]
      : []),
    {
      kicker: `Solution ${solution.num} · ${solution.theme}`,
      title: solution.name,
      body: solution.body,
      to: solution.path,
      linkLabel: solution.linkLabel,
    },
    ...(latestPost ? [postLink(latestPost)] : []),
  ];

  return (
    <>
      <Seo
        {...meta}
        crumbs={crumbs}
        article={{ section: 'Case studies' }}
        mainEntityId={articleId}
        schema={[
          {
            '@type': 'Article',
            '@id': articleId,
            headline: study.title,
            description: meta.description,
            url: absoluteUrl(path),
            mainEntityOfPage: { '@id': webpageId(path) },
            image: absoluteUrl(ogImagePath(path)),
            author: orgRef,
            publisher: orgRef,
            articleSection: 'Case studies',
            inLanguage: 'en',
            about: [
              { '@type': 'Thing', name: study.industry },
              { '@id': serviceId(solution.path), name: solution.name },
            ],
          },
        ]}
      />

      <PageHero
        crumbs={crumbs}
        image="hero-cases"
        eyebrow={`Case study · ${study.industry}`}
        text={study.title}
        splitIndex={0}
        subtext={study.client}
        ctaLabel=""
      >
        <div className="case-hero-meta fade-up" style={{ animationDelay: '0.3s' }}>
          <Link to={solution.path} className="case-pillar-tag">
            {pillarTag(study.pillar)}
          </Link>
          <Link to="/case-studies" className="case-back">
            <ArrowLeft size={16} aria-hidden="true" /> All case studies
          </Link>
        </div>
      </PageHero>

      <section className="section section-paper">
        <div className="container" style={{ maxWidth: 880 }}>
          <Reveal>
            <span className="eyebrow">The problem</span>
            <p className="case-detail-body">{study.problem}</p>
          </Reveal>
          <Reveal>
            <div style={{ marginTop: 48 }}>
              <span className="eyebrow">What we built</span>
              <p className="case-detail-body">{study.built}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {study.featured && (
        <section className="section section-dark">
          <div className="container">
            <SectionHeading eyebrow="The system" title="A network of agents," accent="working 24/7." center />
            <Reveal className="section-body">
              <SystemFlow />
            </Reveal>
          </div>
        </section>
      )}

      <section className="section section-navy">
        <div className="container">
          <SectionHeading eyebrow="The results" title="What changed" accent="after the system went live." />
          <div className="section-body">
            <StatGrid stats={study.results} columns={3} />
          </div>
        </div>
      </section>

      <section className="section section-paper">
        <div className="container" style={{ maxWidth: 820 }}>
          <QuoteGrid
            large
            items={[{ quote: study.testimonial.quote, cite: study.testimonial.name, detail: study.testimonial.company }]}
          />
        </div>
      </section>

      <RelatedLinks items={related} title="Go deeper on" accent={`${solution.name}.`} />

      <CTASection
        heading="Want results like these?"
        subtext="Every engagement starts with a free 30-minute discovery call. We'll talk through where you're leaking time, leads and money, and which AI workers would fix it."
      />
    </>
  );
}
