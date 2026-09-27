import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Mail, MapPin, MessageCircle } from 'lucide-react';
import Logo from './Logo';
import Photo from './Photo';
import {
  CONTACT_EMAIL,
  DISCOVERY_CTA,
  LOCATION,
  PHONE_LINES,
  SITE_NAME,
  SOCIAL_LINKS,
  WHATSAPP_CTA,
  WHATSAPP_LINK,
  discoveryLink,
} from '@/data/site';
import './Footer.css';

const socialLinks = [
  { label: `${SITE_NAME} on Instagram`, href: SOCIAL_LINKS.instagram, Icon: Instagram },
  { label: `${SITE_NAME} on LinkedIn`, href: SOCIAL_LINKS.linkedin, Icon: Linkedin },
  { label: `WhatsApp ${SITE_NAME}`, href: WHATSAPP_LINK, Icon: MessageCircle },
  { label: `Email ${SITE_NAME}`, href: `mailto:${CONTACT_EMAIL}`, Icon: Mail },
  { label: `${SITE_NAME} on Google Business Profile`, href: SOCIAL_LINKS.googleBusiness, Icon: MapPin },
];

const menuLinks = [
  { label: 'Solutions', to: '/solutions' },
  { label: 'Services', to: '/services' },
  { label: 'Industries', to: '/industries' },
  { label: 'How It Works', to: '/how-it-works' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Case Studies', to: '/case-studies' },
  { label: 'About', to: '/about' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Logo className="footer-logo" />
            <p className="footer-blurb">
              The Lapis AI builds, runs and reports on AI workers for growing teams, on a monthly subscription: more
              capacity, every lead answered, and AI that pays. Serving businesses from Lagos to London, Toronto to Texas.
            </p>
            <ul className="footer-social" aria-label={`${SITE_NAME} online`}>
              {socialLinks.map(({ label, href, Icon }) => {
                const external = href.startsWith('http');
                return (
                  <li key={href}>
                    <a
                      href={href}
                      aria-label={label}
                      title={label}
                      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                      <Icon size={15} aria-hidden="true" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="footer-contact">
            <p className="footer-label">We&rsquo;d love to hear about your business</p>
            <a className="footer-email" href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
            </a>
            <p className="footer-label footer-label-gap">Location</p>
            <address className="footer-address">
              <span>{LOCATION.label}</span>
              {PHONE_LINES.map((line) => (
                <span key={line.e164}>
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
                </span>
              ))}
            </address>
          </div>

          <nav className="footer-menu" aria-labelledby="footer-menu-label">
            <h2 className="footer-label" id="footer-menu-label">
              Menu
            </h2>
            <ul>
              {menuLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="footer-bottom">
          <p className="footer-legal">
            &copy; <span suppressHydrationWarning>{new Date().getFullYear()}</span> The Lapis AI. All rights reserved
          </p>
          <p className="footer-bottom-links">
            <Link to={discoveryLink()}>{DISCOVERY_CTA}</Link>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
              {WHATSAPP_CTA}
            </a>
          </p>
        </div>
      </div>

      <div className="footer-scene" aria-hidden="true">
        <Photo name="forest-floor" className="footer-floor" sizes="100vw" />
        <span className="footer-wordmark">Lapis</span>
      </div>
    </footer>
  );
}
