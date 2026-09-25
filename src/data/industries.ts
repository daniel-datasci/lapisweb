import type { PillarId } from './solutions';

export type IndustrySlug =
  | 'professional-services'
  | 'healthcare'
  | 'real-estate'
  | 'hospitality'
  | 'ecommerce-retail'
  | 'logistics'
  | 'education'
  | 'saas';

export type Industry = {
  slug: IndustrySlug;
  path: string;
  name: string;
  /** Shorter label for the header dropdown, where the doc uses one. */
  navName?: string;
  matrixName: string;
  examples?: string;
  heroHeading: string;
  heroSub: string;
  /** Matrix cells: what we deploy for each pillar. */
  deploy: Record<PillarId, string>;
  /** "Sound familiar?" pains, one per pillar. */
  pains: Record<PillarId, string>;
  caseStudySlug?: string;
  offer: 'lead-leak' | 'audit';
  metaDescription: string;
  seoTitle: string;
};

export const industries: Industry[] = [
  {
    slug: 'professional-services',
    path: '/industries/professional-services',
    name: 'Professional Services',
    matrixName: 'Professional services',
    examples: 'Accounting, legal, consulting, agencies',
    heroHeading: 'Spend your hours on clients, not admin.',
    heroSub:
      'We automate document review, client onboarding, timesheets and reporting, qualify every enquiry and book the consultation, and turn scattered GPT experiments into governed, firm-wide tools.',
    deploy: {
      capacity: 'Document review, client onboarding, timesheets, reporting and internal knowledge assistants',
      leads: 'Enquiry qualification and consultation booking',
      'ai-spend': 'Turning partner-built GPT experiments into governed, firm-wide tools',
    },
    pains: {
      capacity: 'Document review, onboarding, timesheets and reporting eat the hours you should be spending on clients.',
      leads: 'New enquiries wait days for a reply, and consultations never get booked.',
      'ai-spend': 'Partners run their own GPT experiments, with no governance and no firm-wide tool to show for it.',
    },
    offer: 'lead-leak',
    metaDescription:
      'AI automation for accounting, legal, consulting and agency firms: document review, client onboarding, reporting, enquiry qualification and governed AI tools.',
    seoTitle: 'AI Automation for Professional Services | The Lapis AI',
  },
  {
    slug: 'healthcare',
    path: '/industries/healthcare',
    name: 'Healthcare & Clinics',
    matrixName: 'Healthcare & clinics',
    examples: 'Clinics, dental, diagnostics',
    heroHeading: 'Answer every patient, day and night, with less admin.',
    heroSub:
      'We handle WhatsApp and phone bookings 24/7, follow up on no-shows, and automate patient intake, reminders, records admin and billing, with the audit trails that safe, compliant AI use requires.',
    deploy: {
      capacity: 'Patient intake, reminders, records admin and billing',
      leads: '24/7 WhatsApp and phone booking, plus no-show follow-up',
      'ai-spend': 'Safe, compliant AI use with audit trails',
    },
    pains: {
      capacity: 'Patient intake, reminders, records admin and billing keep your front desk busy all day.',
      leads: 'Patients call or message after hours, get no answer and book somewhere else, and no-shows go unchased.',
      'ai-spend': "You want to use AI, but not without the safety, compliance and audit trails that patient care demands.",
    },
    offer: 'lead-leak',
    metaDescription:
      'AI for clinics, dental practices and diagnostics: 24/7 WhatsApp and phone booking, no-show follow-up, automated patient admin and safe, compliant AI use.',
    seoTitle: 'AI for Clinics & Healthcare: 24/7 Booking | The Lapis AI',
  },
  {
    slug: 'real-estate',
    path: '/industries/real-estate',
    name: 'Real Estate',
    matrixName: 'Real estate',
    heroHeading: 'Answer every buyer first. Spend less time in spreadsheets.',
    heroSub:
      'The agent who replies first and knows the market best wins the deal. We answer every property enquiry in under a minute and automate comparable-sales reports and market alerts, so your agents stay in front of clients.',
    deploy: {
      capacity: 'Automated comparable-sales reports, listing admin and market watch',
      leads: 'Instant replies to property enquiries, viewing booking and follow-up',
      'ai-spend': 'A combined view across CRM and listings data',
    },
    pains: {
      capacity: 'Agents spend their mornings pulling comparable sales and doing listing admin by hand.',
      leads: 'Property enquiries wait hours for a reply, and viewings and follow-ups slip through the cracks.',
      'ai-spend': 'Your CRM and listings data sit in separate places, so nobody sees the full picture.',
    },
    caseStudySlug: 'real-estate-market-monitor',
    offer: 'lead-leak',
    metaDescription:
      'AI for real estate agencies: instant replies to property enquiries, viewing booking and follow-up, automated comparable-sales reports and market alerts.',
    seoTitle: 'AI for Real Estate Agencies & Brokerages | The Lapis AI',
  },
  {
    slug: 'hospitality',
    path: '/industries/hospitality',
    name: 'Hospitality',
    matrixName: 'Hospitality',
    examples: 'Hotels, short-lets, restaurants',
    heroHeading: 'Fill more rooms without adding more staff.',
    heroSub:
      "Every direct-booking enquiry answered instantly, guest messages handled day and night, and live competitor rates fed into your PMS, so your revenue team prices on today's market, not yesterday's report.",
    deploy: {
      capacity: 'Guest messaging, reviews and ops reporting',
      leads: 'Direct-booking enquiries answered instantly on every channel',
      'ai-spend': 'Rate intelligence integrated with your PMS and channel manager',
    },
    pains: {
      capacity: "Guest messages, reviews and ops reporting pile up on a team that's already stretched.",
      leads: 'Direct-booking enquiries sit unanswered, so guests book through someone else.',
      'ai-spend': "Rates are set on yesterday's report because live market data never reaches your PMS and channel manager.",
    },
    caseStudySlug: 'hospitality-rate-intelligence',
    offer: 'lead-leak',
    metaDescription:
      'AI for hotels, short-lets and restaurants: direct-booking enquiries answered instantly, guest messaging day and night, and rate intelligence linked to your PMS.',
    seoTitle: 'AI for Hotels, Short-Lets & Restaurants | The Lapis AI',
  },
  {
    slug: 'ecommerce-retail',
    path: '/industries/ecommerce-retail',
    name: 'E-commerce & Retail',
    matrixName: 'E-commerce & retail',
    heroHeading: 'Sell on every channel without adding more staff.',
    heroSub:
      'Sales assistants answer every DM and WhatsApp message and follow up abandoned carts. Order updates, returns, stock alerts and supplier admin run automatically, and competitor prices and demand are monitored for you.',
    deploy: {
      capacity: 'Order updates, returns, stock alerts and supplier admin',
      leads: 'DM and WhatsApp sales assistants, plus abandoned-cart follow-up',
      'ai-spend': 'Competitor price monitoring and demand insight',
    },
    pains: {
      capacity: "Order updates, returns, stock alerts and supplier admin swallow your team's day.",
      leads: 'DMs and WhatsApp messages go unanswered, and abandoned carts never get a follow-up.',
      'ai-spend': 'Competitors change their prices and you find out late, with no clear view of demand.',
    },
    offer: 'audit',
    metaDescription:
      'AI for e-commerce and retail: DM and WhatsApp sales assistants, abandoned-cart follow-up, automated order and supplier admin, and competitor price monitoring.',
    seoTitle: 'AI for E-commerce & Retail Businesses | The Lapis AI',
  },
  {
    slug: 'logistics',
    path: '/industries/logistics',
    name: 'Logistics',
    matrixName: 'Logistics',
    heroHeading: 'Quote faster. Spend less time on paperwork.',
    heroSub:
      'Quote requests answered and priced fast, dispatch updates, proof-of-delivery processing and invoicing automated, and live operations dashboards built from your fragmented systems.',
    deploy: {
      capacity: 'Dispatch updates, proof-of-delivery processing and invoicing',
      leads: 'Quote requests answered and priced fast',
      'ai-spend': 'Live operations dashboards built from fragmented systems',
    },
    pains: {
      capacity: 'Dispatch updates, proof-of-delivery paperwork and invoicing keep your team at their desks.',
      leads: 'Quote requests wait while someone works out the price, and the customer moves on.',
      'ai-spend': "Your operations data is spread across fragmented systems, so there's no live view of what's happening.",
    },
    offer: 'audit',
    metaDescription:
      'AI for logistics: quote requests answered and priced fast, automated dispatch updates, proof-of-delivery processing and invoicing, and live ops dashboards.',
    seoTitle: 'AI for Logistics: Faster Quotes, Less Admin | The Lapis AI',
  },
  {
    slug: 'education',
    path: '/industries/education',
    name: 'Education & Training',
    navName: 'Education',
    matrixName: 'Education & training',
    heroHeading: 'Answer every prospective student. Give your staff their hours back.',
    heroSub:
      'Every prospective student enquiry answered and followed up, admissions admin, student questions and fee reminders automated, and responsible AI adoption across your staff.',
    deploy: {
      capacity: 'Admissions admin, student questions and fee reminders',
      leads: 'Prospective student enquiries answered and followed up',
      'ai-spend': 'Responsible AI adoption across staff',
    },
    pains: {
      capacity: "Admissions admin, student questions and fee reminders take up your staff's week.",
      leads: 'Prospective students enquire, hear nothing back and enrol somewhere else.',
      'ai-spend': 'Staff are trying AI tools on their own, with no plan for adopting them responsibly.',
    },
    offer: 'lead-leak',
    metaDescription:
      'AI for schools and training providers: student enquiries answered and followed up, automated admissions admin and fee reminders, and responsible AI adoption.',
    seoTitle: 'AI for Schools & Training Providers | The Lapis AI',
  },
  {
    slug: 'saas',
    path: '/industries/saas',
    name: 'SaaS & Tech',
    matrixName: 'SaaS & tech',
    heroHeading: 'Scale revenue and support without scaling headcount.',
    heroSub:
      'Inbound leads routed and answered in minutes, support triaged automatically, competitor changes flagged the same day, and your internal AI pilots finally in production.',
    deploy: {
      capacity: 'Support triage, onboarding and internal reporting',
      leads: 'Inbound lead response and routing within minutes',
      'ai-spend': 'Taking internal AI pilots to production, plus competitor watch',
    },
    pains: {
      capacity: 'Support tickets, onboarding and internal reporting grow faster than your team.',
      leads: 'Inbound leads sit in a queue for hours before anyone routes or answers them.',
      'ai-spend': 'Internal AI pilots never reach production, and competitor changes go unnoticed for weeks.',
    },
    caseStudySlug: 'saas-competitive-intelligence',
    offer: 'audit',
    metaDescription:
      'AI for SaaS and tech companies: inbound lead response and routing in minutes, support triage, onboarding and reporting automation, and competitor watch.',
    seoTitle: 'AI for SaaS & Tech: Scale Without Headcount | The Lapis AI',
  },
];

export const industryBySlug = (slug?: string) => industries.find((i) => i.slug === slug);
