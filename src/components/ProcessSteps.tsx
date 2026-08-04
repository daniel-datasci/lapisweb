import { Search, Wrench, Activity } from 'lucide-react';
import Reveal from './Reveal';
import './ContentBlocks.css';

const steps = [
  {
    icon: <Search size={28} />,
    phase: 'Phase 1',
    title: 'Discovery',
    duration: 'Week 1',
    body: 'We run a free readiness audit, map your operations and data, and identify the three highest-impact opportunities where AI actually moves the needle &mdash; not where the hype says it should.',
    points: ['Readiness assessment', 'Opportunity mapping', 'Written roadmap'],
  },
  {
    icon: <Wrench size={28} />,
    phase: 'Phase 2',
    title: 'Build',
    duration: 'Weeks 2 and 5',
    body: 'We build your intelligence and agent systems on real infrastructure &mdash; data pipelines, integrations, model orchestration, and dashboards &mdash; connected to your tools.',
    points: ['Data pipelines & integrations', 'Agent development', 'Dashboard deployment'],
  },
  {
    icon: <Activity size={28} />,
    phase: 'Phase 3',
    title: 'Monitor',
    duration: 'Ongoing',
    body: 'Your system runs 24/7. Agents monitor your market, flag changes, and feed intelligence to your team. We maintain, optimize, and meet monthly to keep the system ahead of your competitors.',
    points: ['24/7 monitoring', 'Real-time alerts', 'Monthly strategy reviews'],
  },
];

export default function ProcessSteps() {
  return (
    <section className="section section-paper">
      <div className="container">
        <Reveal>
          <span className="eyebrow">Three Phases</span>
          <h2 className="section-title">
            From free audit to live AI system &mdash; <span className="accent">not in months, in weeks.</span>
          </h2>
          <p className="section-intro">
            No six-month discovery phase. You get something usable within the first month, then we optimize.
          </p>
        </Reveal>
        <div className="process-grid" style={{ marginTop: 56 }}>
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={(i + 1) as 1 | 2 | 3}>
              <div className="process-card">
                <div className="process-num">0{i + 1}</div>
                <span className="process-icon">{s.icon}</span>
                <span className="process-phase">{s.phase}</span>
                <h3 className="process-title">{s.title}</h3>
                <span className="process-duration">{s.duration}</span>
                <p className="process-body" dangerouslySetInnerHTML={{ __html: s.body }} />
                <ul className="process-points">
                  {s.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
