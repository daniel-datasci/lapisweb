import { Quote } from 'lucide-react';
import Reveal from './Reveal';
import './ContentBlocks.css';

export type QuoteItem = { quote: string; cite: string; detail?: string };

type Props = { items: QuoteItem[]; large?: boolean };

export default function QuoteGrid({ items, large = false }: Props) {
  const cols = large ? 1 : items.length >= 3 ? 3 : items.length;
  return (
    <div className={`grid grid-${cols} equal-grid quote-grid ${large ? 'quote-grid-large' : ''}`.trim()}>
      {items.map((q, i) => (
        <Reveal key={q.quote} delay={((i % 3) + 1) as 1 | 2 | 3}>
          <figure className="card quote-card">
            <Quote size={22} className="quote-mark" aria-hidden="true" />
            <blockquote className="quote-text">&ldquo;{q.quote}&rdquo;</blockquote>
            <figcaption className="quote-cite">
              {q.cite}
              {q.detail && <span className="quote-detail">{q.detail}</span>}
            </figcaption>
          </figure>
        </Reveal>
      ))}
    </div>
  );
}
