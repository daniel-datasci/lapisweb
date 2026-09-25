import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import type { Crumb } from '@/seo/schema';
import './Breadcrumbs.css';

/** Visible breadcrumb trail; the same items feed the page's BreadcrumbList JSON-LD. */
export default function Breadcrumbs({ items, className = '' }: { items: Crumb[]; className?: string }) {
  if (items.length < 2) return null;
  return (
    <nav className={`breadcrumbs ${className}`.trim()} aria-label="Breadcrumb">
      <ol>
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.path}>
              {last ? (
                <span aria-current="page">{item.name}</span>
              ) : (
                <>
                  <Link to={item.path}>{item.name}</Link>
                  <ChevronRight size={14} aria-hidden="true" className="breadcrumbs-sep" />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
