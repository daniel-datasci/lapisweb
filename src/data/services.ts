export type Pillar = {
  slug: string;
  path: string;
  name: string;
  tagline: string;
  icon: string; // lucide icon name
  description: string;
  bullets: string[];
};

export const pillars: Pillar[] = [
  {
    slug: 'ai-consulting',
    path: '/services/ai-consulting',
    name: 'AI Consulting',
    tagline: 'Strategy before software.',
    icon: 'Compass',
    description:
      'A clear-eyed readiness audit and executive roadmap so your team invests in AI where it creates measurable advantage, not just momentum.',
    bullets: ['Readiness Audit', 'Strategic Roadmap', 'Build vs. Buy', 'Change Management'],
  },
  {
    slug: 'market-intelligence',
    path: '/services/market-intelligence',
    name: 'Market & Competitive Intelligence',
    tagline: 'Decision intelligence in real time.',
    icon: 'Radar',
    description:
      'Always-on intelligence that tracks competitors, market signals, pricing shifts, and emerging risks so your team acts with visibility rather than hindsight.',
    bullets: ['Competitor Monitoring', 'Pricing & Feature Alerts', 'Market Signal Detection', 'Daily Intelligence Briefs'],
  },
  {
    slug: 'ai-agents',
    path: '/services/ai-agents',
    name: 'AI Agents',
    tagline: 'Custom AI systems that execute the work.',
    icon: 'Bot',
    description:
      'Custom-built agents that handle real workflows with precision — from lead qualification and document processing to compliance monitoring and executive reporting.',
    bullets: ['Lead Qualification', 'Document Parsing', 'Compliance Monitoring', 'Research & Reporting'],
  },
  {
    slug: 'ai-infrastructure',
    path: '/services/ai-infrastructure',
    name: 'AI Infrastructure',
    tagline: 'The foundation under reliable intelligence.',
    icon: 'Server',
    description:
      'The data pipelines, integrations, and orchestration layers that make custom AI systems dependable, accurate, and ready for production use.',
    bullets: ['Data Pipelines', 'System Integrations', 'Model Orchestration', 'Custom Dashboards'],
  },
];
