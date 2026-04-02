'use client'

import { Header } from '@/components/Header'
import { en } from '@/lib/i18n/en'

/**
 * CreditsScreen — Client Component.
 * Header with BACK only (no NEXT button).
 * Phase 1: gray image placeholder + placeholder text.
 */
export function CreditsScreen() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div className="column" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Header hasNext={false} />

        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            paddingBlock: '3rem',
          }}
        >
          {/* Team image placeholder */}
          <div
            className="placeholder-block"
            style={{ height: '16rem' }}
            aria-label={en.credits.teamImageAlt}
          >
            team photo
          </div>

          {/* Placeholder text */}
          {en.credits.placeholderText.map((paragraph, i) => (
            <p
              key={i}
              style={{
                lineHeight: 1.8,
                color: 'var(--color-text)',
                fontSize: '0.9rem',
              }}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </main>
  )
}
