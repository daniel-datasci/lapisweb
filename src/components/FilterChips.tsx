import './ContentBlocks.css';

type Option<T extends string> = { value: T; label: string };

type Props<T extends string> = {
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
  label: string;
};

export default function FilterChips<T extends string>({ options, value, onChange, label }: Props<T>) {
  return (
    <div className="filter-chips" role="group" aria-label={label}>
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          className={`filter-chip ${value === opt.value ? 'filter-chip-active' : ''}`}
          aria-pressed={value === opt.value}
          onClick={() => onChange(opt.value)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
