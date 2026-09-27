type Props = { size?: number; className?: string };

/** The four-point sparkle used on eyebrow pills, chips and statement text. Decorative. */
export default function Sparkle({ size = 14, className = '' }: Props) {
  return (
    <svg
      className={`sparkle ${className}`.trim()}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0z" />
    </svg>
  );
}
