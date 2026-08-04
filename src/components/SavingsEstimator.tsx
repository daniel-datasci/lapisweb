import { useState, useMemo } from 'react';
import Reveal from './Reveal';
import GrowthChart from './GrowthChart';
import './SavingsEstimator.css';

type CostInput = {
  id: string;
  label: string;
  description: string;
  min: number;
  max: number;
  default: number;
  step: number;
};

type Props = {
  /** Service-specific subtitle shown in the section header */
  subtitle?: string;
  /** Savings rate applied to labor-heavy costs (0-1) */
  laborSavingsRate?: number;
  /** Savings rate applied to tool/software costs (0-1) */
  toolSavingsRate?: number;
  /** Savings rate applied to analytics/data costs (0-1) */
  analyticsSavingsRate?: number;
  /** Expected efficiency gain as monthly compounding growth rate (0-1) */
  growthRate?: number;
};

const DEFAULT_INPUTS: CostInput[] = [
  {
    id: 'labor',
    label: 'Operational Labor',
    description: 'Manual data entry, reporting, research, and routine tasks',
    min: 0,
    max: 200000,
    default: 45000,
    step: 1000,
  },
  {
    id: 'tools',
    label: 'Software & Tools',
    description: 'Subscriptions, licenses, and platforms you maintain',
    min: 0,
    max: 80000,
    default: 12000,
    step: 500,
  },
  {
    id: 'analytics',
    label: 'Data & Analytics',
    description: 'Market research, competitive intel, and reporting services',
    min: 0,
    max: 60000,
    default: 8000,
    step: 500,
  },
];

function formatCurrency(value: number): string {
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(value >= 10000 ? 0 : 1)}k`;
  }
  return `$${value.toLocaleString()}`;
}

function formatFullCurrency(value: number): string {
  return `$${Math.round(value).toLocaleString()}`;
}

export default function SavingsEstimator({
  subtitle = 'Adjust the sliders to model your current spend. We\u2019ll show you what our AI systems could save \u2014 and the growth curve that follows.',
  laborSavingsRate = 0.55,
  toolSavingsRate = 0.30,
  analyticsSavingsRate = 0.65,
  growthRate = 0.04,
}: Props) {
  const [values, setValues] = useState<Record<string, number>>(() =>
    Object.fromEntries(DEFAULT_INPUTS.map((input) => [input.id, input.default])),
  );

  const handleChange = (id: string, value: number) => {
    setValues((prev) => ({ ...prev, [id]: value }));
  };

  const results = useMemo(() => {
    const laborSavings = values.labor * laborSavingsRate;
    const toolSavings = values.tools * toolSavingsRate;
    const analyticsSavings = values.analytics * analyticsSavingsRate;
    const monthlySavings = laborSavings + toolSavings + analyticsSavings;
    const annualSavings = monthlySavings * 12;
    const totalMonthlyCost = values.labor + values.tools + values.analytics;
    const savingsPct = totalMonthlyCost > 0 ? (monthlySavings / totalMonthlyCost) * 100 : 0;

    return {
      laborSavings,
      toolSavings,
      analyticsSavings,
      monthlySavings,
      annualSavings,
      totalMonthlyCost,
      savingsPct,
    };
  }, [values, laborSavingsRate, toolSavingsRate, analyticsSavingsRate]);

  return (
    <section className="section section-navy savings-section">
      <div className="container">
        <Reveal>
          <span className="eyebrow">Savings Estimator</span>
          <h2 className="section-title">
            See what you could save <span className="accent">with AI.</span>
          </h2>
          <p className="section-intro savings-intro">{subtitle}</p>
        </Reveal>

        <div className="savings-grid">
          {/* Sliders panel */}
          <Reveal delay={1} className="savings-sliders-wrap">
            <div className="savings-sliders">
              <span className="savings-panel-label">Your Monthly Costs</span>
              {DEFAULT_INPUTS.map((input) => {
                const pct = ((values[input.id] - input.min) / (input.max - input.min)) * 100;
                const rate =
                  input.id === 'labor'
                    ? laborSavingsRate
                    : input.id === 'tools'
                      ? toolSavingsRate
                      : analyticsSavingsRate;
                const saved = values[input.id] * rate;
                return (
                  <div key={input.id} className="slider-group">
                    <div className="slider-header">
                      <div className="slider-label-group">
                        <span className="slider-label">{input.label}</span>
                        <span className="slider-desc">{input.description}</span>
                      </div>
                      <span className="slider-value">{formatFullCurrency(values[input.id])}<span className="slider-value-unit">/mo</span></span>
                    </div>
                    <input
                      type="range"
                      min={input.min}
                      max={input.max}
                      step={input.step}
                      value={values[input.id]}
                      onChange={(e) => handleChange(input.id, Number(e.target.value))}
                      className="slider"
                      style={{ '--slider-pct': `${pct}%` } as React.CSSProperties}
                      aria-label={input.label}
                    />
                    <div className="slider-meta">
                      <span className="slider-saved">
                        {formatCurrency(saved)} saved/mo
                      </span>
                      <span className="slider-range">
                        {formatCurrency(input.min)} &ndash; {formatCurrency(input.max)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>

          {/* Results panel */}
          <Reveal delay={2} className="savings-results-wrap">
            <div className="savings-results">
              <span className="savings-panel-label">Estimated Impact</span>

              <div className="savings-headline">
                <span className="savings-headline-prefix">You could save</span>
                <span className="savings-headline-value">
                  {formatFullCurrency(results.monthlySavings)}
                  <span className="savings-headline-unit">/mo</span>
                </span>
                <span className="savings-headline-annual">
                  {formatFullCurrency(results.annualSavings)} per year
                </span>
              </div>

              <div className="savings-breakdown">
                <div className="savings-breakdown-row">
                  <span className="savings-breakdown-dot savings-dot-labor" />
                  <span className="savings-breakdown-label">Operational Labor</span>
                  <span className="savings-breakdown-value">{formatFullCurrency(results.laborSavings)}/mo</span>
                </div>
                <div className="savings-breakdown-row">
                  <span className="savings-breakdown-dot savings-dot-tools" />
                  <span className="savings-breakdown-label">Software &amp; Tools</span>
                  <span className="savings-breakdown-value">{formatFullCurrency(results.toolSavings)}/mo</span>
                </div>
                <div className="savings-breakdown-row">
                  <span className="savings-breakdown-dot savings-dot-analytics" />
                  <span className="savings-breakdown-label">Data &amp; Analytics</span>
                  <span className="savings-breakdown-value">{formatFullCurrency(results.analyticsSavings)}/mo</span>
                </div>
              </div>

              <div className="savings-pct-bar">
                <div className="savings-pct-bar-label">
                  <span>Cost reduction</span>
                  <span className="savings-pct-value">{results.savingsPct.toFixed(0)}%</span>
                </div>
                <div className="savings-pct-track">
                  <div
                    className="savings-pct-fill"
                    style={{ width: `${results.savingsPct}%` }}
                  />
                </div>
              </div>

              <GrowthChart
                monthlySavings={results.monthlySavings}
                currentMonthlyCost={results.totalMonthlyCost}
                growthRate={growthRate}
              />
            </div>
          </Reveal>
        </div>

        <Reveal delay={2}>
          <p className="savings-disclaimer">
            Estimates are illustrative, based on typical results across our client base. Your actual savings
            depend on your workflows, data quality, and scope of implementation.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
