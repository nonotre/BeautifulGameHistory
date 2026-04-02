'use client'

import { useEffect } from 'react'
import { en } from '@/lib/i18n/en'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

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
      <h2
        style={{
          fontSize: '1.25rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--color-text)',
        }}
      >
        {en.errors.errorTitle}
      </h2>
      <p style={{ color: 'var(--color-muted)', fontSize: '0.875rem' }}>
        {en.errors.errorBody}
      </p>
      {error.digest && (
        <p style={{ color: 'var(--color-muted)', fontSize: '0.75rem' }}>
          Error ID: {error.digest}
        </p>
      )}
      <button className="btn" onClick={() => reset()}>
        {en.errors.errorRetry}
      </button>
    </div>
  )
}
