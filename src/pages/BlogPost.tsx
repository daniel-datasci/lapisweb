import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import CTASection from '@/components/CTASection';
import Reveal from '@/components/Reveal';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { blogPosts } from '@/data/blog';
import './BlogPost.css';

const categoryCtaMap: Record<string, { to: string; label: string }> = {
  'AI Consulting': { to: '/services/ai-consulting', label: 'Explore AI Consulting' },
  'Market Intelligence': { to: '/services/market-intelligence', label: 'Explore Market Intelligence' },
  'AI Agents': { to: '/services/ai-agents', label: 'Explore AI Agents' },
  Infrastructure: { to: '/services/ai-infrastructure', label: 'Explore AI Infrastructure' },
};

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) return <Navigate to="/blog" replace />;

  const related = blogPosts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 2);
  const cta = categoryCtaMap[post.category] || { to: '/contact', label: 'Book a Free Audit' };

  // Article published date in ISO format for JSON-LD
  const isoDate = new Date(post.date).toISOString();

  return (
    <>
      <Helmet>
        <title>{post.title} | The Lapis AI Blog</title>
        <meta name="description" content={post.excerpt} />
        <link rel="canonical" href={`https://thelapisai.com.ng/blog/${post.slug}`} />

        {/* Open Graph */}
        <meta property="og:title" content={`${post.title} | The Lapis AI Blog`} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:url" content={`https://thelapisai.com.ng/blog/${post.slug}`} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="The Lapis AI" />
        <meta property="og:locale" content="en_NG" />

        {/* Article specific */}
        <meta property="article:published_time" content={isoDate} />
        <meta property="article:author" content="The Lapis AI" />
        <meta property="article:section" content={post.category} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${post.title} | The Lapis AI Blog`} />
        <meta name="twitter:description" content={post.excerpt} />
      </Helmet>

      {/* Article structured data */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.excerpt,
          datePublished: isoDate,
          author: {
            '@type': 'Organization',
            name: 'The Lapis AI',
          },
          publisher: {
            '@type': 'Organization',
            name: 'The Lapis AI',
            logo: {
              '@type': 'ImageObject',
              url: 'https://thelapisai.com.ng/og-back.png',
            },
          },
          url: `https://thelapisai.com.ng/blog/${post.slug}`,
          articleBody: post.body.join('\n'), // All paragraph texts concatenated (search engines like it)
        })}
      </script>

      <div>
        <article className="blog-post">
          {/* Header */}
          <section className="page-hero page-hero-navy">
            <div className="container" style={{ maxWidth: 760 }}>
              <Link to="/blog" className="case-back hero-eyebrow" style={{ animation: 'none' }}>
                <ArrowLeft size={16} /> All posts
              </Link>
              <span className="blog-post-category" style={{ marginTop: 24 }}>
                {post.category}
              </span>
              <h1
                className="blog-post-title"
                style={{ animation: 'fadeInUp 1s var(--ease-standard) 0.2s both' }}
              >
                {post.title}
              </h1>
              <div className="blog-post-meta">
                <span>
                  {new Date(post.date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
                <span className="blog-post-meta-dot">&bull;</span>
                <span>{post.readTime}</span>
              </div>
            </div>
          </section>

          {/* Body */}
          <section className="section section-paper">
            <div className="container" style={{ maxWidth: 760 }}>
              <Reveal>
                <div className="blog-post-body">
                  {post.body.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </Reveal>

              {/* Contextual CTA */}
              <Reveal>
                <div className="blog-post-cta">
                  <p className="blog-post-cta-text">
                    Want this for your business? It starts with a free audit.
                  </p>
                  <Link to={cta.to} className="btn btn-light btn-lg" style={{ width: 'auto' }}>
                    <span>{cta.label}</span>
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </Reveal>
            </div>
          </section>

          {/* Related posts */}
          {related.length > 0 && (
            <section className="section section-navy">
              <div className="container">
                <Reveal>
                  <span className="eyebrow">Related Reading</span>
                  <h2 className="section-title">More from {post.category}</h2>
                </Reveal>
                <div className="grid grid-2" style={{ marginTop: 40 }}>
                  {related.map((rp, i) => (
                    <Reveal key={rp.slug} delay={(i + 1) as 1 | 2}>
                      <Link to={`/blog/${rp.slug}`} className="card card-dark pillar-card">
                        <span className="card-tagline">{rp.category}</span>
                        <h3 className="card-title-light">{rp.title}</h3>
                        <p className="card-body-light">{rp.excerpt}</p>
                        <span className="pillar-link">
                          Read more <ArrowRight size={16} />
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
          heading="Stop flying blind."
          subtext="A free audit is the first step. Sixty minutes, a roadmap you keep."
          ctaLabel="Book My Free Audit"
        />
      </div>
    </>
  );
}