import { ReactNode } from 'react';
import Reveal from './Reveal';
import './ContentBlocks.css';

type Props = {
  eyebrow?: string;
  title?: string;
  accent?: string;
  intro?: ReactNode;
  /** Optional pill button shown under the intro, right-aligned like the reference. */
  action?: ReactNode;
  center?: boolean;
  id?: string;
};

/** Eyebrow pill + big left heading, with the intro (and optional action) on the right. */
export default function SectionHeading({ eyebrow, title, accent, intro, action, center = false, id }: Props) {
  const hasTitle = Boolean(title || accent);
  const shortIntro = typeof intro === 'string' && intro.length <= 170;
  const split = !center && (intro || action);
  const classes = [
    'section-heading',
    center ? 'section-heading-center' : '',
    split ? 'section-heading-split' : '',
    shortIntro ? 'section-heading-short' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Reveal className={classes}>
      <div className="section-heading-main">
        {eyebrow && hasTitle && <span className="eyebrow">{eyebrow}</span>}
        {hasTitle ? (
          <h2 className="section-title" id={id}>
            {title}
            {title && accent && ' '}
            {accent && <span className="accent">{accent}</span>}
          </h2>
        ) : (
          eyebrow && (
            <h2 className="eyebrow section-eyebrow-heading" id={id}>
              {eyebrow}
            </h2>
          )
        )}
      </div>
      {(intro || action) && (
        <div className="section-heading-aside">
          {intro && <p className="section-intro">{intro}</p>}
          {action && <div className="section-heading-action">{action}</div>}
        </div>
      )}
    </Reveal>
  );
}
