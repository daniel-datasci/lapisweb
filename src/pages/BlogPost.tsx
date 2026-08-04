import { useParams, Link, Navigate } from 'react-router-dom';
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

  const related = blogPosts.filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, 2);
  const cta = categoryCtaMap[post.category] || { to: '/contact', label: 'Book a Free Audit' };

  return (
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
            <h1 className="blog-post-title" style={{ animation: 'fadeInUp 1s var(--ease-standard) 0.2s both' }}>
              {post.title}
            </h1>
            <div className="blog-post-meta">
              <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
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

      <CTASection heading="Stop flying blind." subtext="A free audit is the first step. Sixty minutes, a roadmap you keep." ctaLabel="Book My Free Audit" />
    </div>
  );
}
