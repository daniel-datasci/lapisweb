import { Link } from 'react-router-dom';
import { Instagram, Linkedin, MapPin } from 'lucide-react';
import { solutions } from '@/data/solutions';
import { services } from '@/data/services';
import { CONTACT_EMAIL, LOCATION, PHONE_LINES, SITE_NAME, SOCIAL_LINKS } from '@/data/site';
import logsImage from '@/data/logo-mark.webp';
import './Footer.css';

const socialLinks = [
  { label: `${SITE_NAME} on LinkedIn`, href: SOCIAL_LINKS.linkedin, Icon: Linkedin },
  { label: `${SITE_NAME} on Instagram`, href: SOCIAL_LINKS.instagram, Icon: Instagram },
  { label: `${SITE_NAME} on Google Business Profile`, href: SOCIAL_LINKS.googleBusiness, Icon: MapPin },
];

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
                <img src={logsImage} alt="" width={28} height={28} loading="lazy" decoding="async" />
              </span>
              <span className="logo-text">
                The Lapis<span className="logo-accent"> AI</span>
              </span>
            </Link>
            <p className="footer-blurb">
              The Lapis AI builds and runs the AI systems behind growing teams: more capacity, every lead answered, and
              AI that pays. Serving businesses from Lagos to London, Toronto to Texas.
            </p>
            <ul className="footer-social" aria-label={`${SITE_NAME} online`}>
              {socialLinks.map(({ label, href, Icon }) => (
                <li key={href}>
                  <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} title={label}>
                    <Icon size={18} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
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
            <address className="footer-address">
              <ul>
                <li className="footer-location">{LOCATION.label}</li>
                {PHONE_LINES.map((line) => (
                  <li key={line.e164}>
                    <a href={line.tel}>{line.display}</a>
                    <span className="footer-sep" aria-hidden="true">
                      ·
                    </span>
                    <a
                      href={line.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`WhatsApp ${line.display}`}
                    >
                      WhatsApp
                    </a>
                  </li>
                ))}
                <li>
                  <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
                </li>
                <li>
                  <Link to="/contact">Book a Free AI Audit</Link>
                </li>
              </ul>
            </address>
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
