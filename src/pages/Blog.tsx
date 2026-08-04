import { useState } from 'react';
import { Link } from 'react-router-dom';
import Reveal from '@/components/Reveal';
import CTASection from '@/components/CTASection';
import { ArrowRight } from 'lucide-react';
import { blogPosts, blogCategories } from '@/data/blog';
import './Blog.css';

export default function Blog() {
  const [filter, setFilter] = useState<(typeof blogCategories)[number]>('All');

  const posts = filter === 'All' ? blogPosts : blogPosts.filter((p) => p.category === filter);

  return (
    <div>
      {/* Static heading per WRD — no typewriter on blog */}
      <section className="page-hero page-hero-navy">
        <div className="container">
          <span className="eyebrow hero-eyebrow">Blog</span>
          <h1 className="hero-title" style={{ animation: 'fadeInUp 1s var(--ease-standard) 0.2s both' }}>
            Insights on AI, intelligence, and <span className="text-gold">closing blind spots.</span>
          </h1>
          <p className="hero-sub fade-up" style={{ animationDelay: '0.8s' }}>
            Practical thinking on competitive intelligence, AI agents, infrastructure, and what growing
            businesses actually need to stop flying blind.
          </p>
        </div>
      </section>

      <section className="section section-paper">
        <div className="container">
          {/* Category filter */}
          <Reveal>
            <div className="blog-filters">
              {blogCategories.map((cat) => (
                <button
                  key={cat}
                  className={`blog-filter ${filter === cat ? 'blog-filter-active' : ''}`}
                  onClick={() => setFilter(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </Reveal>

          <div className="blog-grid" style={{ marginTop: 40 }}>
            {posts.map((post, i) => (
              <Reveal key={post.slug} delay={((i % 3) + 1) as 1 | 2 | 3}>
                <Link to={`/blog/${post.slug}`} className="blog-card">
                  <span className="blog-card-category">{post.category}</span>
                  <h2 className="blog-card-title">{post.title}</h2>
                  <p className="blog-card-excerpt">{post.excerpt}</p>
                  <div className="blog-card-meta">
                    <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <span className="blog-card-link">
                    Read more <ArrowRight size={16} />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        heading="Ready to close your blind spots?"
        subtext="Reading is good. Acting is better. Start with a free AI readiness audit."
        ctaLabel="Book My Free Audit"
      />
    </div>
  );
}
