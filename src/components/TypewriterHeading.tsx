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

type Segment = { text: string; color: string };

const sliceSegments = (segments: Segment[], from: number, to: number) => {
  let offset = 0;
  return segments.map((seg) => {
    const start = Math.max(from - offset, 0);
    const end = Math.min(to - offset, seg.text.length);
    offset += seg.text.length;
    return { ...seg, text: end > start ? seg.text.slice(start, end) : '' };
  });
};

/**
 * The full heading is always in the markup (so crawlers and no-JS visitors get it, and the
 * final line breaks are reserved). The untyped remainder is only hidden once JS is running.
 */
export default function TypewriterHeading({
  text,
  splitIndex = 0,
  colorBefore = 'currentColor',
  colorAfter = 'var(--cyan-400)',
  speed = 35,
  startDelay = 400,
  className = '',
}: Props) {
  const { count, done } = useTypewriter(text, speed, startDelay);

  const segments: Segment[] =
    splitIndex > 0
      ? [
          { text: text.slice(0, splitIndex), color: colorBefore },
          { text: text.slice(splitIndex), color: colorAfter },
        ]
      : [{ text, color: colorBefore }];

  const typed = sliceSegments(segments, 0, count);
  const rest = sliceSegments(segments, count, text.length);

  return (
    <h1 className={`typewriter-heading ${className}`.trim()} aria-label={text}>
      {typed.map((seg, i) =>
        seg.text ? (
          <span key={`t${i}`} aria-hidden="true" style={{ color: seg.color }}>
            {seg.text}
          </span>
        ) : null,
      )}
      {!done && <span className="tw-cursor" aria-hidden="true" />}
      {!done && (
        <span className="tw-rest" aria-hidden="true">
          {rest.map((seg, i) =>
            seg.text ? (
              <span key={`r${i}`} style={{ color: seg.color }}>
                {seg.text}
              </span>
            ) : null,
          )}
        </span>
      )}
    </h1>
  );
}
