import { ReactNode } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

type Props = {
  children: ReactNode;
  delay?: 1 | 2 | 3 | 4;
  className?: string;
  as?: 'div' | 'section' | 'li' | 'span';
};

export default function Reveal({ children, delay, className = '', as = 'div' }: Props) {
  const { ref, visible } = useScrollReveal<HTMLDivElement>();
  const delayClass = delay ? `reveal-delay-${delay}` : '';
  const classes = `reveal ${delayClass} ${visible ? 'reveal-visible' : ''} ${className}`.trim();
  const Tag = as as 'div';
  return (
    <Tag ref={ref} className={classes}>
      {children}
    </Tag>
  );
}
