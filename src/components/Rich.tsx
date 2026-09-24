import { Fragment } from 'react';

/** Renders **bold** and *italic* markup inside short copy strings. */
export default function Rich({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*\s][^*]*\*)/g).filter(Boolean);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) return <strong key={i}>{part.slice(2, -2)}</strong>;
        if (part.length > 2 && part.startsWith('*') && part.endsWith('*')) return <em key={i}>{part.slice(1, -1)}</em>;
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}
