import { ReactNode } from 'react';
import { DISCOVERY_CTA } from '@/data/site';
import type { PhotoName } from '@/data/photos';
import Button from './Button';
import Breadcrumbs from './Breadcrumbs';
import Photo from './Photo';
import HeroChips from './HeroChips';
import type { Crumb } from '@/seo/schema';
import './PageHero.css';

type Props = {
  eyebrow: string;
  text: string;
  /** Legacy split point for two-tone headings; the photo hero renders the heading in one colour. */
  splitIndex?: number;
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
  staticHeading?: boolean;
  /** Breadcrumb trail shown above the eyebrow. */
  crumbs?: Crumb[];
  /** Full-bleed background photo (see src/data/photos.ts). */
  image?: PhotoName;
  /** Optional floating glass chips naming real capabilities. */
  chips?: string[];
};

export default function PageHero({
  eyebrow,
  text,
  subtext,
  ctaLabel = DISCOVERY_CTA,
  ctaTo = '/contact',
  secondaryLabel,
  secondaryTo,
  secondaryHref,
  extraActions,
  children,
  crumbs,
  image = 'hero-solutions',
  chips,
}: Props) {
  return (
    <section className="page-hero">
      <div className="page-hero-media" aria-hidden="true">
        <Photo name={image} priority className="page-hero-img" />
      </div>
      {chips && chips.length > 0 && <HeroChips items={chips} variant="page" />}
      <div className="container page-hero-inner">
        {crumbs && <Breadcrumbs items={crumbs} className="page-hero-crumbs fade-down" />}
        <span className="eyebrow hero-eyebrow">{eyebrow}</span>
        <h1 className="hero-title page-hero-title fade-up">{text}</h1>
        {subtext && (
          <p className="hero-sub fade-up" style={{ animationDelay: '0.12s' }}>
            {subtext}
          </p>
        )}
        {(ctaLabel || secondaryLabel || extraActions) && (
          <div className="hero-cta-row fade-up" style={{ animationDelay: '0.22s' }}>
            {ctaLabel && (
              <Button to={ctaTo} variant="primary" size="lg">
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
        {children && (
          <div className="page-hero-extra fade-up" style={{ animationDelay: '0.3s' }}>
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
