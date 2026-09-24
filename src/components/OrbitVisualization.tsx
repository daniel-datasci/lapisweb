import {
  MessageCircle,
  Phone,
  CalendarCheck,
  Send,
  FileText,
  Receipt,
  BarChart3,
  Activity,
  Tag,
  Layers,
  GitCommit,
  Briefcase,
  ShieldCheck,
  Bell,
  Newspaper,
  LayoutDashboard,
  Repeat2,
} from 'lucide-react';
import CountUp from './CountUp';
import './OrbitVisualization.css';

type OrbitNode = {
  id: string;
  label: string;
  icon: React.ReactNode;
  glow: string;
  orbit: number;
  angle: number;
};

const NODE_GLOWS = [
  'rgba(108, 227, 255, 0.55)',
  'rgba(58, 100, 176, 0.6)',
  'rgba(247, 248, 246, 0.45)',
  'rgba(30, 203, 255, 0.5)',
];

const node = (id: string, label: string, icon: React.ReactNode, glow: number, orbit: number, angle: number): OrbitNode => ({
  id,
  label,
  icon,
  glow: NODE_GLOWS[glow],
  orbit,
  angle,
});

/** The everyday work a Lapis system answers, runs and reports on. */
const homeNodes: OrbitNode[] = [
  node('whatsapp', 'WhatsApp', <MessageCircle size={18} />, 0, 1, 0),
  node('calls', 'Calls', <Phone size={18} />, 1, 1, 180),
  node('bookings', 'Bookings', <CalendarCheck size={18} />, 0, 2, 45),
  node('follow-ups', 'Follow-ups', <Send size={18} />, 2, 2, 225),
  node('admin', 'Admin', <FileText size={18} />, 3, 3, 90),
  node('invoicing', 'Invoicing', <Receipt size={18} />, 1, 3, 270),
  node('reports', 'Reports', <BarChart3 size={18} />, 2, 4, 135),
  node('monitoring', 'Monitoring', <Activity size={18} />, 3, 4, 315),
];

/** The market watch workflow from the SaaS case study. */
const marketWatchNodes: OrbitNode[] = [
  node('pricing', 'Pricing pages', <Tag size={18} />, 0, 1, 0),
  node('verifier', 'Verifier', <ShieldCheck size={18} />, 1, 1, 180),
  node('alert', 'Alert engine', <Bell size={18} />, 0, 2, 45),
  node('brief', 'Weekly brief', <Newspaper size={18} />, 2, 2, 225),
  node('features', 'Feature pages', <Layers size={18} />, 3, 3, 90),
  node('changelogs', 'Changelogs', <GitCommit size={18} />, 1, 3, 270),
  node('hiring', 'Hiring signals', <Briefcase size={18} />, 2, 4, 135),
  node('dashboard', 'Dashboard', <LayoutDashboard size={18} />, 3, 4, 315),
];

const PRESETS = {
  home: homeNodes,
  'market-watch': marketWatchNodes,
};

const ORBIT_RADII = [176, 250, 324, 398];
const ORBIT_SIZES = [353, 501, 649, 797];
const ORBIT_DURATIONS = [30, 40, 50, 60];
const ORBIT_DIRECTIONS = ['ccw', 'cw', 'cw', 'ccw'];

type Props = {
  preset?: keyof typeof PRESETS;
  centerValue?: number;
  centerSuffix?: string;
  centerLabel?: string;
  label?: string;
};

export default function OrbitVisualization({
  preset = 'home',
  centerValue = 24,
  centerSuffix = '/7',
  centerLabel = 'Run & monitored',
  label,
}: Props) {
  const nodes = PRESETS[preset];
  const orbits = [0, 1, 2, 3];
  const ariaLabel =
    label ?? `${centerValue}${centerSuffix} ${centerLabel}: ${nodes.map((n) => n.label).join(', ')}`;

  return (
    <div className="orbit-viz" role="img" aria-label={ariaLabel}>
      <div className="orbit-stage" aria-hidden="true">
        {orbits.map((oi) => (
          <div
            key={oi}
            className={`orbit-ring orbit-${oi + 1} ${ORBIT_DIRECTIONS[oi]}`}
            style={
              {
                width: `${ORBIT_SIZES[oi]}px`,
                height: `${ORBIT_SIZES[oi]}px`,
                animationDuration: `${ORBIT_DURATIONS[oi]}s`,
              } as React.CSSProperties
            }
          />
        ))}

        {nodes.map((n, idx) => {
          const radius = ORBIT_RADII[n.orbit - 1];
          return (
            <div
              key={n.id}
              className="orbit-node-pos"
              style={
                {
                  transform: `translate(-50%, -50%) rotate(${n.angle}deg) translate(${radius}px) rotate(${-n.angle}deg)`,
                } as React.CSSProperties
              }
            >
              <div
                className="orbit-node-inner"
                style={
                  {
                    '--node-glow': n.glow,
                    animationDelay: `${0.6 + idx * 0.22}s`,
                  } as React.CSSProperties
                }
              >
                <div className="orbit-node">
                  <span className="orbit-node-icon">{n.icon}</span>
                  <span className="orbit-node-label">{n.label}</span>
                </div>
              </div>
            </div>
          );
        })}

        <div className="orbit-center">
          <div className="orbit-center-inner">
            <div className="orbit-center-value">
              <CountUp target={centerValue} duration={2000} suffix={centerSuffix} />
            </div>
            <div className="orbit-center-label">{centerLabel}</div>
          </div>
          <div className="orbit-center-pulse" />
        </div>

        <div className="orbit-deco">
          <Repeat2 size={14} />
          <span>live</span>
        </div>
      </div>
    </div>
  );
}
