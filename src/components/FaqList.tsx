import { useId, useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import SectionHeading from './SectionHeading';
import type { FaqItem as Faq } from '@/data/faqs';
import './FaqList.css';

export function FaqItem({ q, a, defaultOpen = false }: Faq & { defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  return (
    <div className={`faq-item ${open ? 'faq-open' : ''}`}>
      <h3 className="faq-heading">
        <button
          type="button"
          className="faq-question"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={`${id}-answer`}
        >
          <span className="faq-q-text">{q}</span>
          <span className="faq-q-icon" aria-hidden="true">
            {open ? <Minus size={20} /> : <Plus size={20} />}
          </span>
        </button>
      </h3>
      <div className="faq-answer" id={`${id}-answer`} role="region" aria-hidden={!open}>
        <p>{a}</p>
      </div>
    </div>
  );
}

export function FaqList({ items }: { items: Faq[] }) {
  return (
    <div className="faq-list section-body">
      {items.map((f, i) => (
        <FaqItem key={f.q} q={f.q} a={f.a} defaultOpen={i === 0} />
      ))}
    </div>
  );
}

type SectionProps = {
  items: Faq[];
  title?: string;
  accent?: string;
  variant?: 'paper' | 'dark';
};

/** A standard FAQ section, matching the How It Works page. */
export default function FaqSection({
  items,
  title = "Questions you're",
  accent = 'probably asking.',
  variant = 'paper',
}: SectionProps) {
  return (
    <section className={`section section-${variant}`}>
      <div className="container faq-container">
        <SectionHeading eyebrow="FAQ" title={title} accent={accent} />
        <FaqList items={items} />
      </div>
    </section>
  );
}
