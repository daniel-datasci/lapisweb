import type { ContactTopic } from './site';
import type { ProductId } from './pricing';

export type PillarId = 'capacity' | 'leads' | 'ai-spend';

export type Solution = {
  id: PillarId;
  num: string;
  name: string;
  path: string;
  theme: string;
  /** The product this pillar is sold as. */
  product: string;
  productId: ProductId;
  navDescription: string;
  topic: ContactTopic;
  quote: string;
  body: string;
  stat: string;
  statSource: string;
  linkLabel: string;
};

export const solutions: Solution[] = [
  {
    id: 'capacity',
    num: '①',
    name: 'Grow Without Hiring',
    path: '/solutions/grow-without-hiring',
    theme: 'Capacity',
    product: 'Lapis AI Workforce',
    productId: 'ai-workforce',
    navDescription: 'AI workers that give your team hours back',
    topic: 'capacity',
    quote: 'If I stop, everything stops.',
    body: 'Every approval, question and report runs through you or a few overloaded people. Growth means hiring, and hiring is slow and expensive. Our AI workers take on the work that bottlenecks you, so your team can move to higher-value work.',
    stat: '80% of workers and leaders say they lack the time or energy to do their work.',
    statSource: 'Microsoft Work Trend Index 2025',
    linkLabel: 'Get your hours back',
  },
  {
    id: 'leads',
    num: '②',
    name: 'Never Miss a Lead',
    path: '/solutions/never-miss-a-lead',
    theme: 'Revenue response',
    product: 'Lapis Lead Desk',
    productId: 'lead-desk',
    navDescription: 'Answer every enquiry in under 60 seconds',
    topic: 'leads',
    quote: 'How many customers went elsewhere today?',
    body: "Calls go unanswered when you're busy. WhatsApp messages sit overnight. Follow-ups never happen. We answer, qualify and book every enquiry in under 60 seconds, on every channel, day and night.",
    stat: 'Firms that reply within an hour are about 7× more likely to qualify a lead than those that wait longer.',
    statSource: 'Harvard Business Review research, 2011',
    linkLabel: 'Stop the revenue leak',
  },
  {
    id: 'ai-spend',
    num: '③',
    name: 'Make Your AI Pay',
    path: '/solutions/make-your-ai-pay',
    theme: 'AI to production',
    product: '45-Day AI Rescue',
    productId: 'ai-rescue',
    navDescription: 'Turn stalled AI into measurable return',
    topic: 'ai-spend',
    quote: 'We paid for AI and have nothing to show.',
    body: 'The tool worked in the demo, then stalled on your real data. Licences sit unused and nobody can show the ROI. We take the right AI project into production in 45 days and track its return from day one.',
    stat: '42% of companies abandoned most of their AI initiatives in 2025.',
    statSource: 'S&P Global',
    linkLabel: 'Make your AI investment pay',
  },
];

export const solutionById = Object.fromEntries(solutions.map((s) => [s.id, s])) as Record<PillarId, Solution>;

export const pillarTag = (id: PillarId) => `${solutionById[id].num} ${solutionById[id].name}`;

export const pillarFilters: { value: 'all' | PillarId; label: string }[] = [
  { value: 'all', label: 'All' },
  ...solutions.map((s) => ({ value: s.id, label: s.name })),
];
