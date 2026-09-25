import type { PillarId } from './solutions';
import type { ServiceSlug } from './services';
import {
  AUDIT_PRICE,
  EXTRA_WORKER,
  MARKET_WATCH_PRICE,
  OVERAGE_PRICE,
  RESCUE_PRICE_TEXT,
  WORKSHOP_PRICE,
  FRACTIONAL_PRICE,
  aiWorkforce,
  leadDesk,
  ngn,
  pricePair,
  pricingFaqs,
  usd,
  type Product,
} from './pricing';

export type FaqItem = { q: string; a: string };

const tierPrices = (p: Product) =>
  (p.tiers ?? [])
    .map((t) => {
      const from = t.from ? 'from ' : '';
      return `${t.name}, ${from}${usd(t.monthly.usd)}/month (${from}${ngn(t.monthly.ngn)})`;
    })
    .join('; ');

const monthly = (m: { usd: number; ngn: number }) => `${usd(m.usd)}/month · ${ngn(m.ngn)}/month`;

const [whyMonthly, lockedIn, naira, needMore] = pricingFaqs;

const auditAnswer = `A paid, 2-week review of your workflows, lead handling and AI spend (${pricePair(AUDIT_PRICE)}). You get a ranked plan of AI workers with the monthly value of each, and the fee is 100% credited if a subscription starts within 30 days.`;

export const faqs: FaqItem[] = [
  {
    q: 'Is this about replacing my staff?',
    a: 'No. AI workers take on the repetitive work so your existing team can move to higher-value work: serving more customers, growing into new markets and not burning out. Most clients use the hours to grow, not to cut jobs.',
  },
  {
    q: 'How quickly will I see results?',
    a: 'Most AI workers go live 2–4 weeks after signing, and Lead Desk is often faster. Your monthly impact report then shows exactly what each AI worker did against its KPI.',
  },
  whyMonthly,
  {
    q: 'What does the monthly fee cover?',
    a: 'The Lapis Run standard: 24/7 monitoring and alerts, fixes and maintenance, model upgrades and tuning, hosting, security and backups (never billed separately), the change requests included in your plan, and a monthly impact report by the 5th working day.',
  },
  lockedIn,
  naira,
  {
    q: 'What happens to my data if I leave?',
    a: 'You own your data, prompts and business logic. If you leave, you get a full data export and a handover document within 14 days. We provide a data processing agreement aligned with NDPA 2023 and UK and EU GDPR.',
  },
  {
    q: 'What if something breaks?',
    a: 'We usually see it before you do. Every AI worker has monitoring and alerts, and fixing issues is part of the monthly fee, not an extra invoice.',
  },
  {
    q: 'Do I need to change my current tools?',
    a: "No. We build around what you already use, such as WhatsApp, Google Workspace, Microsoft 365, your CRM, accounting software or PMS. If something truly needs changing, we'll tell you before you sign.",
  },
  {
    q: 'Our data is a mess. Is that a problem?',
    a: "No, it's normal. Cleaning and connecting data is part of what we do, and it's usually why other AI projects failed.",
  },
  {
    q: "Will customers know they're talking to AI?",
    a: 'Yes, if you want them to, and we recommend it. Our assistants are accurate, polite and hand over to a person whenever a conversation needs one.',
  },
  {
    q: 'Do you work outside Nigeria?',
    a: 'Yes. We work with businesses across Africa, the UK, US, Canada and Europe, with the same senior team and the same standards everywhere. International clients are billed in US dollars.',
  },
  {
    q: 'Can I start small?',
    a: 'Yes. Most clients start with one AI worker or one Lead Desk channel, see the results in their impact report, then add more. At 90 days, we propose the next AI worker.',
  },
  needMore,
];

/** Visible FAQs on each solution page. Every answer restates facts already published on the site. */
export const solutionFaqs: Record<PillarId, FaqItem[]> = {
  capacity: [
    {
      q: 'What does Grow Without Hiring automate?',
      a: "The repetitive work, handoffs and approvals that clog your team's week: admin and data entry, customer and staff questions, reporting and KPIs, approvals and handoffs, invoicing and payment chasing, onboarding, document processing, compliance checks and market watch. Each one becomes an AI worker on Lapis AI Workforce, built on the tools you already use.",
    },
    {
      q: 'How much does Lapis AI Workforce cost?',
      a: `${tierPrices(aiWorkforce)}. Onboarding is one month's fee per new AI worker, waived on annual plans, and extra AI workers on any plan are ${monthly(EXTRA_WORKER)}. Prices exclude VAT.`,
    },
    {
      q: 'Is this about replacing my staff?',
      a: 'No. This is about capacity, not cutting jobs. AI workers free up your existing team for higher-value work, so they can serve more customers, grow into new markets and stop burning out.',
    },
    {
      q: "Who looks after the AI workers once they're live?",
      a: 'We do. Every AI worker has an operator: we monitor it 24/7, fix issues before your team notices, upgrade and tune the models, and handle the change requests in your plan, under a service-level agreement.',
    },
    {
      q: "How will I know it's working?",
      a: "Every AI worker has a KPI. Each month you get an impact report of hours returned, tasks completed and errors caught, against that KPI.",
    },
    {
      q: 'Where do I start?',
      a: `With a free 30-minute discovery call. If there's a fit, the AI Opportunity Audit (${pricePair(AUDIT_PRICE)}, credited if you subscribe within 30 days) maps where your team's time goes and ranks the AI workers worth hiring first.`,
    },
  ],
  leads: [
    {
      q: 'Which channels does Lapis Lead Desk cover?',
      a: 'WhatsApp, phone, website chat, email, Instagram and Facebook can all feed one lead desk, so no enquiry falls through the gaps. Starter covers one channel (WhatsApp or web chat), Growth adds email and CRM sync, and Pro adds an AI voice agent.',
    },
    {
      q: 'How much does Lead Desk cost?',
      a: `${tierPrices(leadDesk)}. Each plan has a one-off onboarding fee, and conversations above your plan's band are ${usd(OVERAGE_PRICE.usd)} (${ngn(OVERAGE_PRICE.ngn)}) each. Prices exclude VAT; annual plans get 2 months free.`,
    },
    {
      q: 'How fast are enquiries answered?',
      a: 'In under 60 seconds, 24/7. Your AI assistant replies using your real prices, services and policies, asks the right questions, scores the lead and books it straight into your calendar or CRM.',
    },
    {
      q: 'What if you miss the response-time SLA?',
      a: "If we miss the Lead Desk response-time SLA in a calendar month, that month's fee is credited.",
    },
    {
      q: 'What happens when a customer needs a real person?',
      a: 'High-value, complex or emotional conversations go to the right person on your team immediately, with the full context. AI for speed, humans for judgement.',
    },
    {
      q: 'How is this different from a chatbot?',
      a: 'A typical AI receptionist runs generic scripts that sometimes invent answers, with frustrating dead ends. Lead Desk is trained on your business with guardrails and testing, measured on bookings and revenue recovered, and monitored, tuned and improved monthly by our team.',
    },
  ],
  'ai-spend': [
    {
      q: 'What is the 45-Day AI Rescue?',
      a: `A fixed-fee project (${RESCUE_PRICE_TEXT}, by scope) that takes a stalled AI pilot or tool into production in 45 days, measured against a business KPI. It includes 3 months of Run, then moves onto an AI Workforce plan.`,
    },
    {
      q: 'What happens in the 45 days?',
      a: 'Days 1–10: we review your AI tools, pilots, spend and data, and choose the single workflow with the clearest return. Days 11–35: we build the data pipelines, integrations, evaluation tests and the workflow itself, tested on your real data. Days 36–45: we go live, train your team, set a usage policy and switch on your ROI dashboard.',
    },
    {
      q: "What if it isn't live in 45 days?",
      a: "Then we keep working at no charge until it is live in production.",
    },
    {
      q: 'Will you tell us which AI tools to cancel?',
      a: "Yes. The Rescue starts with a review of everything you're paying for and what it's delivering, with a clear verdict on each: keep it, fix it or cut it. Our build vs. buy advice is independent, because we don't take vendor commissions.",
    },
    {
      q: 'How is ROI tracked?',
      a: 'A live ROI dashboard tracks time saved, costs avoided and revenue influenced from day one, and we report ROI to you every month.',
    },
    {
      q: 'What happens after launch?',
      a: 'We run it. Three months of Run are included: we monitor accuracy, cost and uptime and report ROI monthly. After that, it moves onto an AI Workforce plan, and we propose the next AI worker when you are ready.',
    },
  ],
};

/** Visible FAQs on each service page. Every answer restates facts already published on the site. */
export const serviceFaqs: Record<ServiceSlug, FaqItem[]> = {
  'ai-consulting': [
    {
      q: 'What does AI consulting include?',
      a: 'The AI Opportunity Audit, an AI spend review (keep, fix or cut), build vs. buy analysis and vendor evaluation, ROI targets for every initiative, and change management and team adoption. For ongoing leadership, the Fractional Head of AI retainer adds a monthly strategy session, roadmap, vendor and spend review, and governance.',
    },
    {
      q: 'What is the AI Opportunity Audit?',
      a: auditAnswer,
    },
    {
      q: 'How much is the Fractional Head of AI?',
      a: `${monthly(FRACTIONAL_PRICE)}, with a 3-month minimum. It is included in the AI Workforce Department plan.`,
    },
    {
      q: 'Why start with consulting instead of building straight away?',
      a: "Because the most expensive AI mistake isn't choosing the wrong tool. It's solving the wrong problem. We find where AI will actually save time, recover revenue or cut cost in your business, and where it won't.",
    },
    {
      q: 'Do you just hand over a strategy deck?',
      a: 'No. The audit ends with a ranked plan of AI workers, and the same team builds and runs them on a monthly plan, with an impact report every month.',
    },
  ],
  'ai-automation': [
    {
      q: 'What kind of work can you automate?',
      a: "The repetitive, rules-based work that eats your team's week: data entry, back-office and admin tasks, invoicing, payment reminders and reconciliation, onboarding, and automated reports and dashboards.",
    },
    {
      q: 'How is automation priced?',
      a: `Each automation is delivered as an AI worker on Lapis AI Workforce, from ${monthly(aiWorkforce.startingPrice)} for your first AI worker. Monitoring, fixes, model upgrades and hosting are included in the monthly fee. No hourly billing.`,
    },
    {
      q: 'Do I need to change the tools I use?',
      a: 'No. Automations connect to the tools you already use, such as WhatsApp, Google Workspace, Microsoft 365, your CRM, accounting software or PMS.',
    },
    {
      q: 'What happens if an automation breaks?',
      a: 'Every AI worker is documented, monitored and maintained. We usually see a problem before you do, and fixing it is part of the monthly fee, not an extra invoice.',
    },
    {
      q: 'How quickly will it be live?',
      a: 'Most AI workers go live 2–4 weeks after signing.',
    },
  ],
  'agentic-workflows': [
    {
      q: 'What is an agentic workflow?',
      a: 'AI that does the work, not just the chat. Custom AI agents read, decide and act across your systems: answering customers, qualifying leads, processing documents and watching your market, with a person stepping in when judgement is needed.',
    },
    {
      q: 'How are AI agents priced?',
      a: `Lead response agents run on Lapis Lead Desk, from ${monthly(leadDesk.startingPrice)}. Other agents run as AI workers on Lapis AI Workforce, from ${monthly(aiWorkforce.startingPrice)}. A Market Watch AI worker can be added to any plan for ${monthly(MARKET_WATCH_PRICE)}.`,
    },
    {
      q: 'How do you stop an AI agent from making mistakes?',
      a: 'Guardrails, testing and human handoff are built into every agent. Agents are trained on your business and tested before they go live, and anything that needs judgement is passed to a person.',
    },
    {
      q: "Will customers know they're talking to AI?",
      a: 'Yes, if you want them to, and we recommend it. Our assistants are accurate, polite and hand over to a person whenever a conversation needs one.',
    },
  ],
  'ai-infrastructure': [
    {
      q: 'What does AI infrastructure include?',
      a: 'Data pipelines that clean and combine your data; integrations with your CRM, ERP, accounting, PMS and WhatsApp; model orchestration with fallbacks and evaluation; monitoring for accuracy, cost and uptime; and security, access control and audit logging.',
    },
    {
      q: 'How much does AI infrastructure cost?',
      a: 'It is included in every Lead Desk and AI Workforce subscription: hosting, security and backups are bundled into the monthly fee and never billed separately.',
    },
    {
      q: 'Why do AI pilots fail without it?',
      a: "Most AI pilots fail because of what's missing underneath them. They are tested on clean examples, then meet real data spread across systems, with no monitoring, logging or fallback, so they work until they don't.",
    },
    {
      q: 'Our data is a mess. Is that a problem?',
      a: "No, it's normal. Cleaning and connecting data is part of what we do, and it's usually why other AI projects failed.",
    },
    {
      q: 'How do you keep AI systems accurate and dependable?',
      a: 'We monitor accuracy, cost and uptime, run models with fallbacks and evaluation, and build in security, access control and audit logging, with a 99.5% uptime target for systems we host.',
    },
  ],
  'ai-analytics-training': [
    {
      q: 'Which training programmes do you offer?',
      a: 'Three: Training on AI Integration & Readiness for Businesses, Advanced Analytics, and AI on Spreadsheets & Reporting.',
    },
    {
      q: 'How is training delivered and priced?',
      a: `As a Team AI Workshop: a half-day, practical session for up to 20 people, for ${pricePair(WORKSHOP_PRICE)}. It leads into the AI Opportunity Audit.`,
    },
    {
      q: 'Who is the training for?',
      a: 'Leaders and teams getting ready to bring AI into the business, teams that want more from the data they already have, and anyone who spends their day in spreadsheets.',
    },
    {
      q: 'What does the spreadsheets and reporting programme cover?',
      a: 'Using AI features in Excel and Google Sheets, writing and checking formulas with AI, cleaning up messy data faster, automating recurring reports and summaries, and checking AI output before it reaches a client or the board.',
    },
    {
      q: 'Can you build what the training uncovers?',
      a: "Yes. When the workshop turns up a workflow worth automating, the AI Opportunity Audit ranks it, and the same team builds it as an AI worker. Once it's live, the Lapis Run standard keeps it monitored, fixed and improving, with a monthly impact report.",
    },
  ],
};
