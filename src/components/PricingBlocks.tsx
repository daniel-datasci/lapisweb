import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BarChart3,
  BellRing,
  FileText,
  ListChecks,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  UserCog,
  Wrench,
  Check,
} from 'lucide-react';
import Reveal from './Reveal';
import Button from './Button';
import InfoCards from './InfoCards';
import ResponsiveTable from './ResponsiveTable';
import {
  AUDIT_PRICE,
  commercialTerms,
  extraPrice,
  extras,
  formatPrice,
  guarantees,
  ownership,
  productFromPrice,
  products,
  runStandard,
  usd,
  workerEssentials,
  type Product,
  type Tier,
} from '@/data/pricing';
import { AUDIT_CTA, DISCOVERY_CTA, auditLink, contactLink, type ContactTopic } from '@/data/site';
import './PricingBlocks.css';

const iconProps = { size: 22, strokeWidth: 1.8, 'aria-hidden': true } as const;

const runIcons = [
  <BellRing key="bell" {...iconProps} />,
  <Wrench key="wrench" {...iconProps} />,
  <Sparkles key="sparkles" {...iconProps} />,
  <ShieldCheck key="shield" {...iconProps} />,
  <ListChecks key="list" {...iconProps} />,
  <BarChart3 key="chart" {...iconProps} />,
];

const essentialIcons = [
  <FileText key="file" {...iconProps} />,
  <Target key="target" {...iconProps} />,
  <UserCog key="user" {...iconProps} />,
  <BarChart3 key="chart" {...iconProps} />,
];

function TierCard({ tier, product, headingLevel = 3 }: { tier: Tier; product: Product; headingLevel?: 2 | 3 }) {
  const Heading = headingLevel === 2 ? 'h2' : 'h3';
  return (
    <div className={`pricing-card ${tier.popular ? 'pricing-popular' : ''}`}>
      {tier.popular && (
        <div className="border-wrap border-wrap-card pricing-border-wrap" aria-hidden="true">
          <div className="pricing-popular-inner" />
        </div>
      )}
      {tier.popular && (
        <span className="pricing-badge">
          <Star size={14} fill="currentColor" aria-hidden="true" /> Most popular
        </span>
      )}
      <div className="pricing-card-content">
        <Heading className="pricing-name">
          <span className="pricing-product">{product.name}</span> {tier.name}
        </Heading>
        <div className="pricing-price">
          {tier.from && <span className="pricing-from">From</span>}
          <span className="pricing-amount">{usd(tier.monthly.usd)}</span>
          <span className="pricing-cadence">/month</span>
        </div>
        <p className="pricing-tagline">{tier.summary}</p>
        <ul className="pricing-features">
          {tier.features.map((f) => (
            <li key={f}>
              <span className="pricing-check" aria-hidden="true">
                <Check size={16} />
              </span>
              <span>{f}</span>
            </li>
          ))}
        </ul>
        <p className="pricing-onboarding">
          <span>Onboarding</span> {tier.onboarding ? formatPrice(tier.onboarding) : tier.onboardingText}
        </p>
        <Button
          to={contactLink({ plan: product.plan })}
          variant={tier.popular ? 'primary' : 'ghost'}
          size="lg"
          borderWrap={tier.popular}
          icon
          className="pricing-cta"
        >
          {`Choose ${tier.name}`}
        </Button>
      </div>
    </div>
  );
}

/** The tier cards for a subscription product (Lead Desk or AI Workforce). */
export function TierGrid({ product, headingLevel }: { product: Product; headingLevel?: 2 | 3 }) {
  if (!product.tiers) return null;
  return (
    <>
      <div className="pricing-grid">
        {product.tiers.map((tier, i) => (
          <Reveal key={tier.id} delay={(i + 1) as 1 | 2 | 3}>
            <TierCard tier={tier} product={product} headingLevel={headingLevel} />
          </Reveal>
        ))}
      </div>
      {product.tierNote && (
        <Reveal>
          <p className="pricing-tier-note">{product.tierNote}</p>
        </Reveal>
      )}
    </>
  );
}

/** The three products at a glance, with their starting prices. */
export function ProductCards() {
  return (
    <div className="grid grid-3 equal-grid product-grid">
      {products.map((p, i) => (
        <Reveal key={p.id} delay={(i + 1) as 1 | 2 | 3}>
          <div className="card product-card">
            <span className="card-kicker">
              {p.kind} · {p.pillar}
            </span>
            <h3 className="card-title">
              {p.name.replace('Lapis ', '')}: <span className="accent">{p.promise}</span>
            </h3>
            <p className="card-body">{p.blurb}</p>
            <p className="product-price">{productFromPrice(p)}</p>
            <div className="product-links">
              <Link to={`/pricing#${p.anchor}`} className="pillar-link">
                See {p.anchor === 'projects' ? 'pricing' : 'plans'} <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link to={p.solutionPath} className="pillar-link product-link-secondary">
                {p.pillar} <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

/** The Lapis Run standard: what the monthly fee pays for. */
export function RunStandardCards() {
  return (
    <InfoCards
      columns={3}
      items={runStandard.map((r, i) => ({ title: r.title, body: r.text, icon: runIcons[i] }))}
    />
  );
}

/** The four things every AI worker comes with. */
export function WorkerEssentialCards() {
  return (
    <InfoCards
      columns={4}
      className="essentials-grid"
      items={workerEssentials.map((r, i) => ({ title: r.title, body: r.text, icon: essentialIcons[i] }))}
    />
  );
}

/** Paid AI Opportunity Audit offer, with the credit-back promise. */
export function AuditOffer({
  topic,
  title = 'Not sure where to start?',
  body,
}: {
  topic?: ContactTopic;
  title?: string;
  body?: string;
}) {
  return (
    <Reveal>
      <div className="offer-box audit-offer">
        <span className="eyebrow">AI Opportunity Audit</span>
        <h2 className="section-title">{title}</h2>
        <p className="section-intro">
          {body ??
            `Book an AI Opportunity Audit (${formatPrice(AUDIT_PRICE)}). You'll get a ranked plan of what AI can take off your team's plate and what it's worth each month. The fee is credited back when you start.`}
        </p>
        <ul className="check-list offer-list">
          <li>A 2-week review of your workflows, lead handling and AI spend</li>
          <li>A ranked plan of AI workers, with the monthly value of each</li>
          <li>100% credited if a subscription starts within 30 days</li>
        </ul>
        <div className="cta-row-center">
          <Button to={auditLink(topic)} variant="primary" size="lg" borderWrap icon>
            {AUDIT_CTA}
          </Button>
          <Button to={contactLink({ topic })} variant="ghost-light" size="lg">
            {DISCOVERY_CTA}
          </Button>
        </div>
      </div>
    </Reveal>
  );
}

/** Projects, retainers and add-ons. */
export function ExtrasTable() {
  return (
    <ResponsiveTable
      caption="Projects, retainers and add-ons, with prices in US dollars"
      className="extras-table"
      columns={[{ label: 'Item' }, { label: 'Type' }, { label: 'Price' }, { label: 'Details' }]}
      rows={extras.map((e) => [e.name, e.kind, extraPrice(e), e.description])}
    />
  );
}

/** Contract, guarantees and ownership terms. */
export function TermsCards() {
  const groups = [commercialTerms, guarantees, ownership];
  return <InfoCards columns={3} items={groups.map((g) => ({ title: g.title, points: g.items }))} />;
}

/** One-line summary of what the monthly fee pays for. */
export function FeeCovers({ label = 'The monthly fee covers:' }: { label?: string }) {
  return (
    <Reveal>
      <p className="pricing-includes">
        <strong>{label}</strong> {runStandard.map((r) => r.title.toLowerCase()).join(' · ')}.{' '}
        <Link to="/pricing#included">What that means</Link>
      </p>
    </Reveal>
  );
}

/** A product guarantee, with a link to the full terms. */
export function GuaranteeNote({ text, label = 'Our guarantee:' }: { text: string; label?: string }) {
  return (
    <Reveal>
      <div className="section-note guarantee-note">
        <span className="guarantee-icon" aria-hidden="true">
          <ShieldCheck size={22} strokeWidth={1.8} />
        </span>
        <p>
          <strong>{label}</strong> {text}
        </p>
        <Link to="/pricing#terms" className="pillar-link">
          See all terms <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </Reveal>
  );
}
