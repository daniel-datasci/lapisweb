import type { PillarId } from './solutions';

export type CaseStudy = {
  slug: string;
  pillar: PillarId;
  industry: string;
  client: string;
  title: string;
  problem: string;
  built: string;
  results: { value: string; label: string }[];
  testimonial: { quote: string; name: string; company: string };
  featured?: boolean;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: 'real-estate-market-monitor',
    pillar: 'capacity',
    industry: 'Real Estate',
    client: 'Regional Real Estate Brokerage',
    title: 'Agents got 8+ hours a week back, and spent them with clients.',
    problem:
      'Agents spent their mornings pulling comparable sales by hand, and were the last to know about price drops and new listings in their own areas.',
    built:
      'A local market monitor across 12 areas, with automated comparable-sales reports and instant alerts sent to agents.',
    results: [
      { value: '8+', label: 'hrs saved / agent / week' },
      { value: '5 min', label: 'to alert' },
      { value: '12', label: 'areas covered' },
    ],
    testimonial: {
      quote:
        "My agents used to spend their mornings pulling comps. Now they wake up to alerts telling them exactly what changed overnight. They're in front of clients instead of spreadsheets.",
      name: 'Managing Broker',
      company: 'Regional Real Estate Brokerage',
    },
  },
  {
    slug: 'hospitality-rate-intelligence',
    pillar: 'leads',
    industry: 'Hospitality',
    client: 'Boutique Hotel Group',
    title: "A 14% RevPAR lift by pricing on today's market.",
    problem:
      "A boutique hotel group was pricing rooms on yesterday's data while competitors adjusted hourly, and was leaving revenue behind every high-demand night.",
    built:
      'Continuous rate and demand monitoring across its competitive set, integrated with the PMS so the revenue team acts in real time.',
    results: [
      { value: '14%', label: 'RevPAR' },
      { value: '24/7', label: 'monitoring' },
      { value: '6 wks', label: 'to live' },
    ],
    testimonial: {
      quote:
        'We went from pricing on a daily report to pricing on live market intelligence. The difference on high-demand nights was immediate.',
      name: 'Director of Revenue',
      company: 'Boutique Hotel Group',
    },
  },
  {
    slug: 'saas-competitive-intelligence',
    pillar: 'leads',
    industry: 'SaaS',
    client: 'Mid-Market SaaS Platform',
    title: "The sales team stopped losing deals it couldn't explain.",
    problem:
      "A B2B SaaS company was losing deals because competitors' price and feature changes went unnoticed for weeks.",
    built: '6+ agents watching five competitors, feeding alerts and a weekly brief to the sales and marketing team.',
    results: [
      { value: '<4 hrs', label: 'to detect' },
      { value: '6+', label: 'agents' },
      { value: '5 wks', label: 'to live' },
    ],
    testimonial: {
      quote:
        "We used to find out about a competitor's price change from a lost deal. Now we know the same day they do. It changed how our whole team sells.",
      name: 'VP of Sales',
      company: 'Mid-Market SaaS Platform',
    },
    featured: true,
  },
];

export const caseStudyBySlug = (slug?: string) => caseStudies.find((c) => c.slug === slug);
