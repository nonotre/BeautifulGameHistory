interface InfoCardProps {
  label: string;       // e.g. "YEAR" | "SALES" | "CREATORS"
  highlight: string;   // large text, ≤2 lines; \n renders as line break
  description: string; // body text, ≤3 lines
}

export function InfoCard({ label, highlight, description }: InfoCardProps) {
  return (
    <div
      style={{
        flex: '1 1 0',
        alignSelf: 'stretch',
        border: '4px solid var(--theme-border)',
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.4rem',
        containerType: 'inline-size',
      } as React.CSSProperties}
    >
      {/* Label */}
      <span
        style={{
          fontFamily: 'var(--font-heading), monospace',
          fontSize: '1rem',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: 'var(--theme-text)',
          opacity: 0.6,
        }}
      >
        {label}
      </span>

      {/* Highlight */}
      <span
        style={{
          fontFamily: 'var(--font-heading), monospace',
          fontSize: 'clamp(1.5rem, 12cqi, 2.75rem)',
          color: 'var(--theme-heading)',
          whiteSpace: 'pre-line',
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          lineHeight: 1.15,
        } as React.CSSProperties}
      >
        {highlight}
      </span>

      {/* Description */}
      <span
        style={{
          fontFamily: 'var(--font-body), monospace',
          fontSize: 'var(--font-size-base)',
          color: 'var(--theme-text)',
          lineHeight: 1.4,
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          marginTop: 'auto',
          paddingTop: '0.75rem',
        } as React.CSSProperties}
      >
        {description}
      </span>
    </div>
  );
}
