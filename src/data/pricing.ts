export type PricingTier = {
  name: string;
  price: string;
  cadence: string;
  tagline: string;
  features: string[];
  cta: string;
  popular?: boolean;
};

export const pricingTiers: PricingTier[] = [
  {
    name: 'Free AI Readiness Audit',
    price: '$0',
    cadence: 'one-time',
    tagline: 'Find out exactly where AI fits in your business — before you spend a dollar.',
    features: [
      '60-minute strategy session with our team',
      'AI readiness assessment across your operations',
      'Identification of your top 3 AI opportunities',
      'A written roadmap you can act on yourself or with us',
      'No obligation, no hard sell',
    ],
    cta: 'Book My Free Audit',
  },
  {
    name: 'Intelligence & Agent System',
    price: '$4,790',
    cadence: 'one-time payment',
    tagline: 'Then $87 monthly monitoring. Built around your market and your workflows.',
    features: [
      'Everything in the Free Audit, plus:',
      'Always-on competitive & market intelligence agents',
      'Custom AI agents for your highest-value workflows',
      'Real-time alerts and daily intelligence briefs',
      'Shared intelligence dashboard for your team',
      'Ongoing monitoring, maintenance, and optimization',
      'Monthly strategy reviews with our team',
    ],
    cta: 'Start with a Free Audit',
    popular: true,
  },
  {
    name: 'Advanced & Enterprise',
    price: 'Custom',
    cadence: 'custom scope',
    tagline: 'Full infrastructure, multiple agent systems, and deep integration.',
    features: [
      'Everything in Intelligence & Agent System, plus:',
      'Full AI infrastructure build-out (pipelines, orchestration, dashboards)',
      'Multi-system integration across your entire stack',
      'Dedicated agent development for complex workflows',
      'Priority support and SLAs',
    ],
    cta: 'Talk to Us',
  },
];
