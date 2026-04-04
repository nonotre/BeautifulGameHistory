export function Paragraphs({ items }: { items: readonly string[] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
      {items.map((text, i) => (
        <p
          key={i}
          style={{
            lineHeight: 1.8,
            color: 'var(--color-text)',
            fontSize: 'var(--font-size-base)',
          }}
        >
          {text}
        </p>
      ))}
    </div>
  )
}
