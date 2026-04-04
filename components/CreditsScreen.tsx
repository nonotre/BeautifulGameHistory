'use client'

import { Header } from '@/components/Header'
import { Paragraphs } from '@/components/Paragraphs'
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
          <Paragraphs items={en.credits.placeholderText} />
        </div>
      </div>
    </main>
  )
}
