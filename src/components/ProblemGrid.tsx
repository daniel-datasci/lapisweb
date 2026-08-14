import { EyeOff, TrendingDown, Clock, Layers3 } from 'lucide-react';
import Reveal from './Reveal';

const problems = [
  {
    icon: <EyeOff size={24} />,
    title: 'Competitor Blindness',
    body: 'Your competitors change pricing, launch features, and shift strategy every week. You find out from a lost deal, a churned customer, or a surprised sales rep — weeks too late, after damage is done.',
  },
  {
    icon: <TrendingDown size={24} />,
    title: 'Revenue Drain',
    body: 'Deals slip away because your team quotes against stale intelligence. Revenue leaks out quarter after quarter, attributed to \u201cprice\u201d or \u201ctiming\u201d when the real cause was an information gap.',
  },
  {
    icon: <Clock size={24} />,
    title: 'Stale Data',
    body: 'Your data lives in five systems that don\u2019t talk to each other. Reports are weeks old by the time anyone reads them. Decisions get made on gut feel because nobody trusts the numbers.',
  },
  {
    icon: <Layers3 size={24} />,
    title: 'Stalled AI Adoption',
    body: 'You bought the AI tool. It worked in the demo. Then it hit your real data, your real workflows, and your real infrastructure gaps — and stalled. Now it sits unused, and your problems still exists.',
  },
];

export default function ProblemGrid() {
  return (
    <section className="section section-paper section-paper-blend">
      <div className="container">
        <Reveal>
          <span className="eyebrow">Why Leadership Teams Struggle</span>
          <h2 className="section-title">
            Operational visibility is the real differentiator. <span className="accent">Without it, momentum gets expensive.</span>
          </h2>
          <p className="section-intro">
            Most organisations do not need more tools. They need decision intelligence, cleaner signal, and systems that surface what matters before it becomes a cost.
          </p>
        </Reveal>
        <div className="grid grid-4 problem-grid" style={{ marginTop: 56 }}>
          {problems.map((p, i) => (
            <Reveal key={p.title} delay={(i + 1) as 1 | 2 | 3 | 4}>
              <div className="card problem-card">
                <span className="card-icon">{p.icon}</span>
                <h3 className="card-title">{p.title}</h3>
                <p className="card-body">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
