'use client'

import { Header } from '@/components/Header'
import { Paragraphs } from '@/components/Paragraphs'
import { useDictionary } from '@/lib/i18n/useDictionary'

/**
 * CreditsScreen — Client Component.
 * Header with BACK only (no NEXT button).
 * Phase 1: gray image placeholder + placeholder text.
 */
export function CreditsScreen() {
  const dict = useDictionary()
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
            aria-label={dict.credits.teamImageAlt}
          >
            team photo
          </div>

          {/* Placeholder text */}
          <Paragraphs items={dict.credits.placeholderText} />
        </div>
      </div>
    </main>
  )
}
