import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Seo from '@/components/Seo';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import CTASection from '@/components/CTASection';
import FilterChips from '@/components/FilterChips';
import { blogPosts, formatPostDate } from '@/data/blog';
import { pillarFilters, pillarTag, solutionById, type PillarId } from '@/data/solutions';
import { SITE_NAME, absoluteUrl } from '@/data/site';
import { useHydrated } from '@/hooks/useHydrated';
import { ogImagePath } from '@/seo/og';
import { PAGES, blogPostMeta, crumbsFor } from '@/seo/routes';
import { orgRef } from '@/seo/schema';
import './Blog.css';

type Filter = 'all' | PillarId;

const isFilter = (v: string | null): v is Filter => pillarFilters.some((f) => f.value === v);

const crumbs = crumbsFor(PAGES.blog);
const BLOG_ID = `${absoluteUrl(PAGES.blog.path)}#blog`;

const blogNode = () => ({
  '@type': 'Blog',
  '@id': BLOG_ID,
  name: `${SITE_NAME} Blog`,
  url: absoluteUrl(PAGES.blog.path),
  description: PAGES.blog.description,
  inLanguage: 'en',
  publisher: orgRef,
  blogPost: blogPosts.map((post) => {
    const path = blogPostMeta(post).path;
    return {
      '@type': 'BlogPosting',
      '@id': `${absoluteUrl(path)}#article`,
      headline: post.title,
      url: absoluteUrl(path),
      description: post.excerpt,
      datePublished: post.date,
      dateModified: post.updated ?? post.date,
      articleSection: solutionById[post.category].name,
      image: absoluteUrl(ogImagePath(path)),
      author: orgRef,
      publisher: orgRef,
    };
  }),
});

export default function Blog() {
  const [params, setParams] = useSearchParams();
  // The static HTML lists every post; the category from the URL applies after hydration.
  const hydrated = useHydrated();
  const raw = hydrated ? params.get('category') : null;
  const filter: Filter = isFilter(raw) ? raw : 'all';
  const posts = filter === 'all' ? blogPosts : blogPosts.filter((p) => p.category === filter);

  const onChange = (value: Filter) => {
    const next = new URLSearchParams(params);
    if (value === 'all') next.delete('category');
    else next.set('category', value);
    setParams(next, { replace: true, preventScrollReset: true });
  };

  return (
    <>
      <Seo {...PAGES.blog} pageType="CollectionPage" crumbs={crumbs} mainEntityId={BLOG_ID} schema={[blogNode()]} />

      <PageHero
        crumbs={crumbs}
        eyebrow="Blog"
        text="Practical AI for growing businesses."
        splitIndex={0}
        staticHeading
        subtext="No hype. Just clear thinking on how to get your hours back, stop losing customers and make your AI investment pay."
        ctaLabel=""
      >
        <div className="hero-filters fade-up" style={{ animationDelay: '1.8s' }}>
          <FilterChips options={pillarFilters} value={filter} onChange={onChange} label="Filter articles by category" />
        </div>
      </PageHero>

      <section className="section section-paper" aria-live="polite">
        <div className="container">
          <div className="blog-grid">
            {posts.map((post, i) => (
              <Reveal key={post.slug} delay={((i % 3) + 1) as 1 | 2 | 3}>
                <Link to={`/blog/${post.slug}`} className="blog-card">
                  <span className="blog-card-category">{pillarTag(post.category)}</span>
                  <h2 className="blog-card-title">{post.title}</h2>
                  <p className="blog-card-excerpt">{post.excerpt}</p>
                  <div className="blog-card-meta">
                    <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                    <span>{post.readTime}</span>
                  </div>
                  <span className="blog-card-link">
                    Read more <ArrowRight size={16} aria-hidden="true" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        heading="Ready to put this into practice?"
        subtext="Book a free AI audit and find out where your business is leaking time, leads and money."
      />
    </>
  );
}
