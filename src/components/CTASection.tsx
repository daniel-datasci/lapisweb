import Button from './Button';
import Reveal from './Reveal';
import './CTASection.css';

type Props = {
  heading: string;
  subtext?: string;
  ctaLabel?: string;
  ctaTo?: string;
  secondaryLabel?: string;
  secondaryTo?: string;
  variant?: 'navy' | 'gold';
};

export default function CTASection({
  heading,
  subtext,
  ctaLabel = 'Get a Free Readiness Audit',
  ctaTo = '/contact',
  secondaryLabel,
  secondaryTo,
  variant = 'navy',
}: Props) {
  return (
    <section className={`cta-section cta-${variant}`}>
      <div className="container">
        <Reveal className="cta-inner">
          <span className="eyebrow">Get Started</span>
          <h2 className="cta-heading">{heading}</h2>
          {subtext && <p className="cta-subtext">{subtext}</p>}
          <div className="cta-actions">
            <Button to={ctaTo} variant={variant === 'gold' ? 'light' : 'primary'} size="lg" borderWrap icon>
              {ctaLabel}
            </Button>
            {secondaryLabel && secondaryTo && (
              <Button to={secondaryTo} variant="ghost-light" size="lg">
                {secondaryLabel}
              </Button>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
