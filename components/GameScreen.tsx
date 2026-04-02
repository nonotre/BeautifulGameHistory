'use client'

import { Header } from '@/components/Header'
import { en } from '@/lib/i18n/en'

// Ordered game sequence used for NEXT navigation.
const GAME_ORDER = ['game-1', 'game-2', 'game-3', 'game-4', 'game-5'] as const
type GameSlug = (typeof GAME_ORDER)[number]

function getNextHref(slug: string): string | undefined {
  const idx = GAME_ORDER.indexOf(slug as GameSlug)
  if (idx === -1) return undefined
  if (idx === GAME_ORDER.length - 1) return '/credits'
  return `/game/${GAME_ORDER[idx + 1]}`
}

interface GameScreenProps {
  slug: string
}

/**
 * GameScreen — Client Component.
 * Receives `slug` (serializable string) from the Server Component page.
 *
 * Phase 1 layout:
 * ┌─────────────────────────────┐
 * │  Header (BACK / NEXT)       │
 * ├─────────────────────────────┤
 * │  Content zone (scrollable)  │  ~65% of viewport height
 * │  • Logo placeholder         │
 * │  • Text content             │
 * ├─────────────────────────────┤
 * │  Controller zone (fixed)    │  ~35% of viewport height
 * └─────────────────────────────┘
 */
export function GameScreen({ slug }: GameScreenProps) {
  const nextHref = getNextHref(slug)

  return (
    <main
      style={{
        height: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <div
        className="column"
        style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}
      >
        {/* Header */}
        <Header hasNext={!!nextHref} nextHref={nextHref} />

        {/* Content zone — scrollable, ~65vh */}
        <section
          aria-label="Game content"
          style={{
            flex: '0 0 65%',
            overflowY: 'auto',
            overflowX: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            paddingBlock: '2rem',
          }}
        >
          {/* Logo placeholder */}
          <div
            className="placeholder-block"
            style={{ height: '10rem' }}
            aria-label={en.game.logoAlt(slug)}
          >
            {slug} logo
          </div>

          {/* Placeholder text */}
          {en.game.placeholderText.map((paragraph, i) => (
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
        </section>

        {/* Controller zone — fixed height, ~35vh */}
        <section
          aria-label="Interactive controller"
          style={{
            flex: '0 0 35%',
            borderTop: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            className="placeholder-block"
            style={{ width: '100%', height: '100%' }}
            aria-label={en.game.controllerAlt(slug)}
          >
            {slug} controller
          </div>
        </section>
      </div>
    </main>
  )
}
