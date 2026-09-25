import type { PillarId } from './solutions';
import { contactLink } from './site';
import {
  AUDIT_PRICE,
  EXTRA_WORKER,
  FRACTIONAL_PRICE,
  MARKET_WATCH_PRICE,
  WORKSHOP_PRICE,
  aiRescue,
  aiWorkforce,
  leadDesk,
  monthlyPair,
  pricePair,
  productFromPrice,
  usd,
} from './pricing';

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

export type DeliveryItem = {
  kicker: string;
  title: string;
  body: string;
  price: string;
  to: string;
  linkLabel: string;
};

/** How the service is delivered and priced under the subscription model. */
export type Delivery = {
  title: string;
  accent: string;
  body: string;
  /** One-line version for the Services overview cards. */
  short: string;
  items: DeliveryItem[];
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
  delivery: Delivery;
  /** Training-style services list programmes instead of the "What's included" rows. */
  programmes?: Programme[];
  heroCta?: { label: string; to: string; secondaryLabel?: string; secondaryHash?: string };
  /** Replaces the Lapis Run block for services that aren't "run" after delivery. */
  callout?: { label: string; title: string; body: string };
  cta?: { heading: string; subtext: string; label: string; to: string };
};

const leadDeskItem = (kicker: string, body: string): DeliveryItem => ({
  kicker,
  title: leadDesk.name,
  body,
  price: productFromPrice(leadDesk),
  to: '/pricing#lead-desk',
  linkLabel: 'See Lead Desk plans',
});

const workforceItem = (kicker: string, body: string): DeliveryItem => ({
  kicker,
  title: aiWorkforce.name,
  body,
  price: productFromPrice(aiWorkforce),
  to: '/pricing#ai-workforce',
  linkLabel: 'See AI Workforce plans',
});

const auditItem = (kicker: string, body: string): DeliveryItem => ({
  kicker,
  title: 'AI Opportunity Audit',
  body,
  price: pricePair(AUDIT_PRICE),
  to: '/pricing#projects',
  linkLabel: 'See audit pricing',
});

export const services: Service[] = [
  {
    slug: 'ai-consulting',
    num: 1,
    name: 'AI Consulting',
    path: '/services/ai-consulting',
    headline: 'AI Consulting: know what to build before you build it.',
    body: "The most expensive AI mistake isn't choosing the wrong tool. It's solving the wrong problem. We find where AI will actually save time, recover revenue or cut cost in your business, and where it won't.",
    bullets: [
      'AI Opportunity Audit: a ranked plan of AI workers and what each is worth monthly',
      'AI spend review: keep, fix or cut',
      'Build vs. buy analysis and vendor evaluation',
      'ROI targets for every initiative',
      'Change management and team adoption',
    ],
    powersLine: 'Make Your AI Pay · the first step of every engagement',
    powers: ['ai-spend'],
    seoTitle: 'AI Consulting & AI Strategy for Businesses | The Lapis AI',
    seoDescription:
      "AI consulting that finds where AI saves time, wins revenue or cuts cost, and where it won't. Start with a $490 AI Opportunity Audit, credited if you subscribe.",
    delivery: {
      title: 'Delivered as an audit,',
      accent: 'then a retainer if you want one.',
      body: 'AI consulting starts with the paid AI Opportunity Audit. Leadership teams that want ongoing direction continue with a Fractional Head of AI retainer. No hourly billing.',
      short: `Sold as the AI Opportunity Audit (${pricePair(AUDIT_PRICE)}) and the Fractional Head of AI retainer.`,
      items: [
        auditItem(
          'Paid audit · 2 weeks',
          'A review of your workflows, lead handling and AI spend, delivered as a ranked plan of AI workers with the monthly value of each. 100% credited if a subscription starts within 30 days.',
        ),
        {
          kicker: 'Retainer · 3-month minimum',
          title: 'Fractional Head of AI',
          body: 'A monthly strategy session, AI roadmap, vendor and spend review, and governance for leadership. Included in the AI Workforce Department plan.',
          price: monthlyPair(FRACTIONAL_PRICE),
          to: '/pricing#projects',
          linkLabel: 'See retainer pricing',
        },
      ],
    },
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
      'Run as AI workers: monitored, fixed and reported on every month',
    ],
    powersLine: 'Grow Without Hiring',
    powers: ['capacity'],
    seoTitle: 'AI Automation Services: Get Your Hours Back | The Lapis AI',
    seoDescription:
      "AI automation for the repetitive work that eats your team's week, delivered as managed AI workers on subscription from $1,250 a month, run and reported on.",
    delivery: {
      title: 'Delivered as AI workers,',
      accent: 'on a monthly subscription.',
      body: "We don't sell one-off automation builds. Each workflow is delivered as an AI worker on Lapis AI Workforce: we build it, run it and report what it did every month, for a fraction of the cost of a hire.",
      short: `Delivered as AI workers on Lapis AI Workforce, ${productFromPrice(aiWorkforce).replace('From', 'from')}.`,
      items: [
        workforceItem(
          'Subscription · per AI worker',
          'Each automation runs as an AI worker with a job description, a KPI, an operator and a monthly impact report. Single, Team and Department plans.',
        ),
        {
          kicker: 'Add-on · any tier',
          title: 'Extra AI workers',
          body: 'Add another AI worker to any AI Workforce plan when your team finds more work worth handing over.',
          price: `${monthlyPair(EXTRA_WORKER)} each`,
          to: '/pricing#ai-workforce',
          linkLabel: 'See AI Workforce plans',
        },
      ],
    },
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
    delivery: {
      title: 'Delivered on Lead Desk',
      accent: 'and AI Workforce.',
      body: 'Agents that talk to your leads run on Lapis Lead Desk. Agents that work behind the scenes run as AI workers on Lapis AI Workforce. Either way, we operate them under an SLA and report on them every month.',
      short: `Delivered on Lapis Lead Desk (from ${usd(leadDesk.startingPrice.usd)}/mo) and Lapis AI Workforce (from ${usd(aiWorkforce.startingPrice.usd)} per AI worker/mo).`,
      items: [
        leadDeskItem(
          'Subscription · lead-facing agents',
          'Lead response and qualification agents on WhatsApp, web chat, email and voice, answering every enquiry in under 60 seconds.',
        ),
        workforceItem(
          'Subscription · back-office agents',
          'Support, document, compliance and reporting agents, each run as an AI worker with its own KPI and monthly impact report.',
        ),
        {
          kicker: 'Add-on · any plan',
          title: 'Market Watch AI worker',
          body: 'A research agent that watches your competitors and market, added to any plan at the extra-worker rate.',
          price: monthlyPair(MARKET_WATCH_PRICE),
          to: '/pricing#projects',
          linkLabel: 'See add-ons',
        },
      ],
    },
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
    delivery: {
      title: 'Included in every subscription.',
      accent: 'Never sold separately.',
      body: "Pipelines, integrations, monitoring, hosting, security and backups are part of the Lapis Run standard behind every plan. You don't buy infrastructure from us on its own: it comes bundled with the AI workers it supports.",
      short: 'Included in every subscription. Never sold separately.',
      items: [
        leadDeskItem('Subscription · infrastructure included', 'Channels, CRM sync, hosting, monitoring and security for your lead desk, all inside the monthly fee.'),
        workforceItem(
          'Subscription · infrastructure included',
          'Data pipelines, integrations, hosting, monitoring and backups for every AI worker, all inside the monthly fee.',
        ),
        {
          kicker: 'Fixed-fee project',
          title: aiRescue.name,
          body: 'When a stalled pilot is missing the layers underneath it, the Rescue builds them and takes it live in 45 days, with 3 months of Run included.',
          price: productFromPrice(aiRescue),
          to: '/pricing#projects',
          linkLabel: 'See Rescue pricing',
        },
      ],
    },
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
      'AI and analytics training for business teams, delivered as a half-day Team AI Workshop for up to 20 people: AI readiness, analytics and AI in spreadsheets.',
    delivery: {
      title: 'Delivered as a Team AI Workshop,',
      accent: 'that leads into the audit.',
      body: 'Each programme is delivered as a Team AI Workshop: a practical half-day session for up to 20 people. It leads into the AI Opportunity Audit, so what your team learns turns into a plan.',
      short: `Delivered as a Team AI Workshop: half day, up to 20 people, ${pricePair(WORKSHOP_PRICE)}.`,
      items: [
        {
          kicker: 'Half day · up to 20 people',
          title: 'Team AI Workshop',
          body: 'Any of the three programmes below, delivered as one practical half-day session for your team.',
          price: pricePair(WORKSHOP_PRICE),
          to: '/pricing#projects',
          linkLabel: 'See workshop pricing',
        },
        auditItem(
          'The next step',
          'The ideas your team raises become a ranked plan of AI workers, with the monthly value of each. 100% credited if a subscription starts within 30 days.',
        ),
      ],
    },
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
      label: 'Book a Team AI Workshop',
      to: contactLink({ topic: 'training', plan: 'workshop' }),
      secondaryLabel: 'See the Programmes',
      secondaryHash: 'programmes',
    },
    callout: {
      label: 'After the workshop',
      title: 'Ready to put it to work? We can build and run it too.',
      body: 'When the workshop turns up a workflow worth automating, the AI Opportunity Audit ranks it by what it is worth each month. We can then build it and run it for you as an AI worker, with a monthly impact report.',
    },
    cta: {
      heading: 'Give your team the skills to make AI pay.',
      subtext: "Tell us who you'd like to train and what they work on. We'll suggest the programme that fits.",
      label: 'Book a Team AI Workshop',
      to: contactLink({ topic: 'training', plan: 'workshop' }),
    },
  },
];

export const serviceBySlug = Object.fromEntries(services.map((s) => [s.slug, s])) as Record<ServiceSlug, Service>;

export const lapisRun = {
  label: 'The Lapis Run standard',
  title: 'Every AI worker comes with a team that runs it.',
  body: 'The monthly fee pays for 24/7 monitoring and alerts, fixes and maintenance, model upgrades and tuning, hosting, security and backups, an agreed number of change requests and a monthly impact report by the 5th working day. No hourly billing, and no systems left behind after launch.',
};
