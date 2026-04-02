'use client'

import { useEffect } from 'react'
import { en } from '@/lib/i18n/en'

/**
 * global-error.tsx catches errors thrown in the root layout itself.
 * Must include its own <html> and <body> tags.
 */
export default function GlobalError({
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
    <html lang="en">
      <body
        style={{
          background: '#0a0a0a',
          color: '#ededed',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          gap: '1.5rem',
          padding: '2rem',
          textAlign: 'center',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <h2
          style={{
            fontSize: '1.25rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          {en.errors.errorTitle}
        </h2>
        <p style={{ color: '#888', fontSize: '0.875rem' }}>
          {en.errors.errorBody}
        </p>
        {error.digest && (
          <p style={{ color: '#888', fontSize: '0.75rem' }}>
            Error ID: {error.digest}
          </p>
        )}
        <button
          onClick={() => reset()}
          style={{
            padding: '0.75rem 2rem',
            background: 'transparent',
            color: '#ededed',
            border: '1px solid #2a2a2a',
            cursor: 'pointer',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            fontSize: '0.875rem',
          }}
        >
          {en.errors.errorRetry}
        </button>
      </body>
    </html>
  )
}
