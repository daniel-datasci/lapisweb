import { ReactNode } from 'react';
import Reveal from './Reveal';
import './ContentBlocks.css';

type Props = {
  eyebrow?: string;
  title?: string;
  accent?: string;
  intro?: ReactNode;
  center?: boolean;
  id?: string;
};

/** Eyebrow + H2 (+ optional cyan accent tail and intro), matching the existing section pattern. */
export default function SectionHeading({ eyebrow, title, accent, intro, center = false, id }: Props) {
  return (
    <Reveal className={center ? 'section-heading section-heading-center' : 'section-heading'}>
      {eyebrow && (title || accent) && <span className="eyebrow">{eyebrow}</span>}
      {title || accent ? (
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
      {intro && <p className="section-intro">{intro}</p>}
    </Reveal>
  );
}
