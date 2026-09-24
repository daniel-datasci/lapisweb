import { ReactNode } from 'react';
import TypewriterHeading from './TypewriterHeading';
import Button from './Button';
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
  children?: ReactNode;
  variant?: 'navy' | 'split';
  /** Render the heading without the typewriter effect. */
  staticHeading?: boolean;
};

export default function PageHero({
  eyebrow,
  text,
  splitIndex,
  colorBefore = 'var(--white)',
  colorAfter = 'var(--white)',
  subtext,
  ctaLabel = 'Book My Free AI Audit',
  ctaTo = '/contact',
  secondaryLabel,
  secondaryTo,
  children,
  variant = 'navy',
  staticHeading = false,
}: Props) {
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
      {(ctaLabel || secondaryLabel) && (
        <div className="hero-cta-row fade-up" style={{ animationDelay: '1.8s' }}>
          {ctaLabel && (
            <Button to={ctaTo} variant="primary" size="lg" borderWrap icon>
              {ctaLabel}
            </Button>
          )}
          {secondaryLabel && secondaryTo && (
            <Button to={secondaryTo} variant="ghost-light" size="lg">
              {secondaryLabel}
            </Button>
          )}
        </div>
      )}
    </div>
  );

  if (variant === 'split') {
    return (
      <section className="page-hero page-hero-navy page-hero-split">
        <div className="container page-hero-inner">
          {content}
          <div className="page-hero-aside">{children}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="page-hero page-hero-navy">
      <div className="container page-hero-inner">
        {content}
        {children}
      </div>
    </section>
  );
}
