import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react';
import Button from './Button';
import { solutions } from '@/data/solutions';
import { services } from '@/data/services';
import { industries } from '@/data/industries';
import './Header.css';
import logsImage from '@/data/logs.png';

type SubLink = { label: string; to: string; description?: string };

type NavEntry = {
  label: string;
  to: string;
  links?: SubLink[];
  viewAll?: string;
  wide?: boolean;
};

const navLinks: NavEntry[] = [
  {
    label: 'Solutions',
    to: '/solutions',
    viewAll: 'View all solutions',
    links: solutions.map((s) => ({ label: s.name, to: s.path, description: s.navDescription })),
  },
  {
    label: 'Services',
    to: '/services',
    viewAll: 'View all services',
    links: services.map((s) => ({ label: s.name, to: s.path })),
  },
  {
    label: 'Industries',
    to: '/industries',
    viewAll: 'View all industries',
    wide: true,
    links: industries.map((i) => ({ label: i.navName ?? i.name, to: i.path })),
  },
  { label: 'How It Works', to: '/how-it-works' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Case Studies', to: '/case-studies' },
  { label: 'About', to: '/about' },
  { label: 'Blog', to: '/blog' },
];

const menuId = (label: string) => `nav-menu-${label.toLowerCase().replace(/\s+/g, '-')}`;

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
  }, [location.pathname, location.search, location.hash]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
      if (closeTimerRef.current) {
        window.clearTimeout(closeTimerRef.current);
      }
    };
  }, [open]);

  useEffect(() => {
    if (!activeMenu && !open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveMenu(null);
        setOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeMenu, open]);

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
          <span className="logo-text">The Lapis AI</span>
        </Link>

        <nav className="header-nav" aria-label="Main">
          {navLinks.map((link) => {
            const hasChildren = Boolean(link.links?.length);
            const isOpen = activeMenu === link.label;

            return (
              <div
                key={link.label}
                className={`nav-item ${isOpen ? 'nav-item-open' : ''}`}
                onMouseEnter={() => hasChildren && openMenu(link.label)}
                onMouseLeave={() => hasChildren && scheduleMenuClose(link.label)}
                onBlur={(e) => {
                  if (hasChildren && !e.currentTarget.contains(e.relatedTarget as Node | null)) {
                    setActiveMenu((current) => (current === link.label ? null : current));
                  }
                }}
              >
                {hasChildren ? (
                  <>
                    <button
                      type="button"
                      className="nav-link nav-link-button"
                      aria-expanded={isOpen}
                      aria-controls={menuId(link.label)}
                      onClick={() => (isOpen ? setActiveMenu(null) : openMenu(link.label))}
                    >
                      <span>{link.label}</span>
                      <ChevronDown size={14} aria-hidden="true" />
                    </button>
                    <div
                      id={menuId(link.label)}
                      className={`nav-dropdown ${link.wide ? 'nav-dropdown-wide' : ''} ${
                        link.links?.some((l) => l.description) ? 'nav-dropdown-described' : ''
                      }`}
                      onMouseEnter={() => clearCloseTimer()}
                      onMouseLeave={() => scheduleMenuClose(link.label)}
                    >
                      <div className="nav-dropdown-list">
                        {link.links?.map((item) => (
                          <Link
                            key={item.to}
                            to={item.to}
                            className="nav-dropdown-link"
                            onClick={() => setActiveMenu(null)}
                          >
                            <span className="nav-dropdown-label">{item.label}</span>
                            {item.description && <span className="nav-dropdown-desc">{item.description}</span>}
                          </Link>
                        ))}
                      </div>
                      {link.viewAll && (
                        <Link to={link.to} className="nav-dropdown-all" onClick={() => setActiveMenu(null)}>
                          {link.viewAll} <ArrowRight size={14} aria-hidden="true" />
                        </Link>
                      )}
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
            Book a Free AI Audit
          </Button>
          <button
            type="button"
            className="header-burger"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <div id="mobile-menu" className={`mobile-menu ${open ? 'mobile-menu-open' : ''}`}>
        <button
          type="button"
          className="mobile-menu-close"
          aria-label="Close mobile menu"
          onClick={() => setOpen(false)}
        >
          <X size={18} aria-hidden="true" />
          <span>Close</span>
        </button>

        <nav className="mobile-nav" aria-label="Mobile">
          {navLinks.map((link) => {
            const hasChildren = Boolean(link.links?.length);
            const isOpen = activeMenu === link.label;

            return (
              <div key={link.label} className="mobile-nav-group">
                {hasChildren ? (
                  <>
                    <button
                      type="button"
                      className={`mobile-menu-link mobile-menu-toggle ${isOpen ? 'mobile-menu-toggle-open' : ''}`}
                      onClick={() => setActiveMenu(isOpen ? null : link.label)}
                      aria-expanded={isOpen}
                    >
                      <span>{link.label}</span>
                      <ChevronDown size={18} aria-hidden="true" />
                    </button>
                    {isOpen && (
                      <div className="mobile-submenu">
                        {link.links?.map((item) => (
                          <Link key={item.to} to={item.to} className="mobile-submenu-link">
                            <span>{item.label}</span>
                            {item.description && <span className="mobile-submenu-desc">{item.description}</span>}
                          </Link>
                        ))}
                        {link.viewAll && (
                          <Link to={link.to} className="mobile-submenu-link mobile-submenu-all">
                            {link.viewAll} <ArrowRight size={14} aria-hidden="true" />
                          </Link>
                        )}
                      </div>
                    )}
                  </>
                ) : (
                  <Link to={link.to} className="mobile-menu-link">
                    {link.label}
                  </Link>
                )}
              </div>
            );
          })}
        </nav>
        <Button to="/contact" variant="primary" size="lg" borderWrap icon>
          Book a Free AI Audit
        </Button>
      </div>
    </header>
  );
}
