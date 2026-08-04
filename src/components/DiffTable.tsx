import Reveal from './Reveal';
import './ContentBlocks.css';

const withoutItems = [
  'You find out about competitor moves from lost customers',
  'Reports are weeks old before anyone reads them',
  'AI tools that worked in the demo stall in production',
  'Decisions made on gut feel because nobody trusts the data',
  'Manual monitoring that nobody has time to actually do',
];

const withItems = [
  'You know about competitor moves the same day they happen',
  'Live intelligence fed to your team in real time',
  'Production-grade agents with real infrastructure underneath',
  'Decisions made on current, reliable, consolidated data',
  'Always-on agents that monitor continuously',
];

export default function DiffTable() {
  return (
    <section className="section section-paper">
      <div className="container">
        <Reveal>
          <span className="eyebrow">The Lapis Difference</span>
          <h2 className="section-title">
            Without us vs. <span className="accent">with us.</span>
          </h2>
          <p className="section-intro">
            The difference isn&rsquo;t more AI. It&rsquo;s less blindness.
          </p>
        </Reveal>
        <div className="diff-grid" style={{ marginTop: 56 }}>
          <Reveal>
            <div className="diff-card diff-without">
              <h3 className="diff-heading">Without Lapis</h3>
              <ul className="diff-list">
                {withoutItems.map((item) => (
                  <li key={item}>
                    <span className="diff-x">&times;</span>
                    <span dangerouslySetInnerHTML={{ __html: item }} />
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={2}>
            <div className="diff-card diff-with">
              <h3 className="diff-heading diff-heading-gold">With Lapis</h3>
              <ul className="diff-list">
                {withItems.map((item) => (
                  <li key={item}>
                    <span className="diff-check">&#10003;</span>
                    <span dangerouslySetInnerHTML={{ __html: item }} />
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
