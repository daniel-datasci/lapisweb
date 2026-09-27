import Button from './Button';
import Photo from './Photo';
import Reveal from './Reveal';
import { DISCOVERY_CTA } from '@/data/site';
import type { PhotoName } from '@/data/photos';
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
  /** Legacy colour variant; both render the photo CTA. */
  variant?: 'navy' | 'gold';
  eyebrow?: string;
  image?: PhotoName;
};

export default function CTASection({
  heading,
  subtext,
  ctaLabel = DISCOVERY_CTA,
  ctaTo = '/contact',
  secondaryLabel,
  secondaryTo,
  secondaryHref,
  eyebrow = 'Get Started',
  image = 'final-cta',
}: Props) {
  return (
    <section className="cta-section">
      <div className="cta-media" aria-hidden="true">
        <Photo name={image} className="cta-img" />
      </div>
      <div className="container">
        <Reveal className="cta-inner">
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="cta-heading">{heading}</h2>
          {subtext && <p className="cta-subtext">{subtext}</p>}
          <div className="cta-actions">
            <Button to={ctaTo} variant="primary" size="lg">
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
