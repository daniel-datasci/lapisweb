import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Reveal from './Reveal';
import Rich from './Rich';
import './ContentBlocks.css';

export type InfoCard = {
  title: string;
  body?: string;
  kicker?: string;
  icon?: ReactNode;
  points?: string[];
  note?: string;
  id?: string;
  to?: string;
  linkLabel?: string;
};

type Props = {
  items: InfoCard[];
  columns?: 2 | 3 | 4;
  dark?: boolean;
  className?: string;
};

export default function InfoCards({ items, columns = 3, dark = false, className = '' }: Props) {
  return (
    <div className={`grid grid-${columns} equal-grid ${className}`.trim()}>
      {items.map((item, i) => (
        <Reveal key={item.title} delay={((i % columns) + 1) as 1 | 2 | 3 | 4}>
          <div id={item.id} className={`card info-card ${dark ? 'card-dark' : ''} ${item.id ? 'scroll-anchor' : ''}`}>
            {item.icon && <span className="card-icon">{item.icon}</span>}
            {item.kicker && <span className="card-kicker">{item.kicker}</span>}
            <h3 className={dark ? 'card-title-light' : 'card-title'}>{item.title}</h3>
            {item.body && (
              <p className={dark ? 'card-body-light' : 'card-body'}>
                <Rich text={item.body} />
              </p>
            )}
            {item.points && (
              <ul className="check-list">
                {item.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            )}
            {item.note && <p className="card-note">{item.note}</p>}
            {item.to && item.linkLabel && (
              <Link to={item.to} className="pillar-link">
                {item.linkLabel} <ArrowRight size={16} aria-hidden="true" />
              </Link>
            )}
          </div>
        </Reveal>
      ))}
    </div>
  );
}
