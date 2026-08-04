import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

type ButtonProps = {
  to?: string;
  href?: string;
  children: React.ReactNode;
  variant?: 'primary' | 'ghost' | 'ghost-light' | 'light' | 'gold';
  size?: 'sm' | 'md' | 'lg';
  borderWrap?: boolean;
  slideRight?: boolean;
  icon?: boolean;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
};

const variantClass: Record<string, string> = {
  primary: 'btn',
  gold: 'btn',
  ghost: 'btn btn-ghost',
  'ghost-light': 'btn btn-ghost-light',
  light: 'btn btn-light',
};

const sizeClass: Record<string, string> = {
  sm: 'btn-sm',
  md: '',
  lg: 'btn-lg',
};

export default function Button({
  to,
  href,
  children,
  variant = 'primary',
  size = 'md',
  borderWrap = false,
  slideRight = false,
  icon = false,
  onClick,
  className = '',
  type = 'button',
  disabled = false,
}: ButtonProps) {
  const classes = `${variantClass[variant]} ${sizeClass[size]} ${slideRight ? 'btn-slide-right' : ''} ${className}`.trim();
  const content = (
    <>
      <span className="btn-label">{children}</span>
      {icon && <ChevronRight size={18} strokeWidth={2} className="btn-icon" />}
    </>
  );

  if (borderWrap) {
    const inner = to ? (
      <Link to={to} className={classes} onClick={onClick}>
        {content}
      </Link>
    ) : href ? (
      <a href={href} className={classes} onClick={onClick}>
        {content}
      </a>
    ) : (
      <button type={type} className={classes} onClick={onClick} disabled={disabled}>
        {content}
      </button>
    );
    return <span className="border-wrap">{inner}</span>;
  }

  if (to) {
    return (
      <Link to={to} className={classes} onClick={onClick}>
        {content}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={classes} onClick={onClick}>
        {content}
      </a>
    );
  }
  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled}>
      {content}
    </button>
  );
}
