import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BarChart3,
  BellRing,
  Building2,
  FileText,
  Layers,
  LifeBuoy,
  ListChecks,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Sprout,
  Target,
  UserCog,
  Users,
  Wrench,
  Check,
} from 'lucide-react';
import Reveal from './Reveal';
import Button from './Button';
import InfoCards from './InfoCards';
import ResponsiveTable from './ResponsiveTable';
import {
  AUDIT_PRICE,
  aiRescue,
  aiWorkforce,
  commercialTerms,
  extraPrice,
  extras,
  formatPrice,
  guarantees,
  leadDesk,
  ownership,
  runStandard,
  usd,
  workerEssentials,
  type Product,
  type Tier,
} from '@/data/pricing';
import { AUDIT_CTA, DISCOVERY_CTA, auditLink, contactLink, type ContactTopic } from '@/data/site';
import './PricingBlocks.css';

const iconProps = { size: 22, strokeWidth: 1.8, 'aria-hidden': true } as const;
const planIconProps = { size: 17, strokeWidth: 1.8 } as const;

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

function PlanIcon({ children }: { children: ReactNode }) {
  return (
    <span className="plan-icon" aria-hidden="true">
      {children}
    </span>
  );
}

function PlanChecklist({ items }: { items: string[] }) {
  return (
    <>
      <p className="plan-included">What&rsquo;s included?</p>
      <ul className="plan-features">
        {items.map((f) => (
          <li key={f}>
            <span className="plan-check" aria-hidden="true">
              <Check size={11} strokeWidth={3} />
            </span>
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </>
  );
}

const tierIcons = [<Sprout key="a" {...planIconProps} />, <Layers key="b" {...planIconProps} />, <Building2 key="c" {...planIconProps} />];

function TierCard({
  tier,
  product,
  index,
  headingLevel = 3,
}: {
  tier: Tier;
  product: Product;
  index: number;
  headingLevel?: 2 | 3;
}) {
  const Heading = headingLevel === 2 ? 'h2' : 'h3';
  return (
    <div className={`plan-card ${tier.popular ? 'plan-featured' : ''}`}>
      {tier.popular && <PlanGlow />}
      <div className="plan-top">
        <PlanIcon>{tierIcons[index % tierIcons.length]}</PlanIcon>
        {tier.popular && <span className="plan-badge">Most popular</span>}
      </div>
      <Heading className="plan-name">
        <span className="plan-product">{product.name}</span> {tier.name}
      </Heading>
      <p className="plan-desc">{tier.summary}</p>
      <p className="plan-price">
        {tier.from && <span className="plan-from">From</span>}
        <span className="plan-amount">{usd(tier.monthly.usd)}</span>
        <span className="plan-unit">/month</span>
      </p>
      <hr className="plan-rule" />
      <PlanChecklist items={tier.features} />
      <p className="plan-onboarding">
        <span>Onboarding</span> {tier.onboarding ? formatPrice(tier.onboarding) : tier.onboardingText}
      </p>
      <Button to={contactLink({ plan: product.plan })} variant="primary" block className="plan-cta">
        {`Choose ${tier.name}`}
      </Button>
    </div>
  );
}

/** Faint cross-hair glow lines in the corners of the featured card. */
function PlanGlow() {
  return (
    <span className="plan-glow" aria-hidden="true">
      <span className="plan-glow-h" />
      <span className="plan-glow-v" />
    </span>
  );
}

/** The tier cards for a subscription product (Lead Desk or AI Workforce). */
export function TierGrid({ product, headingLevel }: { product: Product; headingLevel?: 2 | 3 }) {
  if (!product.tiers) return null;
  return (
    <>
      <div className="plan-grid">
        {product.tiers.map((tier, i) => (
          <Reveal key={tier.id} delay={(i + 1) as 1 | 2 | 3}>
            <TierCard tier={tier} product={product} index={i} headingLevel={headingLevel} />
          </Reveal>
        ))}
      </div>
      {product.tierNote && (
        <Reveal>
          <p className="plan-note">{product.tierNote}</p>
        </Reveal>
      )}
    </>
  );
}

/** What the 45-Day AI Rescue includes, restated from the price book and guarantees. */
const rescueIncludes = [
  'A stalled AI pilot or tool taken into production in 45 days',
  'Measured against a business KPI',
  '3 months of Run included, then onto AI Workforce',
  "If it isn't live in 45 days, we keep working at no charge",
];

const productIcons: Record<Product['id'], ReactNode> = {
  'lead-desk': <MessageCircle {...planIconProps} />,
  'ai-workforce': <Users {...planIconProps} />,
  'ai-rescue': <LifeBuoy {...planIconProps} />,
};

/** Display order for the overview cards: the featured AI Workforce sits in the middle. */
const productOrder: Product[] = [leadDesk, aiWorkforce, aiRescue];

/**
 * The three products at a glance, in the reference pricing-card layout.
 * link = 'pricing' links each card to its plans on /pricing; 'solution' to its solution page.
 */
export function ProductCards({ link = 'pricing' }: { link?: 'pricing' | 'solution' }) {
  return (
    <div className="plan-grid plan-grid-products">
      {productOrder.map((p, i) => {
        const featured = p.id === 'ai-workforce';
        const unit = p.startingPriceUnit || ' fixed fee';
        const includes = p.tiers ? p.tiers[0].features : rescueIncludes;
        return (
          <Reveal key={p.id} delay={(i + 1) as 1 | 2 | 3}>
            <div className={`plan-card ${featured ? 'plan-featured' : ''}`}>
              {featured && <PlanGlow />}
              <div className="plan-top">
                <PlanIcon>{productIcons[p.id]}</PlanIcon>
                <span className="plan-kind">{p.kind}</span>
              </div>
              <h3 className="plan-name">{p.name.replace('Lapis ', '')}</h3>
              <p className="plan-desc">{p.blurb}</p>
              <p className="plan-price">
                <span className="plan-from">From</span>
                <span className="plan-amount">{usd(p.startingPrice.usd)}</span>
                <span className="plan-unit">{unit.trim()}</span>
              </p>
              <hr className="plan-rule" />
              <PlanChecklist items={includes} />
              <div className="plan-actions">
                <Button to={contactLink({ plan: p.plan })} variant="primary" block className="plan-cta">
                  Get Started
                </Button>
                {link === 'pricing' ? (
                  <Link to={`/pricing#${p.anchor}`} className="plan-link">
                    {p.anchor === 'projects' ? 'See Rescue pricing' : 'See all plans'}
                    <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                ) : (
                  <Link to={p.solutionPath} className="plan-link">
                    {p.pillar}
                    <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                )}
              </div>
            </div>
          </Reveal>
        );
      })}
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
          <Button to={auditLink(topic)} variant="primary" size="lg">
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
