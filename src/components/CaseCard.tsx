import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { StatValue } from './StatGrid';
import { pillarTag } from '@/data/solutions';
import type { CaseStudy } from '@/data/testimonials';
import './CaseCard.css';

type Props = {
  study: CaseStudy;
  /** Heading level for the card title (h2 on the listing page). */
  headingAs?: 'h2' | 'h3';
};

export default function CaseCard({ study, headingAs: Heading = 'h3' }: Props) {
  return (
    <Link to={`/case-studies/${study.slug}`} className="case-card">
      <span className="case-card-kicker">
        {pillarTag(study.pillar)} · {study.industry}
      </span>
      <Heading className="case-card-title">{study.title}</Heading>
      <div className="case-card-section">
        <span className="case-card-label">Problem</span>
        <p>{study.problem}</p>
      </div>
      <div className="case-card-section">
        <span className="case-card-label">What we built</span>
        <p>{study.built}</p>
      </div>
      <div className="case-card-results">
        {study.results.map((r) => (
          <div key={r.label} className="case-card-result">
            <span className="case-card-result-value">
              <StatValue value={r.value} />
            </span>
            <span className="case-card-result-label">{r.label}</span>
          </div>
        ))}
      </div>
      <span className="case-card-link">
        Read the case study <ArrowRight size={16} aria-hidden="true" />
      </span>
    </Link>
  );
}
