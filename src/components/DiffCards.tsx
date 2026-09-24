import Reveal from './Reveal';
import './ContentBlocks.css';

type Props = {
  withoutTitle: string;
  withoutItems: string[];
  withTitle: string;
  withItems: string[];
};

/** Two-column "what usually happens" vs "what happens with Lapis" comparison. */
export default function DiffCards({ withoutTitle, withoutItems, withTitle, withItems }: Props) {
  return (
    <div className="diff-grid equal-grid">
      <Reveal>
        <div className="diff-card diff-without">
          <h3 className="diff-heading">{withoutTitle}</h3>
          <ul className="diff-list">
            {withoutItems.map((item) => (
              <li key={item}>
                <span className="diff-x" aria-hidden="true">
                  &times;
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
      <Reveal delay={2}>
        <div className="diff-card diff-with">
          <h3 className="diff-heading diff-heading-accent">{withTitle}</h3>
          <ul className="diff-list">
            {withItems.map((item) => (
              <li key={item}>
                <span className="diff-check" aria-hidden="true">
                  &#10003;
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </div>
  );
}
