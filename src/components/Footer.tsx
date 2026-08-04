import { Link } from 'react-router-dom';
import { pillars } from '@/data/services';
import logsImage from '@/data/logs.png';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <span className="logo-mark" aria-hidden="true">
                <img src={logsImage} alt="" />
              </span>
              <span className="logo-text">
                The Lapis<span className="logo-accent"> AI</span>
              </span>
            </Link>
            <p className="footer-blurb">
              We build the systems that make &ldquo;we didn&rsquo;t know&rdquo; impossible. AI competitive
              intelligence, custom agents, and the infrastructure underneath them.
            </p>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Services</h4>
            <ul>
              {pillars.map((p) => (
                <li key={p.slug}>
                  <Link to={p.path}>{p.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Company</h4>
            <ul>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/how-it-works">How It Works</Link>
              </li>
              <li>
                <Link to="/case-studies">Case Studies</Link>
              </li>
              <li>
                <Link to="/blog">Blog</Link>
              </li>
              <li>
                <Link to="/pricing">Pricing</Link>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Contact</h4>
            <ul>
              <li>
                <Link to="/contact">Get a Free Readiness Audit</Link>
              </li>
              <li>
                <a href="mailto:hello@thelapisai.com">team@thelapisai.com.ng</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} The Lapis AI. All rights reserved.</span>
          <div className="footer-legal">
            <Link to="/contact">Privacy</Link>
            <Link to="/contact">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
