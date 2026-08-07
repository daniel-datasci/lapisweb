import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import Button from './Button';
import './Header.css';
import logsImage from '@/data/logs.png';

const serviceLinks = [
  { label: 'AI Consulting', to: '/services/ai-consulting' },
  { label: 'Market Intelligence', to: '/services/market-intelligence' },
  { label: 'AI Agents', to: '/services/ai-agents' },
  { label: 'AI Infrastructure', to: '/services/ai-infrastructure' },
];

const industryLinks = [
  { label: 'SaaS', to: '/industries/saas' },
  { label: 'Real Estate', to: '/industries/real-estate' },
  { label: 'Hospitality', to: '/industries/hospitality' },
];

const navLinks = [
  { label: 'Services', to: '/services/ai-consulting', links: serviceLinks },
  { label: 'Industries', to: '/industries/saas', links: industryLinks },
  { label: 'How It Works', to: '/how-it-works' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Blog', to: '/blog' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const closeTimerRef = useRef<number | null>(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setActiveMenu(null);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
      if (closeTimerRef.current) {
        window.clearTimeout(closeTimerRef.current);
      }
    };
  }, [open]);

  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const openMenu = (label: string) => {
    clearCloseTimer();
    setActiveMenu(label);
  };

  const scheduleMenuClose = (label: string) => {
    clearCloseTimer();
    closeTimerRef.current = window.setTimeout(() => {
      setActiveMenu((current) => (current === label ? null : current));
    }, 140);
  };

  return (
    <header className={`header ${scrolled ? 'header-scrolled' : ''} ${open ? 'header-open' : ''}`}>
      <div className="header-inner">
        <Link to="/" className="header-logo" aria-label="The Lapis AI home">
          <span className="logo-mark" aria-hidden="true">
            <img src={logsImage} alt="" width={28} height={28} decoding="async" />
          </span>
          <span className="logo-text">
            The Lapis<span className="logo-accent"> AI</span>
          </span>
        </Link>

        <nav className="header-nav">
          {navLinks.map((link) => {
            const hasChildren = Boolean(link.links?.length);
            const isOpen = activeMenu === link.label;

            return (
              <div
                key={link.label}
                className={`nav-item ${isOpen ? 'nav-item-open' : ''}`}
                onMouseEnter={() => hasChildren && openMenu(link.label)}
                onMouseLeave={() => hasChildren && scheduleMenuClose(link.label)}
              >
                {hasChildren ? (
                  <>
                    <button
                      type="button"
                      className="nav-link nav-link-button"
                      aria-expanded={isOpen}
                      onClick={() => (isOpen ? scheduleMenuClose(link.label) : openMenu(link.label))}
                    >
                      <span>{link.label}</span>
                      <ChevronDown size={14} />
                    </button>
                    <div
                      className="nav-dropdown"
                      onMouseEnter={() => clearCloseTimer()}
                      onMouseLeave={() => hasChildren && scheduleMenuClose(link.label)}
                    >
                      {link.links?.map((item) => (
                        <Link
                          key={item.to}
                          to={item.to}
                          className="nav-dropdown-link"
                          onClick={() => setActiveMenu(null)}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link to={link.to} className="nav-link">
                    {link.label}
                  </Link>
                )}
              </div>
            );
          })}
        </nav>

        <div className="header-actions">
          <Button to="/contact" variant="primary" size="sm" borderWrap icon>
            Get a Free Readiness Audit
          </Button>
          <button
            className="header-burger"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <div className={`mobile-menu ${open ? 'mobile-menu-open' : ''}`}>
        <button
          type="button"
          className="mobile-menu-close"
          aria-label="Close mobile menu"
          onClick={() => setOpen(false)}
        >
          <X size={18} />
          <span>Close</span>
        </button>

        {navLinks.map((link) => {
          const hasChildren = Boolean(link.links?.length);
          const isOpen = activeMenu === link.label;

          return (
            <div key={link.label} className="mobile-nav-group">
              {hasChildren ? (
                <>
                  <button
                    type="button"
                    className="mobile-menu-link mobile-menu-toggle"
                    onClick={() => setActiveMenu(isOpen ? null : link.label)}
                    aria-expanded={isOpen}
                  >
                    <span>{link.label}</span>
                    <ChevronDown size={18} />
                  </button>
                  {isOpen && (
                    <div className="mobile-submenu">
                      {link.links?.map((item) => (
                        <Link key={item.to} to={item.to} className="mobile-submenu-link" onClick={() => setActiveMenu(null)}>
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link to={link.to} className="mobile-menu-link" onClick={() => setActiveMenu(null)}>
                  {link.label}
                </Link>
              )}
            </div>
          );
        })}
        <Button to="/contact" variant="primary" size="lg" borderWrap icon className="mobile-menu-cta">
          Get a Free Readiness Audit
        </Button>
      </div>
    </header>
  );
}
