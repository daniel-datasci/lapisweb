/**
 * llms.txt (https://llmstxt.org) and llms-full.txt, generated at build time from the same
 * data the pages render, so AI answer engines get the site's facts without running JavaScript.
 */
import { solutions } from '@/data/solutions';
import { services } from '@/data/services';
import { industries } from '@/data/industries';
import { caseStudies } from '@/data/testimonials';
import { blogPosts } from '@/data/blog';
import {
  PRICING_NOTE,
  commercialTerms,
  everyPlanIncludes,
  extraNgn,
  extras,
  extraUsd,
  guarantees,
  ngn,
  ownership,
  pricingFaqs,
  productFromPrice,
  products,
  runStandard,
  usd,
  workerEssentials,
  type Product,
} from '@/data/pricing';
import { faqs, serviceFaqs, solutionFaqs, type FaqItem } from '@/data/faqs';
import { clientExpectations, processSteps } from '@/data/process';
import {
  AREA_SERVED_LABEL,
  CONTACT_EMAIL,
  FOUNDING_YEAR,
  LEGAL_NAME,
  LOCATION,
  PHONE_LINES,
  SITE_DESCRIPTION,
  SITE_NAME,
  SLOGAN,
  SOCIAL_LINKS,
  absoluteUrl,
} from '@/data/site';
import { PAGES, blogPostMeta, caseStudyMeta, industryMeta, serviceMeta, solutionMeta } from './routes';

const plain = (s: string) => s.replace(/\*\*([^*]+)\*\*/g, '$1').replace(/\*([^*\s][^*]*)\*/g, '$1');
const link = (label: string, path: string, note?: string) =>
  `- [${label}](${absoluteUrl(path)})${note ? `: ${note}` : ''}`;

const keyFacts = () => [
  `- Legal name: ${LEGAL_NAME}`,
  `- Founded: ${FOUNDING_YEAR}`,
  `- Based in: ${LOCATION.label}`,
  `- Serves: ${AREA_SERVED_LABEL}`,
  `- Brand line: ${SLOGAN}`,
  ...PHONE_LINES.map((p) => `- Phone and WhatsApp (${p.country}): ${p.display}`),
  `- Email: ${CONTACT_EMAIL}`,
  `- LinkedIn: ${SOCIAL_LINKS.linkedin}`,
  `- Instagram: ${SOCIAL_LINKS.instagram}`,
  `- Google Business Profile: ${SOCIAL_LINKS.googleBusiness}`,
];

const AUDIT = extras.find((e) => e.id === 'audit')!;

const productLine = (p: Product) => `${p.name} (${p.kind.toLowerCase()}, ${p.pillar}): ${p.blurb} ${productFromPrice(p)}.`;

const tierLines = (p: Product) =>
  (p.tiers ?? []).map(
    (t) =>
      `- ${t.name}${t.popular ? ' (most popular)' : ''}: ${t.from ? 'from ' : ''}${usd(t.monthly.usd)}/month · ${t.from ? 'from ' : ''}${ngn(t.monthly.ngn)}/month. ${t.features.join('; ')}. Onboarding: ${
        t.onboarding ? `${usd(t.onboarding.usd)} · ${ngn(t.onboarding.ngn)}` : t.onboardingNote
      }.`,
  );

export function buildLlmsTxt(): string {
  const lines = [
    `# ${SITE_NAME}`,
    '',
    `> ${SITE_DESCRIPTION}`,
    '',
    `${SITE_NAME} is an AI automation and AI agents company based in ${LOCATION.label}. It sells operated AI on subscription: "Hire AI workers, not more staff. We build them, run them, and show you what they did every month." Every AI worker comes with a job description, a KPI, an operator (Lapis monitors and fixes it under an SLA) and a monthly impact report. Every engagement starts with a free 30-minute discovery call.`,
    '',
    '## Key facts',
    '',
    ...keyFacts(),
    '',
    '## Solutions',
    '',
    ...solutions.map((s) => link(s.name, s.path, solutionMeta(s.id).description)),
    link('All solutions', PAGES.solutions.path, PAGES.solutions.description),
    '',
    '## Services',
    '',
    ...services.map((s) => link(s.name, s.path, s.seoDescription)),
    link('All services', PAGES.services.path, PAGES.services.description),
    '',
    '## Industries',
    '',
    ...industries.map((i) => link(i.name, i.path, industryMeta(i).description)),
    '',
    '## How it works',
    '',
    ...processSteps.map((s) => `- ${s.phase}: ${s.title}. ${s.body}`),
    link('How it works', PAGES.howItWorks.path, PAGES.howItWorks.description),
    '',
    '## Pricing',
    '',
    ...products.map((p) => `- ${productLine(p)}`),
    `- ${AUDIT.name}: ${extraUsd(AUDIT)} · ${extraNgn(AUDIT)}. ${AUDIT.description}`,
    `- Every plan includes: ${everyPlanIncludes.join('; ')}.`,
    `- ${PRICING_NOTE}`,
    link('Pricing', PAGES.pricing.path, PAGES.pricing.description),
    '',
    '## Case studies',
    '',
    ...caseStudies.map((c) => link(c.title, caseStudyMeta(c).path, `${c.industry}. ${c.problem}`)),
    '',
    '## Blog',
    '',
    ...blogPosts.map((p) => link(p.title, blogPostMeta(p).path, p.excerpt)),
    '',
    '## Company',
    '',
    link(PAGES.about.label, PAGES.about.path, PAGES.about.description),
    link('Book a free discovery call', PAGES.contact.path, PAGES.contact.description),
    '',
    '## Optional',
    '',
    `- [Full site content for LLMs](${absoluteUrl('/llms-full.txt')}): every solution, service, industry, case study and blog post in one plain-markdown file`,
    `- [Sitemap](${absoluteUrl('/sitemap.xml')})`,
    '',
  ];
  return lines.join('\n');
}

const faqBlock = (items: FaqItem[]) => items.flatMap((f) => [`### ${f.q}`, '', f.a, '']);

/** Blog bodies already use "## ", "- " and "> " markup; demote headings one level. */
const postBody = (body: string[]) =>
  body.flatMap((line) => [line.startsWith('## ') ? `#${line}` : plain(line), '']);

export function buildLlmsFullTxt(): string {
  const out: string[] = [
    `# ${SITE_NAME}: full site content`,
    '',
    `> ${SITE_DESCRIPTION}`,
    '',
    `This file collects the main content of ${absoluteUrl('/')} in plain markdown. A shorter index is at ${absoluteUrl('/llms.txt')}.`,
    '',
    '## Key facts',
    '',
    ...keyFacts(),
    '',
  ];

  out.push('## Solutions', '');
  for (const s of solutions) {
    out.push(
      `### ${s.name} (${s.theme})`,
      '',
      `URL: ${absoluteUrl(s.path)}`,
      '',
      `"${s.quote}"`,
      '',
      s.body,
      '',
      `${s.stat} (Source: ${s.statSource})`,
      '',
      `#### ${s.name}: questions and answers`,
      '',
      ...solutionFaqs[s.id].flatMap((f) => [`**${f.q}**`, '', f.a, '']),
    );
  }

  out.push('## Services', '');
  for (const s of services) {
    out.push(
      `### ${s.name}`,
      '',
      `URL: ${absoluteUrl(serviceMeta(s).path)}`,
      '',
      plain(s.headline),
      '',
      plain(s.body),
      '',
      "What's included:",
      '',
      ...s.bullets.map((b) => `- ${plain(b)}`),
      '',
      `How it's delivered and priced: ${s.delivery.title}. ${s.delivery.body}`,
      '',
    );
    for (const p of s.programmes ?? []) {
      out.push(`Programme: ${p.title}. ${plain(p.body)}`, '', ...p.points.map((pt) => `- ${plain(pt)}`), '');
    }
    out.push(`Powers: ${s.powersLine}`, '', `#### ${s.name}: questions and answers`, '');
    out.push(...serviceFaqs[s.slug].flatMap((f) => [`**${f.q}**`, '', f.a, '']));
  }

  out.push('## Industries', '');
  for (const i of industries) {
    out.push(
      `### ${i.name}`,
      '',
      `URL: ${absoluteUrl(i.path)}`,
      '',
      ...(i.examples ? [`Includes: ${i.examples}.`, ''] : []),
      `${i.heroHeading} ${i.heroSub}`,
      '',
      ...solutions.map((s) => `- ${s.name}: ${i.deploy[s.id]}`),
      '',
    );
  }

  out.push('## How it works', '', `URL: ${absoluteUrl(PAGES.howItWorks.path)}`, '');
  for (const s of processSteps) {
    out.push(`### ${s.phase}: ${s.title}`, '', s.body, '', ...s.points.map((p) => `- ${p}`), '');
  }
  out.push('### What we need from you', '', ...clientExpectations.map((e) => `- ${e}`), '');
  out.push('### Frequently asked questions', '', ...faqBlock(faqs).map((l) => (l.startsWith('### ') ? `#${l}` : l)));

  out.push('## Pricing', '', `URL: ${absoluteUrl(PAGES.pricing.path)}`, '');
  out.push(
    'Hire AI workers, not more staff. We build them, run them and report what they did every month, for a fraction of the cost of a hire. No large upfront build fees and no systems left behind after launch.',
    '',
    `Global clients are billed in USD; Nigeria-based clients are billed in NGN. ${PRICING_NOTE}`,
    '',
    '### Every AI worker comes with',
    '',
    ...workerEssentials.map((w) => `- ${w.title}: ${w.text}`),
    '',
  );
  for (const p of products) {
    out.push(`### ${p.name}: ${p.promise}`, '', `${p.kind}. ${p.blurb} ${productFromPrice(p)}. Solution page: ${absoluteUrl(p.solutionPath)}`, '');
    if (p.tiers) out.push(...tierLines(p), '');
    if (p.tierNote) out.push(p.tierNote, '');
  }
  out.push('### Projects, retainers and add-ons', '');
  out.push(...extras.map((e) => `- ${e.name} (${e.kind.toLowerCase()}): ${e.priceText ?? `${extraUsd(e)} · ${extraNgn(e)}`}. ${e.description}`), '');
  out.push('### The Lapis Run standard: what the monthly fee pays for', '', ...runStandard.map((r) => `- ${r.title}: ${r.text}`), '');
  for (const g of [...commercialTerms, guarantees, ownership]) {
    out.push(`### ${g.title}`, '', ...g.items.map((i) => `- ${i}`), '');
  }
  out.push('### Pricing questions', '', ...pricingFaqs.flatMap((f) => [`**${f.q}**`, '', f.a, '']));

  out.push('## Case studies', '');
  for (const c of caseStudies) {
    out.push(
      `### ${c.title}`,
      '',
      `URL: ${absoluteUrl(caseStudyMeta(c).path)}`,
      '',
      `Industry: ${c.industry}. Client: ${c.client}.`,
      '',
      `The problem: ${c.problem}`,
      '',
      `What we built: ${c.built}`,
      '',
      'Results:',
      '',
      ...c.results.map((r) => `- ${r.value} ${r.label}`),
      '',
      `> ${c.testimonial.quote} (${c.testimonial.name}, ${c.testimonial.company})`,
      '',
    );
  }

  out.push('## Blog', '');
  for (const p of blogPosts) {
    out.push(
      `### ${p.title}`,
      '',
      `URL: ${absoluteUrl(blogPostMeta(p).path)}`,
      `Published: ${p.date}${p.updated ? `. Updated: ${p.updated}` : ''}`,
      '',
      ...postBody(p.body),
    );
  }

  out.push(
    '## Contact',
    '',
    `Book a free 30-minute discovery call: ${absoluteUrl(PAGES.contact.path)}`,
    '',
    ...PHONE_LINES.map((p) => `- Phone and WhatsApp (${p.country}): ${p.display} (${p.whatsapp})`),
    `- Email: ${CONTACT_EMAIL}`,
    `- Location: ${LOCATION.label}`,
    '',
  );

  return out.join('\n').replace(/\n{3,}/g, '\n\n');
}
