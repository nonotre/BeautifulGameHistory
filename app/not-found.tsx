import Link from 'next/link'
import { en } from '@/lib/i18n/en'

export default function NotFound() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        gap: '1.5rem',
        padding: '2rem',
        textAlign: 'center',
      }}
    >
      <p
        style={{
          fontSize: '5rem',
          fontWeight: 700,
          color: 'var(--color-border)',
          lineHeight: 1,
        }}
      >
        404
      </p>
      <h1
        style={{
          fontSize: '1.25rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--color-text)',
        }}
      >
        {en.errors.notFoundTitle}
      </h1>
      <p style={{ color: 'var(--color-muted)', fontSize: '0.875rem' }}>
        {en.errors.notFoundBody}
      </p>
      <Link href="/" className="btn">
        {en.errors.notFoundHome}
      </Link>
    </div>
  )
}
