import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Seo from '@/components/Seo';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import CTASection from '@/components/CTASection';
import FilterChips from '@/components/FilterChips';
import { blogPosts, formatPostDate } from '@/data/blog';
import { pillarFilters, pillarTag, solutionById, type PillarId } from '@/data/solutions';
import { breadcrumbLd, SITE_URL } from '@/data/site';
import './Blog.css';

type Filter = 'all' | PillarId;

const isFilter = (v: string | null): v is Filter => pillarFilters.some((f) => f.value === v);

const DESCRIPTION = 'Practical thinking on getting hours back, never missing a lead and making AI pay.';

export default function Blog() {
  const [params, setParams] = useSearchParams();
  const raw = params.get('category');
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
      <Seo
        title="Blog | Practical AI for Growing Businesses | The Lapis AI"
        description={DESCRIPTION}
        path="/blog"
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'Blog',
            name: 'The Lapis AI Blog',
            url: `${SITE_URL}/blog`,
            description: DESCRIPTION,
            blogPost: blogPosts.map((post) => ({
              '@type': 'BlogPosting',
              headline: post.title,
              url: `${SITE_URL}/blog/${post.slug}`,
              datePublished: post.date,
              description: post.excerpt,
              articleSection: solutionById[post.category].name,
              author: { '@type': 'Organization', name: 'The Lapis AI' },
            })),
          },
          breadcrumbLd([
            { name: 'Home', path: '/' },
            { name: 'Blog', path: '/blog' },
          ]),
        ]}
      />

      <PageHero
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
                    <span>{formatPostDate(post.date)}</span>
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
