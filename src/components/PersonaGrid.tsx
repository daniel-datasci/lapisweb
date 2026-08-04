import Reveal from './Reveal';
import './ContentBlocks.css';

const personas = [
  { role: 'Founders/CEO', need: 'You need to know what your competitors are doing before your board asks why you didn\u2019t.' },
  { role: 'CFO', need: 'You need to stop revenue leaking out through intelligence gaps you can\u2019t quantify.' },
  { role: 'RevOps', need: 'You need your team selling against current competitive intelligence, not last quarter\u2019s.' },
  { role: 'Retail Ops', need: 'You need to know when a competitor changes pricing or inventory the day it happens.' },
  { role: 'Revenue Manager', need: 'You need to price on live market data - prices, moves, information, not yesterday\u2019s report.' },
  { role: 'Startups & Growing Companies', need: 'You need to stay ahead of shifts in the market before they become expensive mistakes.' },
];

export default function PersonaGrid() {
  return (
    <section className="section section-navy">
      <div className="container">
        <Reveal>
          <span className="eyebrow">Who This Is For</span>
          <h2 className="section-title">
            If &ldquo;we didn&rsquo;t know&rdquo; <span className="accent">costs you money, this is for you.</span>
          </h2>
        </Reveal>
        <div className="persona-grid" style={{ marginTop: 56 }}>
          {personas.map((p, i) => (
            <Reveal key={p.role} delay={((i % 3) + 1) as 1 | 2 | 3}>
              <div className="persona-card">
                <h3 className="persona-role">{p.role}</h3>
                <p className="persona-need">{p.need}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
