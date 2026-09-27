import { Link } from 'react-router-dom';

type ButtonProps = {
  to?: string;
  href?: string;
  children: React.ReactNode;
  /** primary = green gradient pill; ghost/ghost-light = near-black outlined pill; green = flat green pill. */
  variant?: 'primary' | 'ghost' | 'ghost-light' | 'light' | 'gold' | 'green';
  size?: 'sm' | 'md' | 'lg';
  block?: boolean;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
};

const variantClass: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary: 'btn btn-primary',
  gold: 'btn btn-primary',
  green: 'btn btn-green',
  ghost: 'btn btn-secondary',
  'ghost-light': 'btn btn-secondary',
  light: 'btn btn-light',
};

const sizeClass: Record<NonNullable<ButtonProps['size']>, string> = {
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
  block = false,
  onClick,
  className = '',
  type = 'button',
  disabled = false,
}: ButtonProps) {
  const external = !!href && /^https?:\/\//.test(href);
  const linkProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};
  const classes = [variantClass[variant], sizeClass[size], block ? 'btn-block' : '', className]
    .filter(Boolean)
    .join(' ');
  const content = <span className="btn-label">{children}</span>;

  if (to) {
    return (
      <Link to={to} className={classes} onClick={onClick}>
        {content}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={classes} onClick={onClick} {...linkProps}>
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
