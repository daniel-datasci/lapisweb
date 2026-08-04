import { useMemo } from 'react';
import './GrowthChart.css';

type Props = {
  monthlySavings: number;
  currentMonthlyCost: number;
  growthRate: number;
};

const MONTHS = 12;

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export default function GrowthChart({ monthlySavings, currentMonthlyCost, growthRate }: Props) {
  const data = useMemo(() => {
    const baseline: number[] = [];
    const projected: number[] = [];

    for (let i = 0; i <= MONTHS; i++) {
      const t = i / MONTHS;
      const eased = easeOutCubic(t);

      // Baseline: flat current cost (no savings, no growth)
      baseline.push(currentMonthlyCost);

      // Projected: starts at current cost, drops toward (cost - savings)
      // as savings ramp up, then grows with compounding efficiency gains
      const rampedSavings = monthlySavings * eased;
      const efficiencyGrowth = currentMonthlyCost * growthRate * i * 0.5;
      const projectedValue = Math.max(0, currentMonthlyCost - rampedSavings + efficiencyGrowth);
      projected.push(projectedValue);
    }

    return { baseline, projected };
  }, [monthlySavings, currentMonthlyCost, growthRate]);

  // SVG dimensions
  const W = 460;
  const H = 220;
  const padL = 52;
  const padR = 16;
  const padT = 16;
  const padB = 32;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;

  const allValues = [...data.baseline, ...data.projected];
  const yMax = Math.max(...allValues, 1) * 1.15;
  const yMin = 0;

  const xFor = (i: number) => padL + (i / MONTHS) * plotW;
  const yFor = (v: number) => padT + plotH - ((v - yMin) / (yMax - yMin)) * plotH;

  const baselinePath = data.baseline
    .map((v, i) => `${i === 0 ? 'M' : 'L'} ${xFor(i)} ${yFor(v)}`)
    .join(' ');

  const projectedPath = data.projected
    .map((v, i) => `${i === 0 ? 'M' : 'L'} ${xFor(i)} ${yFor(v)}`)
    .join(' ');

  const areaPath =
    `M ${xFor(0)} ${yFor(data.projected[0])} ` +
    data.projected.map((v, i) => `L ${xFor(i)} ${yFor(v)}`).join(' ') +
    ` L ${xFor(MONTHS)} ${padT + plotH} L ${xFor(0)} ${padT + plotH} Z`;

  // Y-axis ticks (4 ticks)
  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((f) => yMin + f * (yMax - yMin));

  // Month labels every 3 months
  const monthLabels = [0, 3, 6, 9, 12];

  const formatAxis = (v: number) => {
    if (v >= 1000) return `$${(v / 1000).toFixed(0)}k`;
    if (v > 0) return `$${v.toFixed(0)}`;
    return '0';
  };

  // Cumulative savings area (fill between baseline and projected)
  const savingsArea =
    `M ${xFor(0)} ${yFor(data.baseline[0])} ` +
    data.baseline.map((v, i) => `L ${xFor(i)} ${yFor(v)}`).join(' ') +
    ` L ${xFor(MONTHS)} ${yFor(data.baseline[MONTHS])} ` +
    data.projected
      .slice()
      .reverse()
      .map((v, i) => {
        const idx = MONTHS - i;
        return `L ${xFor(idx)} ${yFor(v)}`;
      })
      .join(' ') +
    ` Z`;

  return (
    <div className="growth-chart">
      <div className="growth-chart-header">
        <span className="growth-chart-title">12-Month Projection</span>
        <div className="growth-chart-legend">
          <span className="growth-chart-legend-item">
            <span className="growth-chart-legend-line growth-chart-legend-baseline" />
            Current trajectory
          </span>
          <span className="growth-chart-legend-item">
            <span className="growth-chart-legend-line growth-chart-legend-projected" />
            With AI systems
          </span>
        </div>
      </div>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="growth-chart-svg"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="12-month projected cost trajectory with AI systems versus current trajectory"
      >
        <defs>
          <linearGradient id="savingsAreaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e0bc4b" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#e0bc4b" stopOpacity="0.03" />
          </linearGradient>
          <linearGradient id="projectedAreaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e0bc4b" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#e0bc4b" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Grid lines + Y labels */}
        {yTicks.map((v, i) => (
          <g key={i}>
            <line
              x1={padL}
              y1={yFor(v)}
              x2={W - padR}
              y2={yFor(v)}
              className="growth-chart-grid"
            />
            <text
              x={padL - 10}
              y={yFor(v) + 4}
              className="growth-chart-axis-label"
              textAnchor="end"
            >
              {formatAxis(v)}
            </text>
          </g>
        ))}

        {/* X labels */}
        {monthLabels.map((m) => (
          <text
            key={m}
            x={xFor(m)}
            y={H - 10}
            className="growth-chart-axis-label"
            textAnchor="middle"
          >
            Mo {m}
          </text>
        ))}

        {/* Savings area (between baseline and projected) */}
        <path d={savingsArea} fill="url(#savingsAreaGrad)" className="growth-chart-savings-area" />

        {/* Projected area fill */}
        <path d={areaPath} fill="url(#projectedAreaGrad)" />

        {/* Baseline (dashed) */}
        <path d={baselinePath} className="growth-chart-baseline" fill="none" />

        {/* Projected line */}
        <path d={projectedPath} className="growth-chart-projected" fill="none" />

        {/* End point dots */}
        <circle cx={xFor(MONTHS)} cy={yFor(data.baseline[MONTHS])} r="4" className="growth-chart-dot growth-chart-dot-baseline" />
        <circle cx={xFor(MONTHS)} cy={yFor(data.projected[MONTHS])} r="5" className="growth-chart-dot growth-chart-dot-projected" />
      </svg>
    </div>
  );
}
