import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react';
import Button from './Button';
import Logo from './Logo';
import { solutions } from '@/data/solutions';
import { services } from '@/data/services';
import { industries } from '@/data/industries';
import { DISCOVERY_CTA, discoveryLink } from '@/data/site';
import './Header.css';

type SubLink = { label: string; to: string; description?: string };

type NavEntry = {
  label: string;
  to: string;
  links?: SubLink[];
  viewAll?: string;
  wide?: boolean;
};

const leftLinks: NavEntry[] = [
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
];

const rightLinks: NavEntry[] = [
  { label: 'Pricing', to: '/pricing' },
  { label: 'Case Studies', to: '/case-studies' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

const mobileLinks: NavEntry[] = [...leftLinks, ...rightLinks.slice(0, 3), { label: 'Blog', to: '/blog' }, rightLinks[3]];

const menuId = (label: string) => `nav-menu-${label.toLowerCase().replace(/\s+/g, '-')}`;

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Matches the CSS breakpoint where the hamburger gives way to the desktop nav. */
const DESKTOP_NAV_QUERY = '(min-width: 1280px)';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const closeTimerRef = useRef<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const wasOpenRef = useRef(false);
  const location = useLocation();

  // The mobile menu is portalled to <body> so no ancestor (e.g. the header's backdrop-filter once
  // scrolled) can become its containing block. Portals can't render on the server, so it mounts
  // after hydration; the prerendered HTML and the first client render stay identical.
  useEffect(() => {
    setMounted(true);
  }, []);

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
    const html = document.documentElement;
    const app = document.getElementById('root');
    if (open) {
      wasOpenRef.current = true;
      // Lock page scroll (html + body, which iOS Safari needs) and take the page out of the
      // focus and accessibility order while the dialog covers it.
      html.classList.add('menu-open');
      app?.setAttribute('inert', '');
      // Wait for the panel to become visible before moving focus into it.
      window.requestAnimationFrame(() => menuRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus());
    } else if (wasOpenRef.current) {
      wasOpenRef.current = false;
      burgerRef.current?.focus();
    }
    return () => {
      html.classList.remove('menu-open');
      app?.removeAttribute('inert');
      if (closeTimerRef.current) {
        window.clearTimeout(closeTimerRef.current);
      }
    };
  }, [open]);

  // If the viewport grows into the desktop layout while the menu is open, close it so the
  // scroll lock never outlives a hidden hamburger.
  useEffect(() => {
    if (!open) return;
    const mq = window.matchMedia(DESKTOP_NAV_QUERY);
    const onChange = () => {
      if (mq.matches) setOpen(false);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [open]);

  useEffect(() => {
    if (!activeMenu && !open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveMenu(null);
        setOpen(false);
        return;
      }
      if (e.key === 'Tab' && open && menuRef.current) {
        // Move focus ourselves rather than relying on the native tab order, which WebKit/Safari
        // limits to form controls by default and would let focus escape the dialog.
        const items = Array.from(menuRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
        if (!items.length) return;
        e.preventDefault();
        const index = items.indexOf(document.activeElement as HTMLElement);
        const step = e.shiftKey ? -1 : 1;
        const next = index === -1 ? (e.shiftKey ? items.length - 1 : 0) : (index + step + items.length) % items.length;
        items[next].focus();
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

  // Close as soon as a menu link is tapped: don't wait for the route transition to commit (lazy
  // pages can take a moment on slow phones), and still close when the link is the current page.
  const closeMobileMenu = () => {
    setOpen(false);
    setActiveMenu(null);
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

  const renderItem = (link: NavEntry) => {
    const hasChildren = Boolean(link.links?.length);
    const isOpen = activeMenu === link.label;

    if (!hasChildren) {
      return (
        <li key={link.label} className="nav-item">
          <NavLink to={link.to} className="nav-link">
            {link.label}
          </NavLink>
        </li>
      );
    }

    return (
      <li
        key={link.label}
        className={`nav-item ${isOpen ? 'nav-item-open' : ''}`}
        onMouseEnter={() => openMenu(link.label)}
        onMouseLeave={() => scheduleMenuClose(link.label)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
            setActiveMenu((current) => (current === link.label ? null : current));
          }
        }}
      >
        <button
          type="button"
          className={`nav-link nav-link-button ${location.pathname.startsWith(link.to) ? 'active' : ''}`}
          aria-expanded={isOpen}
          aria-controls={menuId(link.label)}
          onClick={() => (isOpen ? setActiveMenu(null) : openMenu(link.label))}
        >
          <span>{link.label}</span>
          <ChevronDown size={12} strokeWidth={2.2} aria-hidden="true" />
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
              <Link key={item.to} to={item.to} className="nav-dropdown-link" onClick={() => setActiveMenu(null)}>
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
      </li>
    );
  };

  const mobileMenu = (
    <div
      id="mobile-menu"
      ref={menuRef}
      className={`mobile-menu ${open ? 'mobile-menu-open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
    >
      <div className="mobile-menu-top">
        <Logo className="mobile-menu-logo" onClick={closeMobileMenu} />
        <button type="button" className="mobile-menu-close" aria-label="Close menu" onClick={() => setOpen(false)}>
          <X size={20} aria-hidden="true" />
        </button>
      </div>

      <nav className="mobile-nav" aria-label="Mobile">
        {mobileLinks.map((link) => {
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
                        <Link key={item.to} to={item.to} className="mobile-submenu-link" onClick={closeMobileMenu}>
                          <span>{item.label}</span>
                          {item.description && <span className="mobile-submenu-desc">{item.description}</span>}
                        </Link>
                      ))}
                      {link.viewAll && (
                        <Link to={link.to} className="mobile-submenu-link mobile-submenu-all" onClick={closeMobileMenu}>
                          {link.viewAll} <ArrowRight size={14} aria-hidden="true" />
                        </Link>
                      )}
                    </div>
                  )}
                </>
              ) : (
                <Link to={link.to} className="mobile-menu-link" onClick={closeMobileMenu}>
                  {link.label}
                </Link>
              )}
            </div>
          );
        })}
      </nav>
      <Button to={discoveryLink()} variant="primary" size="lg" block onClick={closeMobileMenu}>
        {DISCOVERY_CTA}
      </Button>
    </div>
  );

  return (
    <>
      <header className={`header ${scrolled ? 'header-scrolled' : ''} ${open ? 'header-open' : ''}`}>
        <nav className="header-inner" aria-label="Main">
          <ul className="header-nav header-nav-left">{leftLinks.map(renderItem)}</ul>
          <Logo className="header-logo" />
          <ul className="header-nav header-nav-right">{rightLinks.map(renderItem)}</ul>
          <button
            ref={burgerRef}
            type="button"
            className="header-burger"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-haspopup="dialog"
            onClick={() => setOpen(true)}
          >
            <Menu size={20} aria-hidden="true" />
          </button>
        </nav>
      </header>
      {mounted && createPortal(mobileMenu, document.body)}
    </>
  );
}
