import Reveal from './Reveal';
import './ContentBlocks.css';

export type Persona = { role: string; need: string };

export default function PersonaGrid({ personas }: { personas: Persona[] }) {
  return (
    <div className="persona-grid equal-grid">
      {personas.map((p, i) => (
        <Reveal key={p.role} delay={((i % 3) + 1) as 1 | 2 | 3}>
          <div className="persona-card">
            <h3 className="persona-role">{p.role}</h3>
            <p className="persona-need">{p.need}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
