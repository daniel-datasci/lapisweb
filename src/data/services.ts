import type { PillarId } from './solutions';

export type ServiceSlug = 'ai-consulting' | 'ai-automation' | 'agentic-workflows' | 'ai-infrastructure';

export type Service = {
  slug: ServiceSlug;
  num: number;
  name: string;
  path: string;
  headline: string;
  body: string;
  bullets: string[];
  powersLine: string;
  powers: PillarId[];
  seoTitle: string;
};

export const services: Service[] = [
  {
    slug: 'ai-consulting',
    num: 1,
    name: 'AI Consulting',
    path: '/services/ai-consulting',
    headline: 'AI Consulting: know what to build before you build it.',
    body: "The most expensive AI mistake isn't choosing the wrong tool. It's solving the wrong problem. We find where AI will actually save time, recover revenue or cut cost in your business, and where it won't.",
    bullets: [
      'Free 60-minute AI audit and written roadmap',
      'AI spend review: keep, fix or cut',
      'Build vs. buy analysis and vendor evaluation',
      'ROI targets for every initiative',
      'Change management and team adoption',
    ],
    powersLine: 'Make Your AI Pay · the first step of every engagement',
    powers: ['ai-spend'],
    seoTitle: 'AI Consulting | The Lapis AI',
  },
  {
    slug: 'ai-automation',
    num: 2,
    name: 'AI Automation',
    path: '/services/ai-automation',
    headline: 'AI Automation: give your team its hours back.',
    body: "We automate the repetitive, rules-based work that eats your team's week, from data entry and invoicing to reporting and onboarding, connected to the tools you already use.",
    bullets: [
      'Workflow mapping and redesign',
      'Back-office and admin automation',
      'Invoicing, payment reminders and reconciliation',
      'Automated reports and dashboards',
      'Documented, monitored and maintained',
    ],
    powersLine: 'Grow Without Hiring',
    powers: ['capacity'],
    seoTitle: 'AI Automation | The Lapis AI',
  },
  {
    slug: 'agentic-workflows',
    num: 3,
    name: 'Agentic Workflows',
    path: '/services/agentic-workflows',
    headline: 'Agentic Workflows: AI that does the work, not just the chat.',
    body: 'Custom AI agents that read, decide and act across your systems: answering customers, qualifying leads, processing documents and watching your market, with a person stepping in when judgement is needed.',
    bullets: [
      'Lead response and qualification agents',
      'Customer and staff support assistants',
      'Document and compliance agents',
      'Research, reporting and market-watch agents',
      'Guardrails, testing and human handoff built in',
    ],
    powersLine: 'Never Miss a Lead · Grow Without Hiring',
    powers: ['leads', 'capacity'],
    seoTitle: 'Agentic Workflows | The Lapis AI',
  },
  {
    slug: 'ai-infrastructure',
    num: 4,
    name: 'AI Infrastructure',
    path: '/services/ai-infrastructure',
    headline: 'AI Infrastructure: the part that makes it last.',
    body: "Most AI pilots fail because of what's missing underneath them. We build the data pipelines, integrations, monitoring and governance that keep your systems accurate and dependable.",
    bullets: [
      'Data pipelines that clean and combine your data',
      'Integrations with CRM, ERP, accounting, PMS and WhatsApp',
      'Model orchestration with fallbacks and evaluation',
      'Monitoring for accuracy, cost and uptime',
      'Security, access control and audit logging',
    ],
    powersLine: 'all three solutions · essential for Make Your AI Pay',
    powers: ['capacity', 'leads', 'ai-spend'],
    seoTitle: 'AI Infrastructure | The Lapis AI',
  },
];

export const serviceBySlug = Object.fromEntries(services.map((s) => [s.slug, s])) as Record<ServiceSlug, Service>;

export const lapisRun = {
  label: 'The glue: Lapis Run',
  title: 'Every build comes with a team that runs it.',
  body: 'Monitoring 24/7, fixes before you notice, monthly improvements and a monthly results report showing hours returned, leads answered and revenue recovered. This is what makes Lapis different from an agency that disappears after launch.',
};
