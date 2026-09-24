import CountUp from './CountUp';
import Reveal from './Reveal';
import './ContentBlocks.css';

export type Stat = { value: string; label: string; source?: string };

const NUMERIC = /^(\D*?)(\d+)(\D.*)?$/;

/** Counts up whole-number stats (keeps the existing motion); anything else renders as written. */
export function StatValue({ value }: { value: string }) {
  const match = value.match(NUMERIC);
  if (!match || value.includes(',') || /\d\.\d/.test(value)) return <>{value}</>;
  const [, prefix, num, suffix = ''] = match;
  return <CountUp target={Number(num)} prefix={prefix} suffix={suffix} />;
}

type Props = { stats: Stat[]; columns?: 3 | 4 };

export default function StatGrid({ stats, columns = 4 }: Props) {
  return (
    <div className={`stat-grid stat-grid-${columns}`}>
      {stats.map((s, i) => (
        <Reveal key={s.label} delay={((i % 4) + 1) as 1 | 2 | 3 | 4}>
          <div className="stat-card">
            <div className="stat-value">
              <StatValue value={s.value} />
            </div>
            <p className="stat-label">{s.label}</p>
            {s.source && <p className="stat-source">{s.source}</p>}
          </div>
        </Reveal>
      ))}
    </div>
  );
}
