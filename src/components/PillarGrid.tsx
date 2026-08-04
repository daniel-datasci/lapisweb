import { Compass, Radar, Bot, Server, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { pillars } from '@/data/services';
import Reveal from './Reveal';
import './ContentBlocks.css';

const iconMap: Record<string, React.ReactNode> = {
  Compass: <Compass size={24} />,
  Radar: <Radar size={24} />,
  Bot: <Bot size={24} />,
  Server: <Server size={24} />,
};

export default function PillarGrid() {
  return (
    <section className="section section-dark">
      <div className="container">
        <Reveal>
          <span className="eyebrow">A Premium Operating Layer</span>
          <h2 className="section-title">
            Four capabilities. <span className="accent">One system for decision intelligence and operational clarity.</span>
          </h2>
          <p className="section-intro">
            We design custom AI systems that give leadership teams real-time visibility, sharper decisions, and more consistent execution across the business.
          </p>
        </Reveal>
        <div className="grid grid-4" style={{ marginTop: 56 }}>
          {pillars.map((p, i) => (
            <Reveal key={p.slug} delay={(i + 1) as 1 | 2 | 3 | 4}>
              <Link to={p.path} className="card card-dark pillar-card">
                <span className="card-icon-gold">{iconMap[p.icon]}</span>
                <h3 className="card-title-light">{p.name}</h3>
                <p className="card-tagline">{p.tagline}</p>
                <p className="card-body-light">{p.description}</p>
                <span className="pillar-link">
                  Explore <ArrowRight size={16} />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
