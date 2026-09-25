import type { PillarId } from './solutions';

export type BlogPost = {
  slug: string;
  title: string;
  category: PillarId;
  excerpt: string;
  /** ISO date (YYYY-MM-DD). */
  date: string;
  /** ISO date of the last meaningful edit, if any. */
  updated?: string;
  readTime: string;
  /** Search title (50-60 chars) when the post title is too long. */
  seoTitle?: string;
  /** Search description (140-160 chars) when the excerpt doesn't fit. */
  seoDescription?: string;
  /**
   * Paragraphs. A line starting with "## " is a subheading, "- " is a list item
   * (consecutive items are grouped) and "> " is a pull quote.
   */
  body: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: 'market-watch-what-competitors-changed-this-week',
    title: 'Market Watch: How to Know What Competitors Changed This Week',
    category: 'capacity',
    excerpt:
      "Checking competitor websites by hand is a job nobody has time for, so it doesn't get done. Here's how a market watch workflow tells you what changed this week, without adding it to anyone's to-do list.",
    date: '2026-07-15',
    seoTitle: 'Market Watch: Track What Competitors Changed | The Lapis AI',
    seoDescription:
      "Checking competitor websites by hand is a job nobody has time for. Here's how a market watch workflow tells you what changed this week, with no extra work.",
    readTime: '5 min read',
    body: [
      "Ask most growing businesses what their competitors changed this week and you'll get a shrug. Not because nobody cares, but because checking prices, launches and job posts by hand is a job nobody has time for. So it slips down the list, and the first sign of a change arrives as a lost deal or a surprised customer.",
      "That's a capacity problem, not a strategy problem. The information is usually out there. What's missing is the hours to collect it, check it and turn it into something your team can act on.",
      '## What a market watch workflow does',
      "Market watch is one of the workflows we run under Grow Without Hiring. Agents track competitors' prices, launches and hiring, plus market shifts, and send you a short brief, so you always know what changed. Nobody on your team has to open a single competitor website to get there.",
      "For one B2B SaaS company, competitors' price and feature changes used to go unnoticed for weeks, and the sales team kept losing deals it couldn't explain. We put 6+ agents to work watching five competitors, feeding alerts and a weekly brief to the sales and marketing team. Market changes are now spotted and flagged in under four hours.",
      "> We used to find out about a competitor's price change from a lost deal. Now we know the same day they do. It changed how our whole team sells. (VP of Sales, Mid-Market SaaS Platform)",
      '## It works outside software too',
      'A regional real estate brokerage uses the same idea across 12 local areas. Its agents used to spend their mornings pulling comparable sales by hand, and were the last to know about price drops and new listings in their own areas. Now automated comparable-sales reports and instant alerts do that work. Agents got 8+ hours a week back, and spent them with clients.',
      "A boutique hotel group runs continuous rate and demand monitoring across its competitive set, integrated with its PMS, so the revenue team prices on today's market, not yesterday's report.",
      '## What makes a market watch worth having',
      '- It is run, not just built. We monitor every workflow 24/7 and fix issues before your team notices.',
      '- It is short. The goal isn\'t more data. It\'s a brief your team actually reads, with the changes that matter.',
      '- It is checked. Guardrails, testing and human handoff are built in, so anything unusual goes to a person.',
      '- It proves its value. Each month, you get a report of hours returned, tasks completed and errors caught.',
      '## Where to start',
      "If you want to know what your competitors changed this week without giving someone another job, start with a free AI audit. In 60 minutes, we'll map where your team's time goes and show you the first three workflows to automate. Market watch may well be one of them.",
    ],
  },
  {
    slug: 'ai-consulting-vs-hiring-ai-engineer',
    title: 'AI Consulting vs. Hiring an AI Engineer: What Growing Businesses Need First',
    category: 'ai-spend',
    excerpt:
      'Before you hire an AI engineer, make sure you know what to build. The most expensive AI mistake isn\u2019t hiring the wrong person \u2014 it\u2019s building the wrong thing.',
    date: '2026-07-10',
    seoTitle: 'AI Consulting vs. Hiring an AI Engineer | The Lapis AI',
    readTime: '5 min read',
    body: [
      'When a growing business decides to \u201cdo AI,\u201d the instinct is to hire. An AI engineer, a data scientist, maybe a whole team. It feels like progress.',
      'But here\u2019s what actually happens: the engineer arrives, looks around for a problem to solve, and starts building something interesting \u2014 that may or may not connect to revenue, efficiency, or any decision the business actually makes.',
      'AI consulting comes first. Not because consultants are smarter than engineers, but because the question \u201cwhat should we build?\u201d is harder and more important than \u201chow do we build it?\u201d A readiness audit identifies where AI actually moves the needle in your business \u2014 and, just as importantly, where it doesn\u2019t.',
      'The right sequence is: strategy, then infrastructure, then agents, then optimization. Hiring an engineer before you\u2019ve answered the strategy question is how AI pilots die.',
    ],
  },
  {
    slug: 'why-ai-agent-pilots-never-reach-production',
    title: 'Why Most AI Pilots Never Reach Production',
    category: 'ai-spend',
    excerpt:
      'A demo that works on three clean examples is not a production system. Here are the four reasons your AI agent pilot will stall \u2014 and how to avoid them.',
    date: '2026-07-05',
    seoTitle: 'Why Most AI Pilots Never Reach Production | The Lapis AI',
    readTime: '7 min read',
    body: [
      'The demo is impressive. The agent handles the input gracefully, returns the right answer, and everyone in the room nods. Then it goes to production and falls apart.',
      'Reason one: the data underneath it is unreliable. The agent was tested on clean, structured inputs. Production data is messy, inconsistent, and incomplete. Without solid data pipelines, the agent is working on sand.',
      'Reason two: there\u2019s no evaluation loop. Nobody defined what \u201cgood\u201d looks like, so nobody notices when the agent drifts. Production agents need continuous evaluation \u2014 not just monitoring that they\u2019re running, but monitoring that they\u2019re right.',
      'Reason three: the workflow wasn\u2019t designed for an agent. Someone tried to bolt an agent onto a process that still expects a human at every step. Agents work best when the workflow is redesigned around what they do well.',
      'Reason four: no infrastructure. The agent runs on a laptop or a single server with no redundancy, no logging, no error handling. It works until it doesn\u2019t, and then nobody knows why.',
      'The fix is unglamorous: build the infrastructure first, design the evaluation loop, rethink the workflow, and only then deploy the agent. It\u2019s slower. It also works.',
    ],
  },
  {
    slug: 'real-cost-of-a-slow-reply',
    title: 'The Real Cost of a Slow Reply',
    category: 'leads',
    excerpt:
      'They messaged you at 9pm. By the time you replied, someone else already had. Here is what a slow reply really costs, and how to stop the leak.',
    date: '2026-06-28',
    seoTitle: 'The Real Cost of a Slow Reply to New Leads | The Lapis AI',
    readTime: '5 min read',
    body: [
      'A customer messages you at 9pm. Another calls while your team is with a client. A third fills in the form on your website and waits. And while they wait, someone else replies.',
      "None of them tell you they're leaving. They just go elsewhere. That's what makes a slow reply so expensive: the cost never shows up on a report, so it's easy to believe it isn't there.",
      '## Speed wins the lead',
      'Harvard Business Review research from 2011 found that firms that reply to an enquiry within an hour are about seven times more likely to qualify the lead than those that wait longer. It is not a new study, but the lesson has not changed: the business that replies first gets the first real conversation.',
      '## Where replies go missing',
      "It's rarely because nobody cares. Most leaks come from the same few places:",
      '- Calls go to voicemail at your busiest times.',
      '- After-hours and weekend enquiries go cold by Monday.',
      '- Follow-ups depend on someone remembering.',
      "- Customer conversations sit on staff's personal phones, and leave when they do.",
      '- Leads arrive on five channels and nobody sees them all.',
      'Business owners describe it the same way. As one small business owner put it:',
      '> I counted 6 enquiries that went cold before I could properly respond to them. All of them came in during busy periods or after hours.',
      "A dental practice was blunter: “One missed call and they are on to the next opportunity.” And even when the first reply happens, the follow-up often doesn't. In one service business owner's words: “I lose so many potential clients because I send one email and then just… don't follow up.”",
      "## Why a generic bot isn't the answer",
      'Plenty of businesses have tried a chatbot once, and found it annoyed customers more than it helped. Generic scripts sometimes invent answers, bot-only conversations hit frustrating dead ends, and the tool is measured on messages sent rather than bookings made.',
      '## What fixing it looks like',
      'The fix is one response system instead of five disconnected tools. WhatsApp, phone, website chat, email, Instagram and Facebook all feed one system, so no enquiry falls through the gaps. An AI assistant answers in under 60 seconds, 24/7, using your real prices, services and policies. It asks the right questions, scores the lead and books it straight into your calendar or CRM.',
      'High-value, complex or emotional conversations go to the right person on your team immediately, with the full context. Polite, personal follow-ups continue until the lead books or says no, so nobody is forgotten. AI for speed, humans for judgement.',
      '## Measure what you recover',
      "The point isn't to send more messages. It's to win more customers. So the number that matters is revenue recovered: a monthly report of enquiries answered, response times, bookings made and the revenue they represent.",
      '## Find your leak',
      "Most businesses have never measured how many enquiries go unanswered, or how long replies really take. That's what a free Lead Leak Audit is for. We'll review your enquiry channels and show you how many leads went unanswered, how long replies took and what that likely cost you.",
    ],
  },
  {
    slug: 'ai-infrastructure-101',
    title: 'AI Infrastructure 101: What\u2019s Actually Underneath a \u201cSmart\u201d Dashboard',
    category: 'ai-spend',
    excerpt:
      'A smart dashboard is the tip of the iceberg. Here\u2019s the four-layer stack underneath it \u2014 and why skipping any layer makes the whole thing collapse.',
    date: '2026-06-20',
    seoTitle: 'AI Infrastructure 101: The Four Layers | The Lapis AI',
    readTime: '8 min read',
    body: [
      'When someone shows you a \u201csmart dashboard,\u201d they\u2019re showing you the top of a stack. What you don\u2019t see is the four layers underneath that make it work.',
      'Layer one: data pipelines. Your data lives in five different systems that don\u2019t talk to each other. Pipelines extract, clean, and consolidate it into one place where an AI can actually use it.',
      'Layer two: integrations. The dashboard needs to pull from your CRM, your billing system, your product analytics, and your competitor monitoring agents. Each of those is a separate integration that has to be built, maintained, and secured.',
      'Layer three: model orchestration. The AI models that power the insights don\u2019t run themselves. They need to be called in the right order, with the right inputs, with fallbacks when one fails, and with evaluation to make sure the outputs are trustworthy.',
      'Layer four: the dashboard itself. This is the part everyone sees \u2014 and it\u2019s the easiest part to build. It\u2019s also the part that\u2019s useless if the three layers below it are shaky.',
      'Most AI pilots fail because someone built layer four and ignored layers one through three. The dashboard looks impressive in the demo. Then someone asks \u201cwhere does this data come from?\u201d and the answer is \u201cwe\u2019re not sure.\u201d',
    ],
  },
  {
    slug: 'build-vs-buy-ai-agent',
    title: 'Build vs. Buy: When a Custom AI Agent Beats an Off-the-Shelf Tool',
    category: 'ai-spend',
    excerpt:
      'Off-the-shelf AI tools are fast to start and slow to fit. Custom agents are slow to start and exact. Here\u2019s how to decide which one your workflow actually needs.',
    date: '2026-06-12',
    seoTitle: 'Build vs. Buy: When a Custom AI Agent Wins | The Lapis AI',
    seoDescription:
      'Off-the-shelf AI tools are fast to start and slow to fit. Custom agents are slow to start and exact. Here\u2019s how to decide which one your workflow needs.',
    readTime: '6 min read',
    body: [
      'The off-the-shelf AI tool promises everything: plug it in, configure a few settings, and your workflow is automated. For generic tasks \u2014 summarizing meeting notes, drafting emails \u2014 this works.',
      'But the moment your workflow has specificity \u2014 a particular data source, a particular decision logic, a particular output format your team relies on \u2014 the off-the-shelf tool starts to fight you. You work around its limitations, patch its gaps with manual steps, and eventually realize you\u2019ve built a Rube Goldberg machine around a tool that was supposed to save you time.',
      'A custom agent is the opposite trade-off. It takes longer to build \u2014 weeks, not minutes. But it does exactly what your workflow needs, connects to exactly your systems, and produces exactly the output your team uses. No workarounds.',
      'The rule of thumb: if your workflow is generic, buy. If your workflow is your competitive advantage, build. The things that make your business different are the things you shouldn\u2019t rent from a generic tool.',
    ],
  },
];

export const blogPostBySlug = (slug?: string) => blogPosts.find((p) => p.slug === slug);

export const formatPostDate = (date: string) =>
  new Date(`${date}T00:00:00Z`).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
