import type { PillarId } from './solutions';
import type { ServiceSlug } from './services';

export type FaqItem = { q: string; a: string };

export const faqs: FaqItem[] = [
  {
    q: 'Is this about replacing my staff?',
    a: 'No. Our clients use AI to add capacity, so the same team can serve more customers, grow into new markets and stop burning out. Most use their hours back to grow, not to cut jobs.',
  },
  {
    q: 'How quickly will I see results?',
    a: 'Most clients have a working system live in 4–6 weeks. Lead response systems are often faster. We always deliver something usable in the first month.',
  },
  {
    q: 'What happens after launch?',
    a: "We stay. We monitor, maintain and improve your systems under a service agreement, and you get a monthly results report. You're never left with a black box nobody understands.",
  },
  {
    q: 'What if something breaks?',
    a: 'We usually see it before you do. Every system has monitoring and alerts, and fixing issues is part of the service, not an extra invoice.',
  },
  {
    q: 'Do I need to change my current tools?',
    a: "No. We build around what you already use, such as WhatsApp, Google Workspace, Microsoft 365, your CRM, accounting software or PMS. If something truly needs changing, we'll tell you in the audit.",
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
    a: 'Yes. We work with businesses across Africa, the UK, US, Canada and Europe, with the same senior team and the same standards everywhere.',
  },
  {
    q: 'Can I start small?',
    a: 'Yes. Most clients start with one workflow or one channel, see the results, then expand.',
  },
];

/** Visible FAQs on each solution page. Every answer restates facts already published on the site. */
export const solutionFaqs: Record<PillarId, FaqItem[]> = {
  capacity: [
    {
      q: 'What does Grow Without Hiring automate?',
      a: "The repetitive work, handoffs and approvals that clog your team's week: admin and data entry, customer and staff questions, reporting and KPIs, approvals and handoffs, invoicing and payment chasing, onboarding, document processing, compliance checks and market watch. We build it on top of the tools you already use.",
    },
    {
      q: 'Is this about replacing my staff?',
      a: 'No. This is about capacity, not cutting jobs. Our clients use their hours back to serve more customers, grow into new markets and stop burning out their best people.',
    },
    {
      q: "Who looks after the automations once they're live?",
      a: 'We do. Most automations get built and then abandoned; ours are run. We monitor every workflow 24/7, fix issues before your team notices, and maintain and document everything under a service agreement.',
    },
    {
      q: "How will I know it's working?",
      a: 'Each month you get a report of hours returned, tasks completed and errors caught.',
    },
    {
      q: 'Where do I start?',
      a: "With a free 60-minute audit. We map where your team's time goes and show you the first three workflows to automate.",
    },
  ],
  leads: [
    {
      q: 'Which channels does Never Miss a Lead cover?',
      a: 'WhatsApp, phone, website chat, email, Instagram and Facebook all feed one system, so no enquiry falls through the gaps. It is one response system instead of five disconnected tools.',
    },
    {
      q: 'How fast are enquiries answered?',
      a: 'In under 60 seconds, 24/7. Your AI assistant replies using your real prices, services and policies, asks the right questions, scores the lead and books it straight into your calendar or CRM.',
    },
    {
      q: 'What happens when a customer needs a real person?',
      a: 'High-value, complex or emotional conversations go to the right person on your team immediately, with the full context. AI for speed, humans for judgement.',
    },
    {
      q: 'How is this different from a chatbot?',
      a: 'A typical AI receptionist runs generic scripts that sometimes invent answers, with frustrating dead ends. Ours is trained on your business with guardrails and testing, measured on bookings and revenue recovered, and monitored, tuned and improved monthly by our team.',
    },
    {
      q: 'What is the free Lead Leak Audit?',
      a: "We review your enquiry channels and show you how many leads went unanswered, how long replies took and what that likely cost you. If it doesn't change how you handle leads, you owe nothing.",
    },
  ],
  'ai-spend': [
    {
      q: 'What happens in the 45 days?',
      a: 'Days 1–10: we review your AI tools, pilots, spend and data, and choose the single workflow with the clearest return. Days 11–35: we build the data pipelines, integrations, evaluation tests and the workflow itself, tested on your real data. Days 36–45: we go live, train your team, set a usage policy and switch on your ROI dashboard.',
    },
    {
      q: 'Why do so many AI pilots stall?',
      a: "It's rarely the model. It's everything around it: messy data spread across systems, no measure of what good looks like, AI bolted onto a process designed for people, and no monitoring, logging or fallback underneath.",
    },
    {
      q: 'Will you tell us which AI tools to cancel?',
      a: "Yes. The AI spend audit covers everything you're paying for and what it's delivering, with a clear verdict on each: keep it, fix it or cut it. Our build vs. buy advice is independent, because we don't take vendor commissions.",
    },
    {
      q: 'How is ROI tracked?',
      a: 'A live ROI dashboard tracks time saved, costs avoided and revenue influenced from day one, and we report ROI to you every month.',
    },
    {
      q: 'What happens after launch?',
      a: "We run it. We monitor accuracy, cost and uptime, report ROI monthly, and roll out the next workflow when you're ready.",
    },
  ],
};

/** Visible FAQs on each service page. Every answer restates facts already published on the site. */
export const serviceFaqs: Record<ServiceSlug, FaqItem[]> = {
  'ai-consulting': [
    {
      q: 'What does AI consulting include?',
      a: 'A free 60-minute AI audit and written roadmap, an AI spend review (keep, fix or cut), build vs. buy analysis and vendor evaluation, ROI targets for every initiative, and change management and team adoption.',
    },
    {
      q: 'Why start with consulting instead of building straight away?',
      a: "Because the most expensive AI mistake isn't choosing the wrong tool. It's solving the wrong problem. We find where AI will actually save time, recover revenue or cut cost in your business, and where it won't.",
    },
    {
      q: 'What do I get from the free AI audit?',
      a: 'In 60 minutes we look at where your business is leaking time, leads and money. You leave with a written roadmap of your top three opportunities, whether or not you work with us.',
    },
    {
      q: 'Do you just hand over a strategy deck?',
      a: 'No. Consulting is the first step of every engagement, and the same team can build what we recommend. Every build comes with a team that runs it, with a monthly results report.',
    },
  ],
  'ai-automation': [
    {
      q: 'What kind of work can you automate?',
      a: "The repetitive, rules-based work that eats your team's week: data entry, back-office and admin tasks, invoicing, payment reminders and reconciliation, onboarding, and automated reports and dashboards.",
    },
    {
      q: 'Do I need to change the tools I use?',
      a: 'No. Automations connect to the tools you already use, such as WhatsApp, Google Workspace, Microsoft 365, your CRM, accounting software or PMS.',
    },
    {
      q: 'What happens if an automation breaks?',
      a: 'Every automation is documented, monitored and maintained. We usually see a problem before you do, and fixing it is part of the service, not an extra invoice.',
    },
    {
      q: 'How quickly will it be live?',
      a: 'Most clients have a working system live in 4–6 weeks, and we always deliver something usable in the first month.',
    },
  ],
  'agentic-workflows': [
    {
      q: 'What is an agentic workflow?',
      a: 'AI that does the work, not just the chat. Custom AI agents read, decide and act across your systems: answering customers, qualifying leads, processing documents and watching your market, with a person stepping in when judgement is needed.',
    },
    {
      q: 'What kinds of AI agents do you build?',
      a: 'Lead response and qualification agents, customer and staff support assistants, document and compliance agents, and research, reporting and market-watch agents.',
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
      q: 'Why do AI pilots fail without it?',
      a: "Most AI pilots fail because of what's missing underneath them. They are tested on clean examples, then meet real data spread across systems, with no monitoring, logging or fallback, so they work until they don't.",
    },
    {
      q: 'Our data is a mess. Is that a problem?',
      a: "No, it's normal. Cleaning and connecting data is part of what we do, and it's usually why other AI projects failed.",
    },
    {
      q: 'How do you keep AI systems accurate and dependable?',
      a: 'We monitor accuracy, cost and uptime, run models with fallbacks and evaluation, and build in security, access control and audit logging.',
    },
  ],
  'ai-analytics-training': [
    {
      q: 'Which training programmes do you offer?',
      a: 'Three: Training on AI Integration & Readiness for Businesses, Advanced Analytics, and AI on Spreadsheets & Reporting.',
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
      a: "Yes. When training turns up a workflow worth automating, the same team can build it with you. Once it's live, Lapis Run keeps it monitored, fixed and improving, with a monthly results report.",
    },
    {
      q: 'How do we get started?',
      a: "Tell us who you'd like to train and what they work on. We'll suggest the programme that fits.",
    },
  ],
};