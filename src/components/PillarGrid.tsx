import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Reveal from './Reveal';
import { solutions } from '@/data/solutions';
import './ContentBlocks.css';

/** The three problems / three solutions, each with its quote, proof stat and link. */
export default function PillarGrid() {
  return (
    <div className="grid grid-3 equal-grid pillar-grid">
      {solutions.map((s, i) => (
        <Reveal key={s.id} delay={(i + 1) as 1 | 2 | 3}>
          <Link to={s.path} className="card card-dark pillar-card">
            <p className="pillar-quote">&ldquo;{s.quote}&rdquo;</p>
            <h3 className="card-title-light pillar-name">{s.num} {s.name}</h3>
            <p className="card-body-light">{s.body}</p>
            <p className="pillar-stat">
              {s.stat} <span className="pillar-stat-source">({s.statSource})</span>
            </p>
            <span className="pillar-link">
              {s.linkLabel} <ArrowRight size={16} aria-hidden="true" />
            </span>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
