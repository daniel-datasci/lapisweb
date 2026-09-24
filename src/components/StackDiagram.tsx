import { Database, Plug, Cpu, LayoutDashboard } from 'lucide-react';
import './StackDiagram.css';

const stack = [
  { icon: <LayoutDashboard size={24} />, label: 'Dashboard', desc: 'What your team sees', layer: 4 },
  { icon: <Cpu size={24} />, label: 'Model Orchestration', desc: 'AI models, coordinated', layer: 3 },
  { icon: <Plug size={24} />, label: 'Integrations', desc: 'Connected systems', layer: 2 },
  { icon: <Database size={24} />, label: 'Data Pipelines', desc: 'Clean, reliable inputs', layer: 1 },
];

/** The layers underneath every Lapis system, dashboard on top and data at the base. */
export default function StackDiagram() {
  return (
    <div className="stack-diagram fade-up" style={{ animationDelay: '2s' }} role="list" aria-label="AI infrastructure layers">
      {stack.map((s) => (
        <div key={s.label} className={`stack-layer stack-layer-${s.layer}`} role="listitem">
          <span className="stack-layer-icon" aria-hidden="true">
            {s.icon}
          </span>
          <div className="stack-layer-text">
            <span className="stack-layer-label">{s.label}</span>
            <span className="stack-layer-desc">{s.desc}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
