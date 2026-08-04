import Reveal from './Reveal';
import './ContentBlocks.css';

type Props = {
  eyebrow?: string;
  title: string;
  body: string;
};

export default function DarkCallout({ eyebrow = 'Why Lapis', title, body }: Props) {
  return (
    <section className="section section-dark">
      <div className="container">
        <Reveal>
          <div className="dark-callout">
            <span className="eyebrow">{eyebrow}</span>
            <h2 className="section-title">{title}</h2>
            <p className="section-intro" style={{ maxWidth: 720 }}>{body}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
