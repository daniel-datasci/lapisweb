import Sparkle from './Sparkle';
import './HeroChips.css';

type Props = {
  items: string[];
  /** home = six chips around the hero artwork (a stage under the copy on small screens); page = a lighter set for inner heroes. */
  variant?: 'home' | 'page';
};

/** Floating glass chips over a hero photo. Decorative restatement of real capabilities. */
export default function HeroChips({ items, variant = 'home' }: Props) {
  return (
    <ul className={`hero-chips hero-chips-${variant}`} aria-hidden="true">
      {items.map((label, i) => (
        <li key={label} className={`hero-chip hero-chip-${i + 1}`}>
          <span className="hero-chip-icon">
            <Sparkle size={10} />
          </span>
          {label}
        </li>
      ))}
    </ul>
  );
}
