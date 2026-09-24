import { X } from 'lucide-react';
import Reveal from './Reveal';
import './ContentBlocks.css';

type Pain = { text: string; tag?: string };

type Props = { items: (string | Pain)[]; columns?: 2 | 3 };

export default function PainList({ items, columns = 2 }: Props) {
  return (
    <ul className={`pain-list pain-list-${columns}`}>
      {items.map((raw, i) => {
        const item = typeof raw === 'string' ? { text: raw } : raw;
        return (
          <Reveal as="li" key={item.text} delay={((i % columns) + 1) as 1 | 2 | 3} className="pain-item">
            <span className="pain-icon" aria-hidden="true">
              <X size={16} strokeWidth={2.5} />
            </span>
            <span className="pain-copy">
              {item.tag && <span className="pain-tag">{item.tag}</span>}
              <span className="pain-text">{item.text}</span>
            </span>
          </Reveal>
        );
      })}
    </ul>
  );
}
