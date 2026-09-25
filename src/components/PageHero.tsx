import { ReactNode } from 'react';
import TypewriterHeading from './TypewriterHeading';
import { DISCOVERY_CTA } from '@/data/site';
import Button from './Button';
import Breadcrumbs from './Breadcrumbs';
import type { Crumb } from '@/seo/schema';
import './PageHero.css';

type Props = {
  eyebrow: string;
  text: string;
  splitIndex: number;
  colorBefore?: string;
  colorAfter?: string;
  subtext?: string;
  ctaLabel?: string;
  ctaTo?: string;
  secondaryLabel?: string;
  secondaryTo?: string;
  /** External or anchor link for the secondary button (used when secondaryTo is not set). */
  secondaryHref?: string;
  /** Extra buttons appended to the CTA row. */
  extraActions?: ReactNode;
  children?: ReactNode;
  variant?: 'navy' | 'split';
  /** Render the heading without the typewriter effect. */
  staticHeading?: boolean;
  /** Breadcrumb trail shown above the hero card. */
  crumbs?: Crumb[];
};

export default function PageHero({
  eyebrow,
  text,
  splitIndex,
  colorBefore = 'var(--white)',
  colorAfter = 'var(--white)',
  subtext,
  ctaLabel = DISCOVERY_CTA,
  ctaTo = '/contact',
  secondaryLabel,
  secondaryTo,
  secondaryHref,
  extraActions,
  children,
  variant = 'navy',
  staticHeading = false,
  crumbs,
}: Props) {
  const trail = crumbs ? <Breadcrumbs items={crumbs} /> : null;
  const content = (
    <div className="page-hero-content">
      <span className="eyebrow hero-eyebrow">{eyebrow}</span>
      {staticHeading ? (
        <h1 className="typewriter-heading hero-title">
          <span style={{ color: colorBefore }}>{splitIndex > 0 ? text.slice(0, splitIndex) : text}</span>
          {splitIndex > 0 && <span style={{ color: colorAfter }}>{text.slice(splitIndex)}</span>}
        </h1>
      ) : (
        <TypewriterHeading
          text={text}
          splitIndex={splitIndex}
          colorBefore={colorBefore}
          colorAfter={colorAfter}
          className="hero-title"
        />
      )}
      {subtext && (
        <p className="hero-sub fade-up" style={{ animationDelay: '1.5s' }}>
          {subtext}
        </p>
      )}
      {(ctaLabel || secondaryLabel || extraActions) && (
        <div className="hero-cta-row fade-up" style={{ animationDelay: '1.8s' }}>
          {ctaLabel && (
            <Button to={ctaTo} variant="primary" size="lg" borderWrap icon>
              {ctaLabel}
            </Button>
          )}
          {secondaryLabel && (secondaryTo || secondaryHref) && (
            <Button to={secondaryTo} href={secondaryHref} variant="ghost-light" size="lg">
              {secondaryLabel}
            </Button>
          )}
          {extraActions}
        </div>
      )}
    </div>
  );

  if (variant === 'split') {
    return (
      <section className="page-hero page-hero-navy page-hero-split">
        {trail}
        <div className="container page-hero-inner">
          {content}
          <div className="page-hero-aside">{children}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="page-hero page-hero-navy">
      {trail}
      <div className="container page-hero-inner">
        {content}
        {children}
      </div>
    </section>
  );
}
