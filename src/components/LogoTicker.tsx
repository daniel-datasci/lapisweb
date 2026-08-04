import { Cloud, Building2, BedDouble, TrendingUp, Boxes, Cpu } from 'lucide-react';
import './LogoTicker.css';

const logos = [
  { icon: <Cloud size={28} />, label: 'SaaS' },
  { icon: <Building2 size={28} />, label: 'Real Estate' },
  { icon: <BedDouble size={28} />, label: 'Hospitality' },
  { icon: <TrendingUp size={28} />, label: 'Finance' },
  { icon: <Boxes size={28} />, label: 'Logistics' },
  { icon: <Cpu size={28} />, label: 'Technology' },
];

export default function LogoTicker() {
  const items = [...logos, ...logos, ...logos, ...logos];
  return (
    <div className="logo-ticker-section">
      <p className="logo-ticker-label">Built for your industry</p>
      <div className="logo-ticker">
        <div className="logo-ticker-track">
          {items.map((logo, i) => (
            <div className="logo-ticker-item" key={i}>
              <span className="logo-ticker-icon">{logo.icon}</span>
              <span className="logo-ticker-text">{logo.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
