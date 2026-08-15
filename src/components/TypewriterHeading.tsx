import { useTypewriter } from '@/hooks/useTypewriter';
import './TypewriterHeading.css';

type Props = {
  text: string;
  splitIndex?: number;
  colorBefore?: string;
  colorAfter?: string;
  speed?: number;
  startDelay?: number;
  className?: string;
};

export default function TypewriterHeading({
  text,
  splitIndex = 0,
  colorBefore = 'currentColor',
  colorAfter = 'var(--cyan-400)',
  speed = 35,
  startDelay = 400,
  className = '',
}: Props) {
  const { displayed, done } = useTypewriter(text, speed, startDelay);

  const before = splitIndex > 0 ? displayed.slice(0, splitIndex) : displayed;
  const after = splitIndex > 0 ? displayed.slice(splitIndex) : '';

  return (
    <h1 className={`typewriter-heading ${className}`.trim()}>
      <span style={{ color: colorBefore }}>{before}</span>
      {splitIndex > 0 && <span style={{ color: colorAfter }}>{after}</span>}
      {!done && <span className="cursor" />}
    </h1>
  );
}
