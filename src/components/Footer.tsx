import { Link } from 'react-router-dom';
import { solutions } from '@/data/solutions';
import { services } from '@/data/services';
import { CONTACT_EMAIL } from '@/data/site';
import logsImage from '@/data/logs.png';
import './Footer.css';

const companyLinks = [
  { label: 'About', to: '/about' },
  { label: 'How It Works', to: '/how-it-works' },
  { label: 'Case Studies', to: '/case-studies' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <span className="logo-mark" aria-hidden="true">
                <img src={logsImage} alt="" width={28} height={28} decoding="async" />
              </span>
              <span className="logo-text">
                The Lapis<span className="logo-accent"> AI</span>
              </span>
            </Link>
            <p className="footer-blurb">
              The Lapis AI builds and runs the AI systems behind growing teams: more capacity, every lead answered, and
              AI that pays. Serving businesses from Lagos to London, Toronto to Texas.
            </p>
          </div>

          <nav className="footer-col" aria-labelledby="footer-solutions">
            <h2 className="footer-heading" id="footer-solutions">
              Solutions
            </h2>
            <ul>
              {solutions.map((s) => (
                <li key={s.id}>
                  <Link to={s.path}>{s.name}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="footer-col" aria-labelledby="footer-services">
            <h2 className="footer-heading" id="footer-services">
              Services
            </h2>
            <ul>
              {services.map((s) => (
                <li key={s.slug}>
                  <Link to={s.path}>{s.name}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="footer-col" aria-labelledby="footer-company">
            <h2 className="footer-heading" id="footer-company">
              Company
            </h2>
            <ul>
              {companyLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer-col">
            <h2 className="footer-heading">Contact</h2>
            <ul>
              <li>
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              </li>
              <li>
                <Link to="/contact">Book a Free AI Audit</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-legal">
            <span>&copy; The Lapis AI Limited</span>
            <span aria-hidden="true">·</span>
            <Link to="/contact">Privacy</Link>
            <span aria-hidden="true">·</span>
            <Link to="/contact">Terms</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
