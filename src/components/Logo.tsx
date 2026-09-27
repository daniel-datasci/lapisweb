import { Link } from 'react-router-dom';
import logoMark from '@/data/logo-mark.webp';

/** The Lapis mark, rendered as a white monochrome glyph, plus the wordmark. */
export default function Logo({ className = '' }: { className?: string }) {
  return (
    <Link to="/" className={`logo ${className}`.trim()} aria-label="The Lapis AI home">
      <img className="logo-mark" src={logoMark} alt="" width={26} height={26} decoding="async" />
      <span className="logo-text" aria-hidden="true">
        The Lapis AI
      </span>
    </Link>
  );
}
