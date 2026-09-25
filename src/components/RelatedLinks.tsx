import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';
import './ContentBlocks.css';

export type RelatedLink = {
  kicker: string;
  title: string;
  body: string;
  to: string;
  linkLabel: string;
};

type Props = {
  items: RelatedLink[];
  eyebrow?: string;
  title?: string;
  accent?: string;
  variant?: 'dark' | 'paper';
};

/** Cross-links to related solutions, services, industries, case studies and posts, in the pillar-card style. */
export default function RelatedLinks({
  items,
  eyebrow = 'Keep exploring',
  title = 'Related',
  accent,
  variant = 'dark',
}: Props) {
  if (!items.length) return null;
  return (
    <section className={`section section-${variant}`}>
      <div className="container">
        <SectionHeading eyebrow={eyebrow} title={title} accent={accent} />
        <div className="section-body powers-grid">
          {items.map((item, i) => (
            <Reveal key={item.to} delay={((i % 3) + 1) as 1 | 2 | 3}>
              <Link to={item.to} className="card card-dark pillar-card">
                <span className="card-kicker">{item.kicker}</span>
                <h3 className="card-title-light">{item.title}</h3>
                <p className="card-body-light">{item.body}</p>
                <span className="pillar-link">
                  {item.linkLabel} <ArrowRight size={16} aria-hidden="true" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
