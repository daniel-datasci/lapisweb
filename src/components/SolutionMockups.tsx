import { ArrowUpRight, Check, MessageCircle, X } from 'lucide-react';
import type { PillarId } from '@/data/solutions';
import './SolutionMockups.css';

/*
 * Frosted-glass product mockups for the three solution cards. They are decorative
 * (aria-hidden) and only restate real product facts or generic labels: no invented
 * revenue or performance figures.
 */

const channels = ['WhatsApp', 'Web', 'Email', 'Phone'];

function LeadsMockup() {
  return (
    <div className="mock mock-leads">
      <div className="mock-head">
        <div>
          <p className="mock-big">
            &lt;60<span className="mock-big-unit">sec</span>
          </p>
          <p className="mock-sub">To answer every enquiry</p>
        </div>
        <span className="mock-pill">24/7</span>
      </div>
      <div className="mock-bars">
        {channels.map((c, i) => (
          <div key={c} className={`mock-bar mock-bar-${i + 1}`}>
            <span className="mock-bar-fill" />
            <span className="mock-bar-label">{c}</span>
          </div>
        ))}
      </div>
      <div className="mock-tip">
        <p className="mock-tip-title">
          <MessageCircle size={11} /> New enquiry
        </p>
        <p className="mock-tip-row">
          <span className="mock-dot" /> Answered <Check size={11} className="mock-ok" />
        </p>
        <p className="mock-tip-row">
          <span className="mock-dot" /> Qualified <Check size={11} className="mock-ok" />
        </p>
        <p className="mock-tip-row">
          <span className="mock-dot" /> Booked <Check size={11} className="mock-ok" />
        </p>
      </div>
    </div>
  );
}

const flow = [
  { title: 'New request', body: 'An invoice falls overdue, a report is due or a new client signs.' },
  { title: 'AI worker on the job', body: 'It chases, compiles and onboards, following its job description.' },
  { title: 'Synced & reported', body: 'Your tools stay up to date, and the work shows in your monthly report.' },
];

function CapacityMockup() {
  return (
    <div className="mock mock-flow">
      <span className="mock-flow-line" />
      {flow.map((f, i) => (
        <div key={f.title} className={`mock-flow-step mock-flow-step-${i + 1}`}>
          <p className="mock-flow-title">
            {f.title}
            <span className="mock-flow-dots">••</span>
          </p>
          <p className="mock-flow-body">{f.body}</p>
        </div>
      ))}
    </div>
  );
}

function SpendMockup() {
  return (
    <div className="mock mock-stat">
      <p className="mock-stat-title">45-Day AI Rescue</p>
      <p className="mock-stat-meta">From stalled pilot to production</p>
      <p className="mock-stat-big">
        45<span className="mock-big-unit">/days</span>
      </p>
      <svg className="mock-stat-area" viewBox="0 0 200 80" preserveAspectRatio="none">
        <defs>
          <linearGradient id="mock-area-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#557553" stopOpacity="0.95" />
            <stop offset="1" stopColor="#1e2d1d" stopOpacity="0.9" />
          </linearGradient>
        </defs>
        <path d="M58 80 L58 44 L142 12 L142 80 Z" fill="url(#mock-area-fill)" />
        <path d="M58 44 L142 12" stroke="#b9d0ab" strokeOpacity="0.55" strokeWidth="0.8" fill="none" />
      </svg>
      <div className="mock-stat-chip">
        <span>
          KPI tracked from day one <ArrowUpRight size={11} className="mock-ok" />
        </span>
        <span className="mock-stat-x">
          <X size={10} />
        </span>
      </div>
    </div>
  );
}

export default function SolutionMockup({ id }: { id: PillarId }) {
  if (id === 'leads') return <LeadsMockup />;
  if (id === 'capacity') return <CapacityMockup />;
  return <SpendMockup />;
}
