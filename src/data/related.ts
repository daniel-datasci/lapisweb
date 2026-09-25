import type { RelatedLink } from '@/components/RelatedLinks';
import { solutionById, type PillarId } from './solutions';
import { services } from './services';
import { caseStudies } from './testimonials';
import { blogPosts } from './blog';

/** Lower-cases words for use mid-sentence, keeping acronyms such as SaaS. */
export const lowerCase = (s: string) => s.replace(/[A-Za-z]+/g, (w) => (/[A-Z]\w*[A-Z]/.test(w) ? w : w.toLowerCase()));

const caseStudyLink = (c: (typeof caseStudies)[number]): RelatedLink => ({
  kicker: `Case study · ${c.industry}`,
  title: c.title,
  body: c.problem,
  to: `/case-studies/${c.slug}`,
  linkLabel: `Read the ${lowerCase(c.industry)} case study`,
});

const postLink = (p: (typeof blogPosts)[number]): RelatedLink => ({
  kicker: `Blog · ${p.readTime}`,
  title: p.title,
  body: p.excerpt,
  to: `/blog/${p.slug}`,
  linkLabel: 'Read the article',
});

/** Case studies, the services that power the solution, and the latest post on the same problem. */
export function solutionRelated(id: PillarId): RelatedLink[] {
  const studies = caseStudies.filter((c) => c.pillar === id).map(caseStudyLink);
  const powering = services
    .filter((s) => s.powers.includes(id))
    .map((s) => ({
      kicker: `Service ${s.num} · Powers ${solutionById[id].name}`,
      title: s.name,
      body: s.body,
      to: s.path,
      linkLabel: `Explore ${s.name}`,
    }));
  const latestPost = [...blogPosts]
    .filter((p) => p.category === id)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 1)
    .map(postLink);
  return [...studies, ...powering, ...latestPost];
}

export { caseStudyLink, postLink };
