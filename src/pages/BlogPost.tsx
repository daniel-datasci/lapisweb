import { ReactNode } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Seo from '@/components/Seo';
import CTASection from '@/components/CTASection';
import Reveal from '@/components/Reveal';
import Button from '@/components/Button';
import { blogPostBySlug, blogPosts, formatPostDate } from '@/data/blog';
import { pillarTag, solutionById } from '@/data/solutions';
import '@/components/ContentBlocks.css';
import { breadcrumbLd, SITE_URL } from '@/data/site';
import './BlogPost.css';

function renderBody(body: string[]) {
  const blocks: ReactNode[] = [];
  let list: string[] = [];

  const flushList = () => {
    if (list.length) {
      blocks.push(
        <ul key={`ul-${blocks.length}`}>
          {list.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>,
      );
      list = [];
    }
  };

  body.forEach((line, i) => {
    if (line.startsWith('- ')) {
      list.push(line.slice(2));
      return;
    }
    flushList();
    if (line.startsWith('## ')) blocks.push(<h2 key={i}>{line.slice(3)}</h2>);
    else if (line.startsWith('> ')) blocks.push(<blockquote key={i}>{line.slice(2)}</blockquote>);
    else blocks.push(<p key={i}>{line}</p>);
  });
  flushList();
  return blocks;
}

const plain = (body: string[]) => body.map((line) => line.replace(/^(## |- |> )/, '')).join('\n');

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPostBySlug(slug);

  if (!post) return <Navigate to="/blog" replace />;

  const solution = solutionById[post.category];
  const others = blogPosts.filter((p) => p.slug !== post.slug);
  const sameCategory = others.filter((p) => p.category === post.category);
  const related = [...sameCategory, ...others.filter((p) => p.category !== post.category)].slice(0, 2);
  const relatedHeading = sameCategory.length >= 2 ? `More on ${solution.name}` : 'Keep reading';
  const path = `/blog/${post.slug}`;

  return (
    <>
      <Seo
        title={`${post.title} | The Lapis AI Blog`}
        description={post.excerpt}
        path={path}
        type="article"
        article={{ publishedTime: new Date(`${post.date}T00:00:00Z`).toISOString(), section: solution.name }}
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.excerpt,
            datePublished: post.date,
            articleSection: solution.name,
            author: { '@type': 'Organization', name: 'The Lapis AI', url: SITE_URL },
            publisher: {
              '@type': 'Organization',
              name: 'The Lapis AI',
              logo: { '@type': 'ImageObject', url: `${SITE_URL}/og-back.png` },
            },
            mainEntityOfPage: `${SITE_URL}${path}`,
            url: `${SITE_URL}${path}`,
            articleBody: plain(post.body),
          },
          breadcrumbLd([
            { name: 'Home', path: '/' },
            { name: 'Blog', path: '/blog' },
            { name: post.title, path },
          ]),
        ]}
      />

      <article className="blog-post">
        <section className="page-hero page-hero-navy">
          <div className="container" style={{ maxWidth: 760 }}>
            <Link to="/blog" className="blog-back hero-eyebrow" style={{ animation: 'none' }}>
              <ArrowLeft size={16} aria-hidden="true" /> All posts
            </Link>
            <Link to={`/blog?category=${post.category}`} className="blog-post-category">
              {pillarTag(post.category)}
            </Link>
            <h1 className="blog-post-title" style={{ animation: 'fadeInUp 1s var(--ease-standard) 0.2s both' }}>
              {post.title}
            </h1>
            <div className="blog-post-meta">
              <time dateTime={post.date}>{formatPostDate(post.date)}</time>
              <span className="blog-post-meta-dot" aria-hidden="true">
                &bull;
              </span>
              <span>{post.readTime}</span>
            </div>
          </div>
        </section>

        <section className="section section-paper">
          <div className="container" style={{ maxWidth: 760 }}>
            <Reveal>
              <div className="blog-post-body">{renderBody(post.body)}</div>
            </Reveal>

            <Reveal>
              <aside className="blog-post-cta" aria-label="Book a free AI audit">
                <p className="blog-post-cta-text">Want this working in your business? It starts with a free AI audit.</p>
                <Button to="/contact" variant="primary" size="lg" borderWrap icon>
                  Book My Free AI Audit
                </Button>
              </aside>
            </Reveal>
          </div>
        </section>

        {related.length > 0 && (
          <section className="section section-navy">
            <div className="container">
              <Reveal>
                <span className="eyebrow">Related reading</span>
                <h2 className="section-title">{relatedHeading}</h2>
              </Reveal>
              <div className="grid grid-2 equal-grid section-body">
                {related.map((rp, i) => (
                  <Reveal key={rp.slug} delay={(i + 1) as 1 | 2}>
                    <Link to={`/blog/${rp.slug}`} className="card card-dark pillar-card">
                      <span className="card-kicker">{pillarTag(rp.category)}</span>
                      <h3 className="card-title-light">{rp.title}</h3>
                      <p className="card-body-light">{rp.excerpt}</p>
                      <span className="pillar-link">
                        Read more <ArrowRight size={16} aria-hidden="true" />
                      </span>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}
      </article>

      <CTASection
        heading="Ready to put this into practice?"
        subtext="Book a free AI audit and find out where your business is leaking time, leads and money."
      />
    </>
  );
}
