import { useCallback, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { processSteps } from '@/data/process';
import Photo from './Photo';
import Reveal from './Reveal';
import './HowWeWork.css';

const pad = (n: number) => String(n).padStart(2, '0');

/** White line-art marks, one per step (decorative). */
function StepArt({ step }: { step: number }) {
  const common = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.4,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };
  return (
    <svg className="hww-art" viewBox="0 0 120 120" aria-hidden="true" focusable="false">
      {step === 0 && (
        <g {...common}>
          <circle cx="46" cy="60" r="30" />
          <circle cx="74" cy="60" r="30" />
        </g>
      )}
      {step === 1 && (
        <g {...common}>
          <circle cx="54" cy="54" r="32" />
          <circle cx="54" cy="54" r="19" />
          <path d="M77 77l24 24" />
        </g>
      )}
      {step === 2 && (
        <g {...common}>
          <circle cx="40" cy="66" r="27" />
          <circle cx="60" cy="50" r="27" />
          <circle cx="80" cy="66" r="27" />
        </g>
      )}
      {step === 3 && (
        <g {...common}>
          <circle cx="60" cy="60" r="38" />
          <path d="M42 61l12 12 25-27" />
        </g>
      )}
      {step === 4 && (
        <g {...common}>
          <circle cx="60" cy="60" r="38" />
          <path d="M60 84V38M42 55l18-18 18 18" />
        </g>
      )}
      {step === 5 && (
        <g {...common}>
          <circle cx="60" cy="60" r="38" />
          <path d="M44 76V62M56 76V50M68 76V56M80 76V42" />
        </g>
      )}
    </svg>
  );
}

/** The six-step sales path as a frosted-glass carousel over a photo. */
export default function HowWeWork() {
  const [index, setIndex] = useState(0);
  const total = processSteps.length;
  const startX = useRef<number | null>(null);

  const go = useCallback((delta: number) => setIndex((i) => (i + delta + total) % total), [total]);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      go(1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      go(-1);
    }
  };

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') startX.current = e.clientX;
  };

  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    if (startX.current === null) return;
    const dx = e.clientX - startX.current;
    startX.current = null;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
  };

  const current = processSteps[index];

  return (
    <section className="hww" aria-labelledby="hww-title">
      <div className="hww-media" aria-hidden="true">
        <Photo name="how-we-work" className="hww-img" />
      </div>
      <div className="container hww-inner">
        <Reveal className="hww-intro">
          <span className="eyebrow">How we work</span>
          <h2 className="section-title hww-title" id="hww-title">
            Six steps from first call to AI workers on the job.
          </h2>
          <p className="hww-sub">No six-month discovery phase and no vague timelines.</p>
          <Link to="/how-it-works" className="hww-link">
            See how it works <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </Reveal>

        <Reveal className="hww-stage" delay={2}>
          <span className="hww-gridline hww-gridline-top" aria-hidden="true" />
          <span className="hww-gridline hww-gridline-bottom" aria-hidden="true" />
          <span className="hww-gridline hww-gridline-left" aria-hidden="true" />
          <span className="hww-gridline hww-gridline-right" aria-hidden="true" />
          <div
            className="hww-panel"
            role="region"
            aria-roledescription="carousel"
            aria-label="The six steps from first call to go-live"
            tabIndex={0}
            onKeyDown={onKeyDown}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerCancel={() => (startX.current = null)}
          >
            <p className="sr-only" aria-live="polite" aria-atomic="true">
              {`Step ${index + 1} of ${total}: ${current.title}`}
            </p>
            <div className="hww-slides">
              {processSteps.map((s, i) => (
                <div
                  key={s.title}
                  className={`hww-slide ${i === index ? 'is-active' : ''}`}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${i + 1} of ${total}`}
                  aria-hidden={i !== index}
                >
                  <div className="hww-slide-head">
                    <h3 className="hww-step-title">{s.title}</h3>
                    <span className="hww-count">{`// ${pad(i + 1)} - ${pad(total)}`}</span>
                  </div>
                  <p className="hww-phase">{s.phase}</p>
                  <p className="hww-body">{s.body}</p>
                </div>
              ))}
            </div>
            <div className="hww-foot">
              <div className="hww-art-wrap">
                {processSteps.map((s, i) => (
                  <span key={s.title} className={`hww-art-slot ${i === index ? 'is-active' : ''}`}>
                    <StepArt step={i} />
                  </span>
                ))}
              </div>
              <div className="hww-controls">
                <button type="button" className="hww-btn" onClick={() => go(-1)} aria-label="Previous step">
                  <ArrowLeft size={17} aria-hidden="true" />
                </button>
                <button type="button" className="hww-btn" onClick={() => go(1)} aria-label="Next step">
                  <ArrowRight size={17} aria-hidden="true" />
                </button>
              </div>
            </div>
            <div className="hww-dots" aria-hidden="true">
              {processSteps.map((s, i) => (
                <span key={s.title} className={`hww-dot ${i === index ? 'is-active' : ''}`} />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
