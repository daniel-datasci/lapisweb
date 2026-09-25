/**
 * llms.txt (https://llmstxt.org) and llms-full.txt, generated at build time from the same
 * data the pages render, so AI answer engines get the site's facts without running JavaScript.
 */
import { solutions } from '@/data/solutions';
import { services } from '@/data/services';
import { industries } from '@/data/industries';
import { caseStudies } from '@/data/testimonials';
import { blogPosts } from '@/data/blog';
import { pricingTiers } from '@/data/pricing';
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

const tierLine = (t: (typeof pricingTiers)[number]) => `${t.name} (${t.price}): ${plain(t.tagline)}`;

export function buildLlmsTxt(): string {
  const lines = [
    `# ${SITE_NAME}`,
    '',
    `> ${SITE_DESCRIPTION}`,
    '',
    `${SITE_NAME} is an AI automation and AI agents company based in ${LOCATION.label}. It builds AI systems for growing businesses and then runs them: monitoring, maintenance, fixes and a monthly report of hours returned, leads answered and revenue recovered. Every engagement starts with a free 60-minute AI audit.`,
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
    ...pricingTiers.map((t) => `- ${tierLine(t)}`),
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
    link('Book a free AI audit', PAGES.contact.path, PAGES.contact.description),
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
  for (const t of pricingTiers) {
    out.push(`### ${t.name}: ${t.price}`, '', plain(t.tagline), '', ...t.features.map((f) => `- ${plain(f)}`), '');
  }

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
    `Book a free 60-minute AI audit: ${absoluteUrl(PAGES.contact.path)}`,
    '',
    ...PHONE_LINES.map((p) => `- Phone and WhatsApp (${p.country}): ${p.display} (${p.whatsapp})`),
    `- Email: ${CONTACT_EMAIL}`,
    `- Location: ${LOCATION.label}`,
    '',
  );

  return out.join('\n').replace(/\n{3,}/g, '\n\n');
}
