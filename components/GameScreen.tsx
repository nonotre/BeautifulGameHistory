'use client'

import { Header } from '@/components/Header'
import { InfoCard } from '@/components/InfoCard'
import { Paragraphs } from '@/components/Paragraphs'
import { useDictionary } from '@/lib/i18n/useDictionary'
import { SEMANTIC_MAP, type GameSlug } from '@/lib/themes'
import Image from 'next/image'

// Ordered game sequence used for NEXT navigation.
const GAME_ORDER = ['pong', 'pac-man', 'tetris', 'mario-85', 'mario-64'] as const

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
 * Resolves the semantic theme for the given slug and injects it as CSS custom
 * properties on the <main> element, creating an isolated CSS scope. All
 * descendant components consume var(--theme-*) — no prop drilling needed.
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
  const dict = useDictionary()
  const nextHref = getNextHref(slug)
  const game = dict.game.games[slug as keyof typeof dict.game.games]

  // Resolve semantic theme — fall back to pong (all-white) for unknown slugs.
  const theme = SEMANTIC_MAP[slug as GameSlug] ?? SEMANTIC_MAP['pong']

  if (!game) return null

  return (
    <main
      style={
        {
          height: '100dvh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          // ── Semantic CSS custom properties ────────────────────────────────
          // These cascade to all descendants; components read var(--theme-*)
          // directly without receiving theme props.
          '--theme-bg':      theme.bg,
          '--theme-border':  theme.border,
          '--theme-text':    theme.text,
          '--theme-heading': theme.heading,
          '--theme-btn':     theme.btn,
          backgroundColor:   theme.bg,
        } as React.CSSProperties
      }
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
            flex: 1,
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
                  src="/logos/pong_darkmode.png"
                  alt={dict.game.logoAlt(game.title)}
                  width={720}
                  height={405}
                  style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                  priority
                />
              ) : slug === 'pac-man' ? (
                <Image
                  src="/logos/pac-man.png"
                  alt={dict.game.logoAlt(game.title)}
                  width={720}
                  height={405}
                  style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                  priority
                />
              ) : slug === 'tetris' ? (
                <Image
                  src="/logos/tetris.png"
                  alt={dict.game.logoAlt(game.title)}
                  width={720}
                  height={405}
                  style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                  priority
                />
              ) : slug === 'mario-85' ? (
                <Image
                  src="/logos/mario-85.svg"
                  alt={dict.game.logoAlt(game.title)}
                  width={720}
                  height={405}
                  style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                  priority
                />
              ) : slug === 'mario-64' ? (
                <Image
                  src="/logos/mario-64.png"
                  alt={dict.game.logoAlt(game.title)}
                  width={720}
                  height={405}
                  style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                  priority
                />
              ) : (
                <div
                  className="placeholder-block"
                  style={{ height: '10rem', width: '100%' }}
                  aria-label={dict.game.logoAlt(game.title)}
                >
                  {game.title} logo
                </div>
              )}
            </div>

            {/* Game Metadata (Platform — Year) */}
            <p style={{ color: 'var(--theme-text)', fontSize: '0.875rem', textAlign: 'center', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.7 }}>
              {((game as any).manufacturer || (game as any).console)} — {game.year}
            </p>
          </div>

          {/* Info Cards (Only if card data exists) */}
          {(game as any).yearHighlight && (
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <InfoCard
                label={dict.game.cardLabelYear}
                highlight={(game as any).yearHighlight}
                description={(game as any).yearDescription}
              />
              <InfoCard
                label={dict.game.cardLabelSales}
                highlight={(game as any).salesHighlight}
                description={(game as any).salesDescription}
              />
              <InfoCard
                label={dict.game.cardLabelCreators}
                highlight={(game as any).creatorsHighlight}
                description={(game as any).creatorsDescription}
              />
            </div>
          )}

          {/* Game Description */}
          <Paragraphs items={[game.description]} />

          {/* Body content with headings */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {game.content.map((item, idx) => {
              // Headings are identified by the '### ' prefix convention.
              const isHeading = item.startsWith('### ')
              const displayText = isHeading ? item.slice(4) : item
              return isHeading ? (
                <h2 key={idx} style={{ fontSize: '1rem', color: 'var(--theme-heading)', textTransform: 'uppercase', marginTop: '1rem' }}>{displayText}</h2>
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
            borderTop: '4px solid var(--theme-border)',
            padding: '1rem',
            overflow: 'hidden',
          }}
        >
          {slug === 'pong' ? (
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              <Image
                src="/controllers/AtariJoystick.png"
                alt={dict.game.controllerAlt(game.title)}
                fill
                style={{ objectFit: 'contain', objectPosition: 'center' }}
              />
            </div>
          ) : (
            <div
              className="placeholder-block"
              style={{ width: '100%', height: '100%' }}
              aria-label={dict.game.controllerAlt(game.title)}
            >
              {game.title} controller
            </div>
          )}
        </section>
      </div>
    </main>
  )
}
