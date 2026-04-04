'use client'

import { Header } from '@/components/Header'
import { Paragraphs } from '@/components/Paragraphs'
import { en } from '@/lib/i18n/en'
import Image from 'next/image'

// Ordered game sequence used for NEXT navigation.
const GAME_ORDER = ['pong', 'game-2', 'game-3', 'game-4', 'game-5'] as const
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
  const game = en.game.games[slug as keyof typeof en.game.games]

  if (!game) return null

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

        {/* Content zone — scrollable, ~60vh (adjusted for more text) */}
        <section
          aria-label="Game content"
          className="hide-scrollbar"
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
          {/* Logo Container */}
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.75rem',
            }}
          >
            {/* Logo */}
            <div
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '4px',
              }}
            >
              {slug === 'pong' ? (
                <Image
                  src="/logos/pong.jpg"
                  alt={en.game.logoAlt(game.title)}
                  width={720}
                  height={405}
                  style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                  priority
                />
              ) : (
                <div
                  className="placeholder-block"
                  style={{ height: '10rem', width: '100%' }}
                  aria-label={en.game.logoAlt(game.title)}
                >
                  {game.title} logo
                </div>
              )}
            </div>

            {/* Game Metadata (Manufacturer — Year) */}
            <p style={{ color: 'var(--color-muted)', fontSize: '0.875rem', textAlign: 'center', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {game.manufacturer} — {game.year}
            </p>
          </div>

          {/* Technical and Market Information (Only if exists) */}
          {(game as any).salesVolume && (
            <div style={{ background: 'var(--color-surface)', padding: '1rem', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
              <h2 style={{ fontSize: '1rem', marginBottom: '0.5rem', textTransform: 'uppercase' }}>{en.game.technicalInfo}</h2>
              <ul style={{ fontSize: '0.875rem', color: 'var(--color-muted)', display: 'flex', flexDirection: 'column', gap: '0.5rem', listStyle: 'none', padding: 0 }}>
                <li><strong>Year:</strong> {game.year}</li>
                <li><strong>Sales:</strong> {(game as any).salesVolume}</li>
                <li><strong>Creators:</strong> {(game as any).creators}</li>
              </ul>
            </div>
          )}

          {/* Game Description */}
          <Paragraphs items={[game.description]} />

          {/* Body content with headings */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {game.content.map((item, idx) => {
              // Very simple heading detection
              const isHeading = idx === 0 || idx === 3 || idx === 6 || idx === 9;
              return isHeading ? (
                <h2 key={idx} style={{ fontSize: '1rem', color: 'var(--color-accent)', textTransform: 'uppercase', marginTop: '1rem' }}>{item}</h2>
              ) : (
                <Paragraphs key={idx} items={[item]} />
              )
            })}
          </div>
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
            aria-label={en.game.controllerAlt(game.title)}
          >
            {game.title} controller
          </div>
        </section>
      </div>
    </main>
  )
}
