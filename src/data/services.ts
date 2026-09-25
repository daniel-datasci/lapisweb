import type { PillarId } from './solutions';
import { auditLink } from './site';

export type ServiceSlug =
  | 'ai-consulting'
  | 'ai-automation'
  | 'agentic-workflows'
  | 'ai-infrastructure'
  | 'ai-analytics-training';

export type Programme = {
  title: string;
  body: string;
  points: string[];
};

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
  seoDescription: string;
  /** Training-style services list programmes instead of the "What's included" rows. */
  programmes?: Programme[];
  heroCta?: { label: string; to: string; secondaryLabel?: string; secondaryHash?: string };
  /** Replaces the Lapis Run block for services that aren't "run" after delivery. */
  callout?: { label: string; title: string; body: string };
  cta?: { heading: string; subtext: string; label: string; to: string };
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
    seoTitle: 'AI Consulting & AI Strategy for Businesses | The Lapis AI',
    seoDescription:
      "AI consulting that finds where AI will save time, recover revenue or cut cost in your business, and where it won't. Start with a free 60-minute AI audit.",
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
    seoTitle: 'AI Automation Services: Get Your Hours Back | The Lapis AI',
    seoDescription:
      "AI automation for the repetitive work that eats your team's week, from data entry and invoicing to reporting, connected to your tools. Book a free AI audit.",
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
    seoTitle: 'Agentic Workflows & Custom AI Agents | The Lapis AI',
    seoDescription:
      'Custom AI agents that read, decide and act across your systems: answering customers, qualifying leads and processing documents, with human handoff built in.',
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
    seoTitle: 'AI Infrastructure & Data Pipelines That Last | The Lapis AI',
    seoDescription:
      "Most AI pilots fail because of what's missing underneath. We build the data pipelines, integrations, monitoring and governance that keep AI systems dependable.",
  },
  {
    slug: 'ai-analytics-training',
    num: 5,
    name: 'AI & Analytics Training',
    path: '/services/ai-analytics-training',
    headline: 'AI & Analytics Training: help your team use AI and data with confidence.',
    body: 'New tools only pay off when your people know how to use them. We train your team to get ready for AI, get more from your data, and use AI in the spreadsheets and reports they already work in.',
    bullets: [
      'Training on AI Integration & Readiness for Businesses',
      'Advanced Analytics',
      'AI on Spreadsheets & Reporting',
    ],
    powersLine: 'Make Your AI Pay · Grow Without Hiring',
    powers: ['ai-spend', 'capacity'],
    seoTitle: 'AI & Analytics Training for Business Teams | The Lapis AI',
    seoDescription:
      "AI and analytics training for business teams: AI readiness, advanced analytics and AI in Excel and Google Sheets. Tell us who you'd like to train today.",
    programmes: [
      {
        title: 'Training on AI Integration & Readiness for Businesses',
        body: "For leaders and teams getting ready to bring AI into the business. We explain in plain language what AI can and can't do, where it fits in your work, and what needs to be in place before you start.",
        points: [
          "What AI can and can't do for a business like yours",
          'Spotting the tasks and workflows where AI will actually help',
          'Getting your data, tools and processes ready',
          'Safe use: data handling, access and an AI usage policy',
          'Planning adoption so your team actually uses it',
        ],
      },
      {
        title: 'Advanced Analytics',
        body: 'For teams that want more from the data they already have. We teach the methods and tools to find patterns, track what matters and turn numbers into decisions.',
        points: [
          'Cleaning, combining and preparing business data',
          'Choosing the metrics that matter to your business',
          'Finding trends, patterns and outliers',
          'Forecasting and planning from your own numbers',
          'Building dashboards and presenting results clearly',
        ],
      },
      {
        title: 'AI on Spreadsheets & Reporting',
        body: 'For anyone who spends their day in spreadsheets. We show your team how to use AI to spend less time on formulas, clean-up and routine reports.',
        points: [
          'Using AI features in Excel and Google Sheets',
          'Writing and checking formulas with AI',
          'Cleaning up messy data faster',
          'Automating recurring reports and summaries',
          'Checking AI output before it reaches a client or the board',
        ],
      },
    ],
    heroCta: {
      label: 'Talk to Us About Training',
      to: auditLink('training'),
      secondaryLabel: 'See the Programmes',
      secondaryHash: 'programmes',
    },
    callout: {
      label: 'After the training',
      title: 'Ready to put it to work? We can build and run it too.',
      body: "When training turns up a workflow worth automating, the same team can build it with you. Once it's live, Lapis Run keeps it monitored, fixed and improving, with a monthly results report.",
    },
    cta: {
      heading: 'Give your team the skills to make AI pay.',
      subtext: "Tell us who you'd like to train and what they work on. We'll suggest the programme that fits.",
      label: 'Talk to Us About Training',
      to: auditLink('training'),
    },
  },
];

export const serviceBySlug = Object.fromEntries(services.map((s) => [s.slug, s])) as Record<ServiceSlug, Service>;

export const lapisRun = {
  label: 'The glue: Lapis Run',
  title: 'Every build comes with a team that runs it.',
  body: 'Monitoring 24/7, fixes before you notice, monthly improvements and a monthly results report showing hours returned, leads answered and revenue recovered. This is what makes Lapis different from an agency that disappears after launch.',
};
