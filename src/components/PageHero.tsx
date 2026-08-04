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
};

export default function PageHero({
  eyebrow,
  text,
  splitIndex,
  colorBefore = 'var(--white)',
  colorAfter = 'var(--white)',
  subtext,
  ctaLabel = 'Get a Free Readiness Audit',
  ctaTo = '/contact',
  secondaryLabel,
  secondaryTo,
  children,
  variant = 'navy',
}: Props) {
  const content = (
    <div className="page-hero-content">
      <span className="eyebrow hero-eyebrow">{eyebrow}</span>
      <TypewriterHeading
        text={text}
        splitIndex={splitIndex}
        colorBefore={colorBefore}
        colorAfter={colorAfter}
        className="hero-title"
      />
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
