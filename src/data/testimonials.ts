export type CaseStudy = {
  slug: string;
  client: string;
  industry: string;
  problem: string;
  approach: string;
  built: string;
  results: { label: string; value: number; suffix?: string; prefix?: string }[];
  testimonial: { quote: string; name: string; title: string; company: string };
  featured?: boolean;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: 'saas-competitive-intelligence',
    client: 'Mid-Market SaaS Platform',
    industry: 'SaaS',
    problem:
      'A B2B SaaS company was losing deals to a competitor they couldn\u2019t track. Pricing changes, feature launches, and positioning shifts went unnoticed for weeks — until churned customers told them about it.',
    approach:
      'We ran a readiness audit to map their competitive landscape, then deployed a continuous monitoring system tracking their top five competitors\u2019 pricing pages, feature pages, changelogs, and hiring signals.',
    built:
      'A network of scraping and verification agents feeding an alert engine and a shared intelligence dashboard. The system flagged competitor changes within hours and delivered a weekly brief to the GTM team.',
    results: [
      { label: 'Agents working 24/7', value: 6, suffix: '+' },
      { label: 'Hours to detect changes', value: 4, prefix: '<' },
      { label: 'Weeks to live system', value: 5 },
    ],
    testimonial: {
      quote:
        'We used to find out about a competitor\u2019s price change from a lost deal. Now we know the same day they do. It changed how our whole team sells.',
      name: 'VP of Sales',
      title: 'VP of Sales',
      company: 'Mid-Market SaaS Platform',
    },
    featured: true,
  },
  {
    slug: 'real-estate-market-monitor',
    client: 'Regional Real Estate Brokerage',
    industry: 'Real Estate',
    problem:
      'A regional brokerage\u2019s agents were the last to know about price reductions and new listings in their own farm areas. By the time they reacted, buyers had already moved on.',
    approach:
      'We built a real-time local market monitor that tracked new listings, price changes, and inventory shifts across the brokerage\u2019s top three farm areas, with instant alerts sent directly to agents.',
    built:
      'Agent-based monitoring of MLS feeds and listing sources, with an alert pipeline that notified agents within minutes of a change in their assigned neighborhoods, plus a shared market dashboard.',
    results: [
      { label: 'Minutes to alert agents', value: 5 },
      { label: 'Farm areas monitored', value: 12 },
      { label: 'Hours saved per agent weekly', value: 8, suffix: '+' },
    ],
    testimonial: {
      quote:
        'My agents used to spend their mornings pulling comps. Now they wake up to alerts telling them exactly what changed overnight. They\u2019re in front of clients instead of spreadsheets.',
      name: 'Managing Broker',
      title: 'Managing Broker',
      company: 'Regional Real Estate Brokerage',
    },
  },
  {
    slug: 'hospitality-rate-intelligence',
    client: 'Boutique Hotel Group',
    industry: 'Hospitality',
    problem:
      'A boutique hotel group was pricing rooms on yesterday\u2019s data while competitors adjusted rates hourly. They were leaving revenue on the table every high-demand night.',
    approach:
      'We deployed continuous rate-monitoring agents across the compset, integrated with their PMS, so the revenue team saw competitor rate changes and local demand signals in real time.',
    built:
      'A rate intelligence system that monitored competitor pricing across booking channels, tracked local demand drivers, and fed alerts and recommendations into the revenue team\u2019s workflow and PMS.',
    results: [
      { label: 'Competitor rates monitored', value: 24, suffix: '/7' },
      { label: 'RevPAR improvement', value: 14, suffix: '%' },
      { label: 'Weeks to deployment', value: 6 },
    ],
    testimonial: {
      quote:
        'We went from pricing on a daily report to pricing on live market intelligence. The difference on high-demand nights was immediate.',
      name: 'Director of Revenue',
      title: 'Director of Revenue',
      company: 'Boutique Hotel Group',
    },
  },
];

export const testimonials = caseStudies.map((c) => c.testimonial);
