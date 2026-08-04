import { Check } from 'lucide-react';
import Reveal from './Reveal';
import './ContentBlocks.css';

type Item = { title: string; body: string };

export default function IncludedGrid({ items }: { items: Item[] }) {
  return (
    <div className="grid grid-3" style={{ marginTop: 56 }}>
      {items.map((item, i) => (
        <Reveal key={item.title} delay={((i % 3) + 1) as 1 | 2 | 3}>
          <div className="card included-card">
            <span className="included-check">
              <Check size={18} />
            </span>
            <h3 className="card-title">{item.title}</h3>
            <p className="card-body">{item.body}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
