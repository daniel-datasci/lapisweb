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

type ResolvedTextProps = {
  text: string;
  splitIndex: number;
  colorBefore: string;
  colorAfter: string;
  className: string;
};

function StaticHeading({
  text,
  splitIndex,
  colorBefore,
  colorAfter,
  className = '',
}: ResolvedTextProps) {
  const fullBefore = splitIndex > 0 ? text.slice(0, splitIndex) : text;
  const fullAfter = splitIndex > 0 ? text.slice(splitIndex) : '';

  return (
    <h1 className={`typewriter-heading ${className}`.trim()}>
      <span style={{ color: colorBefore }}>{fullBefore}</span>
      {splitIndex > 0 && <span style={{ color: colorAfter }}>{fullAfter}</span>}
    </h1>
  );
}

function AnimatedHeading({
  text,
  splitIndex,
  colorBefore,
  colorAfter,
  speed = 35,
  startDelay = 400,
  className = '',
}: ResolvedTextProps & Pick<Props, 'speed' | 'startDelay'>) {
  const { displayed, done } = useTypewriter(text, speed, startDelay);

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
  if (!animate) {
    return (
      <StaticHeading
        text={text}
        splitIndex={splitIndex}
        colorBefore={colorBefore}
        colorAfter={colorAfter}
        className={className}
      />
    );
  }

  return (
    <AnimatedHeading
      text={text}
      splitIndex={splitIndex}
      colorBefore={colorBefore}
      colorAfter={colorAfter}
      speed={speed}
      startDelay={startDelay}
      className={className}
    />
  );
}
