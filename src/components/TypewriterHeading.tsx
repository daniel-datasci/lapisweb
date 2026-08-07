import { useTypewriter } from '@/hooks/useTypewriter';
import './TypewriterHeading.css';

type Props = {
  text: string;
  splitIndex?: number;
  colorBefore?: string;
  colorAfter?: string;
  animate?: boolean;
  speed?: number;
  startDelay?: number;
  className?: string;
};

export default function TypewriterHeading({
  text,
  splitIndex = 0,
  colorBefore = 'currentColor',
  colorAfter = 'var(--gold-500)',
  animate = false,
  speed = 35,
  startDelay = 400,
  className = '',
}: Props) {
  const effectiveSpeed = animate ? speed : 0;
  const effectiveStartDelay = animate ? startDelay : 0;
  const { displayed, done } = useTypewriter(text, effectiveSpeed, effectiveStartDelay);
  const fullBefore = splitIndex > 0 ? text.slice(0, splitIndex) : text;
  const fullAfter = splitIndex > 0 ? text.slice(splitIndex) : '';

  const before = splitIndex > 0 ? displayed.slice(0, splitIndex) : displayed;
  const after = splitIndex > 0 ? displayed.slice(splitIndex) : '';

  return (
    <h1 className={`typewriter-heading ${className}`.trim()} aria-label={text}>
      <span className="typewriter-heading-sizer" aria-hidden="true">
        <span style={{ color: colorBefore }}>{fullBefore}</span>
        {splitIndex > 0 && <span style={{ color: colorAfter }}>{fullAfter}</span>}
      </span>
      <span className="typewriter-heading-live" aria-hidden="true">
        <span style={{ color: colorBefore }}>{before}</span>
        {splitIndex > 0 && <span style={{ color: colorAfter }}>{after}</span>}
        {!done && <span className="cursor" />}
      </span>
    </h1>
  );
}
