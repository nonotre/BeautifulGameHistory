'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useNavigationStore } from '@/store/navigationStore'
import { NavigationLink } from '@/components/NavigationLink'
import { en } from '@/lib/i18n/en'

type MenuView = 'main' | 'games'

/**
 * StartScreen — Client Component.
 * Manages the internal menu state (main buttons ↔ games submenu).
 * Parent page.tsx is a Server Component that simply renders this.
 *
 * Decision I (Option A): If `showGamesSubmenu` is true in the store
 * (set by the Intro's SEE GAMES button), auto-open the games view.
 */
export function StartScreen() {
  const router = useRouter()
  const showGamesSubmenu = useNavigationStore((s) => s.showGamesSubmenu)
  const closeGamesSubmenu = useNavigationStore((s) => s.closeGamesSubmenu)

  const [view, setView] = useState<MenuView>('main')

  // Consume the Zustand flag on mount (SEE GAMES from Intro screen).
  useEffect(() => {
    if (showGamesSubmenu) {
      setView('games')
      closeGamesSubmenu()
    }
  }, [showGamesSubmenu, closeGamesSubmenu])

  const games = [
    { id: 'start-game-1-btn', label: en.start.game1, slug: 'game-1' },
    { id: 'start-game-2-btn', label: en.start.game2, slug: 'game-2' },
    { id: 'start-game-3-btn', label: en.start.game3, slug: 'game-3' },
    { id: 'start-game-4-btn', label: en.start.game4, slug: 'game-4' },
    { id: 'start-game-5-btn', label: en.start.game5, slug: 'game-5' },
  ]

  return (
    <main
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <div className="column">
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.5rem',
          }}
        >
          {view === 'main' && (
            <>
              <NavigationLink
                id="start-intro-btn"
                href="/intro"
                from="/"
                className="btn"
                style={{ width: '100%', maxWidth: '240px' }}
              >
                {en.start.intro}
              </NavigationLink>

              <button
                id="start-games-btn"
                className="btn"
                style={{ width: '100%', maxWidth: '240px' }}
                onClick={() => setView('games')}
              >
                {en.start.games}
              </button>

              <NavigationLink
                id="start-credits-btn"
                href="/credits"
                from="/"
                className="btn"
                style={{ width: '100%', maxWidth: '240px' }}
              >
                {en.start.credits}
              </NavigationLink>
            </>
          )}

          {view === 'games' && (
            <>
              <button
                id="start-games-back-btn"
                className="btn btn--ghost"
                style={{ alignSelf: 'flex-start' }}
                onClick={() => setView('main')}
              >
                {en.nav.back}
              </button>

              {games.map(({ id, label, slug }) => (
                <NavigationLink
                  key={slug}
                  id={id}
                  href={`/game/${slug}`}
                  from="/"
                  className="btn"
                  style={{ width: '100%', maxWidth: '240px' }}
                >
                  {label}
                </NavigationLink>
              ))}
            </>
          )}
        </div>
      </div>
    </main>
  )
}
