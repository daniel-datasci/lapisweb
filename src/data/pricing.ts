export type PricingTier = {
  name: string;
  price: string;
  /** Supports **bold** and *italic* markup. */
  tagline: string;
  features: string[];
  cta: string;
  popular?: boolean;
};

export const pricingTiers: PricingTier[] = [
  {
    name: 'Free AI Audit',
    price: '$0',
    tagline: 'Find out where your business is leaking time, leads and money, before you spend a thing.',
    features: [
      '60-minute audit of operations, channels and AI spend',
      'Your top three opportunities, ranked by return',
      'A written roadmap you can act on with or without us',
      'No obligation, no hard sell',
    ],
    cta: 'Book My Free Audit',
  },
  {
    name: 'Growth System',
    price: '$2,790',
    tagline: 'One-time build, **then $418/month** for Lapis Run. One complete solution, built and run for you.',
    features: [
      'Everything in the Free Audit',
      'One solution fully deployed: **Grow Without Hiring** *or* **Never Miss a Lead**',
      'Automations and agents connected to your tools',
      '24/7 monitoring, maintenance and fixes',
      'Monthly results report (hours returned, revenue recovered)',
      'Monthly strategy review',
    ],
    cta: 'Start With a Free Audit',
    popular: true,
  },
  {
    name: 'Scale & Enterprise',
    price: 'Custom',
    tagline: 'Multiple solutions, deep integration and AI-to-production programmes.',
    features: [
      'Everything in Growth System',
      '**Make Your AI Pay:** the 45-day pilot-to-production programme',
      'Multiple workflows across teams',
      'Full AI infrastructure and governance',
      'Priority support and SLAs',
      'Dedicated senior team',
    ],
    cta: 'Talk to Us',
  },
];
