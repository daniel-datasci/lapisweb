import { ReactNode } from 'react';
import { Check, X } from 'lucide-react';
import Reveal from './Reveal';
import './ResponsiveTable.css';

export type TableColumn = { label: string; hideLabel?: boolean };

type Props = {
  caption: string;
  columns: TableColumn[];
  /** First cell of each row is the row header. */
  rows: ReactNode[][];
  /** "vs": column 2 is "them", column 3 is "us". */
  variant?: 'default' | 'vs';
  className?: string;
};

export default function ResponsiveTable({ caption, columns, rows, variant = 'default', className = '' }: Props) {
  return (
    <Reveal className={`rtable-wrap rtable-${variant} ${className}`.trim()}>
      <table className="rtable">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr>
            {columns.map((col, i) => (
              <th key={i} scope="col">
                {col.hideLabel ? <span className="sr-only">{col.label}</span> : col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri}>
              {row.map((cell, ci) =>
                ci === 0 ? (
                  <th key={ci} scope="row">
                    {cell}
                  </th>
                ) : (
                  <td key={ci} data-label={columns[ci]?.label}>
                    <div className="rtable-cell">
                      {variant === 'vs' && (
                        <span className={`rtable-mark ${ci === 1 ? 'rtable-mark-them' : 'rtable-mark-us'}`} aria-hidden="true">
                          {ci === 1 ? <X size={13} strokeWidth={2.5} /> : <Check size={13} strokeWidth={2.5} />}
                        </span>
                      )}
                      <span>{cell}</span>
                    </div>
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </Reveal>
  );
}
