import { ReactNode } from 'react';
import Reveal from './Reveal';
import './ContentBlocks.css';

export type Step = {
  icon?: ReactNode;
  phase: string;
  title: string;
  body: string;
  points?: string[];
};

type Props = { steps: Step[]; columns?: 3 | 4 };

export default function ProcessSteps({ steps, columns = 3 }: Props) {
  return (
    <div className={`process-grid process-grid-${columns} equal-grid`}>
      {steps.map((s, i) => (
        <Reveal key={s.title} delay={((i % 4) + 1) as 1 | 2 | 3 | 4}>
          <div className="process-card">
            <div className="process-num" aria-hidden="true">
              0{i + 1}
            </div>
            {s.icon && <span className="process-icon">{s.icon}</span>}
            <span className="process-phase">{s.phase}</span>
            <h3 className="process-title">{s.title}</h3>
            <p className="process-body">{s.body}</p>
            {s.points && (
              <ul className="process-points">
                {s.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
            )}
          </div>
        </Reveal>
      ))}
    </div>
  );
}
