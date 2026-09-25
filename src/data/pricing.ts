import type { InterestPlan } from './site';

/**
 * The Lapis AI price book. Global clients are billed in USD, Nigeria-based
 * clients in NGN. Every price excludes VAT; annual prepaid plans get 2 months free.
 */

export type Money = { usd: number; ngn: number };

export type Tier = {
  id: string;
  name: string;
  /** Monthly subscription fee. */
  monthly: Money;
  /** The monthly fee is a starting price ("from"). */
  from?: boolean;
  /** One-off onboarding fee billed at signing, when it is a fixed amount. */
  onboarding?: Money;
  /** Onboarding wording when it isn't a fixed amount. */
  onboardingNote?: string;
  summary: string;
  features: string[];
  popular?: boolean;
};

export type ProductId = 'lead-desk' | 'ai-workforce' | 'ai-rescue';

export type Product = {
  id: ProductId;
  /** Section id on /pricing. */
  anchor: 'lead-desk' | 'ai-workforce' | 'projects';
  name: string;
  /** The problem-led pillar this product delivers. */
  pillar: string;
  solutionPath: string;
  plan: InterestPlan;
  kind: 'Subscription' | 'Fixed-fee project';
  /** Short promise, lower case after the product name ("Lead Desk: never miss a lead again"). */
  promise: string;
  blurb: string;
  /** Headline price for overview cards. */
  startingPrice: Money;
  startingPriceUnit: string;
  tiers?: Tier[];
  tierNote?: string;
};

/* ---------- formatting ---------- */

const group = (n: number) => n.toLocaleString('en-US', { maximumFractionDigits: 2 });

export const usd = (n: number) => `$${Number.isInteger(n) ? group(n) : n.toFixed(2)}`;
export const ngn = (n: number) => `₦${group(n)}`;
/** Compact naira for large one-off amounts: ₦4,500,000 → ₦4.5M. */
export const ngnShort = (n: number) => (n >= 1_000_000 ? `₦${group(n / 1_000_000)}M` : ngn(n));

/** "$390 · ₦250,000" */
export const pricePair = (m: Money) => `${usd(m.usd)} · ${ngn(m.ngn)}`;
/** "$390/mo · ₦250,000/mo" */
export const monthlyPair = (m: Money) => `${usd(m.usd)}/mo · ${ngn(m.ngn)}/mo`;

/* ---------- products ---------- */

export const leadDesk: Product = {
  id: 'lead-desk',
  anchor: 'lead-desk',
  name: 'Lapis Lead Desk',
  pillar: 'Never Miss a Lead',
  solutionPath: '/solutions/never-miss-a-lead',
  plan: 'lead-desk',
  kind: 'Subscription',
  promise: 'never miss a lead again',
  blurb: 'Every enquiry answered in under 60 seconds, on WhatsApp, web, email and phone.',
  startingPrice: { usd: 390, ngn: 250_000 },
  startingPriceUnit: '/month',
  tierNote:
    'Conversations above your band are billed at $0.40 · ₦250 each, monthly. Voice minutes are billed at cost plus a handling fee, with alerts at 80% of your budget.',
  tiers: [
    {
      id: 'lead-desk-starter',
      name: 'Starter',
      monthly: { usd: 390, ngn: 250_000 },
      onboarding: { usd: 490, ngn: 300_000 },
      summary: 'One channel, answered and qualified around the clock.',
      features: [
        '1 channel (WhatsApp or web chat)',
        'Up to 300 conversations/mo',
        'Lead qualification + booking',
        'Monthly lead report',
      ],
    },
    {
      id: 'lead-desk-growth',
      name: 'Growth',
      monthly: { usd: 790, ngn: 500_000 },
      onboarding: { usd: 990, ngn: 600_000 },
      summary: 'Every main channel, synced to your CRM and followed up.',
      popular: true,
      features: [
        'WhatsApp + web chat + email',
        'Up to 1,000 conversations/mo',
        'CRM sync + automated follow-up',
        'Missed-lead recovery campaigns',
        'Monthly review call',
      ],
    },
    {
      id: 'lead-desk-pro',
      name: 'Pro',
      monthly: { usd: 1_590, ngn: 950_000 },
      onboarding: { usd: 1_490, ngn: 900_000 },
      summary: 'Voice, multiple locations and the fastest fixes.',
      features: [
        'Everything in Growth + AI voice agent',
        'Multi-location / multi-brand',
        'Up to 3,000 conversations/mo',
        'Priority SLA (4-hour fixes)',
      ],
    },
  ],
};

const WORKFORCE_ONBOARDING = "One month's fee per new AI worker, waived on annual plans";

export const aiWorkforce: Product = {
  id: 'ai-workforce',
  anchor: 'ai-workforce',
  name: 'Lapis AI Workforce',
  pillar: 'Grow Without Hiring',
  solutionPath: '/solutions/grow-without-hiring',
  plan: 'ai-workforce',
  kind: 'Subscription',
  promise: 'grow without hiring',
  blurb: 'Managed AI workers that handle invoicing, reporting, onboarding and admin every day.',
  startingPrice: { usd: 1_250, ngn: 750_000 },
  startingPriceUnit: ' per AI worker/month',
  tierNote:
    "Onboarding: one month's fee per new AI worker, waived on annual plans. Extra AI workers on any tier: $1,000/mo · ₦600,000/mo each.",
  tiers: [
    {
      id: 'ai-workforce-single',
      name: 'Single',
      monthly: { usd: 1_250, ngn: 750_000 },
      onboardingNote: WORKFORCE_ONBOARDING,
      summary: 'One AI worker with one job, run and reported on by us.',
      features: [
        '1 AI worker',
        'Monitoring, fixes, model upgrades',
        '2 change requests/mo',
        'Monthly impact report',
      ],
    },
    {
      id: 'ai-workforce-team',
      name: 'Team',
      monthly: { usd: 2_950, ngn: 1_800_000 },
      onboardingNote: WORKFORCE_ONBOARDING,
      summary: 'Three AI workers that hand work to each other.',
      popular: true,
      features: [
        '3 connected AI workers',
        '5 change requests/mo',
        'Quarterly business review',
        'Next-business-day SLA',
      ],
    },
    {
      id: 'ai-workforce-department',
      name: 'Department',
      monthly: { usd: 5_500, ngn: 3_500_000 },
      from: true,
      onboardingNote: WORKFORCE_ONBOARDING,
      summary: 'A whole function run by AI workers, with senior oversight.',
      features: [
        '6+ AI workers, dedicated operator',
        'Fractional Head of AI included',
        'Priority SLA (4-hour fixes)',
        'NDPA / GDPR governance pack',
      ],
    },
  ],
};

export const EXTRA_WORKER: Money = { usd: 1_000, ngn: 600_000 };

export const aiRescue: Product = {
  id: 'ai-rescue',
  anchor: 'projects',
  name: '45-Day AI Rescue',
  pillar: 'Make Your AI Pay',
  solutionPath: '/solutions/make-your-ai-pay',
  plan: 'ai-rescue',
  kind: 'Fixed-fee project',
  promise: 'make your AI pay',
  blurb:
    'Already spent money on AI that never shipped? We get it live and measured in 45 days, or keep working free until it is.',
  startingPrice: { usd: 7_500, ngn: 4_500_000 },
  startingPriceUnit: '',
};

export const products: Product[] = [leadDesk, aiWorkforce, aiRescue];

export const productById: Record<ProductId, Product> = {
  'lead-desk': leadDesk,
  'ai-workforce': aiWorkforce,
  'ai-rescue': aiRescue,
};

/** "From $390/month · ₦250,000/month" style headline price for a product. */
export const productFromPrice = (p: Product) => {
  const unit = p.startingPriceUnit;
  const usdPart = `${usd(p.startingPrice.usd)}${unit}`;
  const ngnPart = p.anchor === 'projects' ? ngnShort(p.startingPrice.ngn) : `${ngn(p.startingPrice.ngn)}${unit ? '/month' : ''}`;
  return `From ${usdPart} · ${ngnPart}`;
};

/* ---------- projects, retainers & add-ons ---------- */

export type ExtraKind = 'Project' | 'Retainer' | 'Add-on' | 'Usage';

export type Extra = {
  id: string;
  name: string;
  kind: ExtraKind;
  price?: Money;
  /** Upper bound when the price is a range. */
  maxPrice?: Money;
  cadence?: 'one-off' | 'month' | 'conversation';
  /** Replaces the price columns for usage-based items. */
  priceText?: string;
  description: string;
  plan?: InterestPlan;
};

export const AUDIT_PRICE: Money = { usd: 490, ngn: 250_000 };
export const RESCUE_PRICE = { min: { usd: 7_500, ngn: 4_500_000 }, max: { usd: 15_000, ngn: 9_000_000 } };
/** "$7,500–$15,000 · ₦4.5M–₦9M" */
export const RESCUE_PRICE_TEXT = `${usd(RESCUE_PRICE.min.usd)}–${usd(RESCUE_PRICE.max.usd)} · ${ngnShort(RESCUE_PRICE.min.ngn)}–${ngnShort(RESCUE_PRICE.max.ngn)}`;
export const WORKSHOP_PRICE: Money = { usd: 1_500, ngn: 800_000 };
export const FRACTIONAL_PRICE: Money = { usd: 2_500, ngn: 1_500_000 };
export const MARKET_WATCH_PRICE: Money = EXTRA_WORKER;
export const OVERAGE_PRICE: Money = { usd: 0.4, ngn: 250 };

export const extras: Extra[] = [
  {
    id: 'audit',
    name: 'AI Opportunity Audit',
    kind: 'Project',
    price: AUDIT_PRICE,
    cadence: 'one-off',
    description:
      'A 2-week review of your workflows, lead handling and AI spend, delivered as a ranked plan of AI workers with the monthly value of each. 100% credited if a subscription starts within 30 days.',
    plan: 'audit',
  },
  {
    id: 'ai-rescue',
    name: '45-Day AI Rescue',
    kind: 'Project',
    price: RESCUE_PRICE.min,
    maxPrice: RESCUE_PRICE.max,
    cadence: 'one-off',
    description:
      'Fixed fee by scope. Takes a stalled AI pilot or tool into production in 45 days, measured against a business KPI. Includes 3 months of Run, then moves onto AI Workforce.',
    plan: 'ai-rescue',
  },
  {
    id: 'fractional-head-of-ai',
    name: 'Fractional Head of AI',
    kind: 'Retainer',
    price: FRACTIONAL_PRICE,
    cadence: 'month',
    description:
      'A monthly strategy session, AI roadmap, vendor and spend review, and governance for leadership. 3-month minimum; included in Department.',
    plan: 'fractional-head-of-ai',
  },
  {
    id: 'market-watch',
    name: 'Market Watch AI worker',
    kind: 'Add-on',
    price: MARKET_WATCH_PRICE,
    cadence: 'month',
    description: 'Competitor and market monitoring as an extra AI worker, added to any plan at the extra-worker rate.',
    plan: 'ai-workforce',
  },
  {
    id: 'workshop',
    name: 'Team AI Workshop',
    kind: 'Project',
    price: WORKSHOP_PRICE,
    cadence: 'one-off',
    description: "A half-day practical session for up to 20 people on your team. It leads into the AI Opportunity Audit.",
    plan: 'workshop',
  },
  {
    id: 'overage',
    name: 'Lead Desk conversation overage',
    kind: 'Usage',
    price: OVERAGE_PRICE,
    cadence: 'conversation',
    description: 'Per conversation above your plan’s band, billed monthly.',
    plan: 'lead-desk',
  },
  {
    id: 'usage',
    name: 'Voice minutes & heavy LLM usage',
    kind: 'Usage',
    priceText: 'Billed at cost plus a handling fee',
    description: 'Passed through transparently, with usage alerts at 80% of your budget.',
  },
];

const cadenceSuffix = (c?: Extra['cadence']) => (c === 'month' ? '/mo' : c === 'conversation' ? ' each' : '');

export const extraUsd = (e: Extra) => {
  if (e.priceText || !e.price) return e.priceText ?? '';
  const s = cadenceSuffix(e.cadence);
  return e.maxPrice ? `${usd(e.price.usd)}–${usd(e.maxPrice.usd)}` : `${usd(e.price.usd)}${s}`;
};

export const extraNgn = (e: Extra) => {
  if (e.priceText || !e.price) return e.priceText ?? '';
  const s = cadenceSuffix(e.cadence);
  return e.maxPrice ? `${ngnShort(e.price.ngn)}–${ngnShort(e.maxPrice.ngn)}` : `${ngn(e.price.ngn)}${s}`;
};

/* ---------- what every plan includes ---------- */

export const everyPlanIncludes = [
  '24/7 monitoring',
  'fixes and model upgrades',
  'hosting and security',
  'a monthly impact report',
  'you own your data',
  '2 months free on annual plans',
];

export type RunItem = { title: string; text: string };

/** The Lapis Run standard: what the monthly fee pays for. */
export const runStandard: RunItem[] = [
  { title: '24/7 monitoring & alerts', text: 'We usually know something is wrong before you do.' },
  { title: 'Fixes & maintenance', text: 'Broken integrations, API changes and failing edge cases, handled.' },
  { title: 'Model upgrades & tuning', text: 'Regular prompt and model updates as AI providers change.' },
  { title: 'Hosting, security & backups', text: 'Infrastructure bundled in, never billed separately.' },
  { title: 'Change requests', text: 'An agreed number each month on your tier. Extra work is quoted separately.' },
  {
    title: 'Monthly impact report',
    text: "Results against each AI worker's KPI, delivered by the 5th working day of every month.",
  },
];

/** Every AI worker comes with four things. */
export const workerEssentials: RunItem[] = [
  { title: 'A job description', text: 'One clear job, written down. For example: “chases overdue invoices every Monday.”' },
  { title: 'A KPI', text: 'A number it answers for: leads answered, hours saved or cash collected.' },
  { title: 'An operator', text: 'Lapis monitors it, fixes it and improves it under an agreed SLA.' },
  { title: 'A monthly impact report', text: 'What it did last month against its KPI, in plain numbers.' },
];

/* ---------- terms ---------- */

export type TermGroup = { title: string; items: string[] };

export const commercialTerms: TermGroup[] = [
  {
    title: 'Contract',
    items: [
      '3-month minimum first term, then rolling monthly, or a 12-month annual plan',
      "30 days' notice to cancel",
      'Billed monthly in advance; onboarding billed at signing',
      'Recurring card or direct debit; corporates by invoice, due in 14 days',
    ],
  },
  {
    title: 'Currency (NGN clients)',
    items: [
      'Global clients are billed in USD; Nigeria-based clients in NGN',
      'NGN prices are reviewed every quarter',
      "If the naira moves more than 15% against the USD, prices adjust at the next billing cycle, with 30 days' notice",
      'Annual prepaid plans are fixed for the whole term',
    ],
  },
];

export const guarantees: TermGroup = {
  title: 'Service guarantees',
  items: [
    "Lead Desk: if we miss the response-time SLA in a calendar month, that month's fee is credited",
    "45-Day AI Rescue: if it isn't live in production in 45 days, we keep working at no charge until it is",
    '99.5% uptime target for systems Lapis hosts',
  ],
};

export const ownership: TermGroup = {
  title: 'Ownership & exit',
  items: [
    'You own your data, prompts and business logic',
    'On exit: a full data export and a handover document within 14 days',
    'Data processing agreement provided (NDPA 2023 / UK and EU GDPR)',
    'Lapis keeps its shared platform, templates and tooling',
  ],
};

export const PRICING_NOTE = 'Prices exclude VAT. Annual plans: 2 months free.';

/* ---------- FAQs ---------- */

export type PricingFaq = { q: string; a: string };

export const pricingFaqs: PricingFaq[] = [
  {
    q: 'Why a monthly fee instead of a one-off build?',
    a: 'AI systems need looking after: models change, integrations break and your business evolves. The monthly fee means someone is always responsible for making sure yours keeps working and keeps paying back.',
  },
  {
    q: 'Am I locked in?',
    a: "After a 3-month first term it's month to month with 30 days' notice. You own your data and get a full handover if you leave.",
  },
  {
    q: 'Can I pay in naira?',
    a: 'Yes. Nigeria-based businesses are billed in NGN by card, direct debit or bank transfer.',
  },
  {
    q: 'What if I need more?',
    a: 'Add AI workers, channels or volume at any time. Your plan grows with you.',
  },
];

/* ---------- contact form options ---------- */

export const PLAN_OPTIONS: { value: InterestPlan; label: string }[] = [
  { value: 'lead-desk', label: 'Lapis Lead Desk' },
  { value: 'ai-workforce', label: 'Lapis AI Workforce' },
  { value: 'ai-rescue', label: '45-Day AI Rescue' },
  { value: 'audit', label: 'AI Opportunity Audit' },
  { value: 'fractional-head-of-ai', label: 'Fractional Head of AI' },
  { value: 'workshop', label: 'Team AI Workshop' },
  { value: 'not-sure', label: 'Not sure yet' },
];
