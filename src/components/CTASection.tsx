import Button from './Button';
import Reveal from './Reveal';
import { DISCOVERY_CTA } from '@/data/site';
import './CTASection.css';

type Props = {
  heading: string;
  subtext?: string;
  ctaLabel?: string;
  ctaTo?: string;
  secondaryLabel?: string;
  secondaryTo?: string;
  /** External link for the secondary button, e.g. WhatsApp. */
  secondaryHref?: string;
  variant?: 'navy' | 'gold';
  eyebrow?: string;
};

export default function CTASection({
  heading,
  subtext,
  ctaLabel = DISCOVERY_CTA,
  ctaTo = '/contact',
  secondaryLabel,
  secondaryTo,
  secondaryHref,
  variant = 'navy',
  eyebrow = 'Get Started',
}: Props) {
  return (
    <section className={`cta-section cta-${variant}`}>
      <div className="container">
        <Reveal className="cta-inner">
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="cta-heading">{heading}</h2>
          {subtext && <p className="cta-subtext">{subtext}</p>}
          <div className="cta-actions">
            <Button to={ctaTo} variant={variant === 'gold' ? 'light' : 'primary'} size="lg" borderWrap icon>
              {ctaLabel}
            </Button>
            {secondaryLabel && (secondaryTo || secondaryHref) && (
              <Button to={secondaryTo} href={secondaryHref} variant="ghost-light" size="lg">
                {secondaryLabel}
              </Button>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
