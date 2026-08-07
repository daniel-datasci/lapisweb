import {
  Search,
  ShieldCheck,
  Bell,
  FileText,
  Newspaper,
  Layers,
  Globe,
  Database,
  Repeat2,
} from 'lucide-react';
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
  'rgba(224, 188, 75, 0.55)',
  'rgba(58, 100, 176, 0.6)',
  'rgba(247, 248, 246, 0.45)',
  'rgba(236, 208, 127, 0.5)',
];

const fullNodes: OrbitNode[] = [
  { id: 'scraper', label: 'Scraper', icon: <Search size={18} />, glow: NODE_GLOWS[0], orbit: 1, angle: 0 },
  { id: 'verifier', label: 'Verifier', icon: <ShieldCheck size={18} />, glow: NODE_GLOWS[1], orbit: 1, angle: 180 },
  { id: 'alert', label: 'Alert Engine', icon: <Bell size={18} />, glow: NODE_GLOWS[0], orbit: 2, angle: 45 },
  { id: 'report', label: 'Report Gen', icon: <FileText size={18} />, glow: NODE_GLOWS[2], orbit: 2, angle: 225 },
  { id: 'news', label: 'News Monitor', icon: <Newspaper size={18} />, glow: NODE_GLOWS[3], orbit: 3, angle: 90 },
  { id: 'consensus', label: 'Consensus', icon: <Layers size={18} />, glow: NODE_GLOWS[1], orbit: 3, angle: 270 },
  { id: 'web', label: 'Web', icon: <Globe size={18} />, glow: NODE_GLOWS[2], orbit: 4, angle: 135 },
  { id: 'data', label: 'Data Source', icon: <Database size={18} />, glow: NODE_GLOWS[3], orbit: 4, angle: 315 },
];

const simplifiedNodes: OrbitNode[] = [
  { id: 'scraper', label: 'Scraper', icon: <Search size={18} />, glow: NODE_GLOWS[0], orbit: 1, angle: 0 },
  { id: 'alert', label: 'Alert Engine', icon: <Bell size={18} />, glow: NODE_GLOWS[0], orbit: 1, angle: 180 },
  { id: 'news', label: 'News Monitor', icon: <Newspaper size={18} />, glow: NODE_GLOWS[2], orbit: 2, angle: 90 },
  { id: 'data', label: 'Data Source', icon: <Database size={18} />, glow: NODE_GLOWS[1], orbit: 2, angle: 270 },
];

const ORBIT_RADII = [176, 250, 324, 398];
const ORBIT_SIZES = [353, 501, 649, 797];
const ORBIT_DURATIONS = [30, 40, 50, 60];
const ORBIT_DIRECTIONS = ['ccw', 'cw', 'cw', 'ccw'];

type Props = {
  variant?: 'full' | 'simplified';
  centerValue?: number;
  centerSuffix?: string;
  centerLabel?: string;
};

export default function OrbitVisualization({
  variant = 'full',
  centerValue = 6,
  centerSuffix = '+',
  centerLabel = 'AI Agents Working',
}: Props) {
  const isSimplified = variant === 'simplified';
  const nodes = variant === 'simplified' ? simplifiedNodes : fullNodes;
  const orbits = isSimplified ? [0, 1] : [0, 1, 2, 3];

  return (
    <div className={`orbit-viz ${isSimplified ? 'orbit-viz-simplified' : ''}`.trim()}>
      <div className="orbit-stage">
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

        {nodes.map((node, idx) => {
          const radius = ORBIT_RADII[node.orbit - 1];
          return (
            <div
              key={node.id}
              className="orbit-node-pos"
              style={
                {
                  transform: `translate(-50%, -50%) rotate(${node.angle}deg) translate(${radius}px) rotate(${-node.angle}deg)`,
                } as React.CSSProperties
              }
            >
              <div
                className="orbit-node-inner"
                style={
                  {
                    '--node-glow': node.glow,
                    animationDelay: `${0.6 + idx * 0.22}s`,
                  } as React.CSSProperties
                }
              >
                <div className="orbit-node">
                  <span className="orbit-node-icon">{node.icon}</span>
                  <span className="orbit-node-label">{node.label}</span>
                </div>
              </div>
            </div>
          );
        })}

        <div className="orbit-center">
          <div className="orbit-center-inner">
            <div className="orbit-center-value">
              <span>{centerValue}{centerSuffix}</span>
            </div>
            <div className="orbit-center-label">{centerLabel}</div>
          </div>
          {!isSimplified && <div className="orbit-center-pulse" />}
        </div>

        {!isSimplified && (
          <div className="orbit-deco">
            <Repeat2 size={14} />
            <span>live</span>
          </div>
        )}
      </div>
    </div>
  );
}
