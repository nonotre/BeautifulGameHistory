'use client'

import { useEffect, useRef, useState } from 'react'
import { useNavigationStore } from '@/store/navigationStore'
import { NavigationLink } from '@/components/NavigationLink'
import { en } from '@/lib/i18n/en'

type MenuView = 'main' | 'games'

/**
 * StartScreen — Client Component.
 * Manages the internal menu state (main options ↔ games submenu).
 *
 * Option buttons are pure text (no background/border), styled with
 * .option-btn — completely separate from .btn and PixelButton.
 *
 * Click flow:
 *  1. Add .option-btn--flashing to the clicked element.
 *  2. Await the animation end (450ms via animationend event).
 *  3. Remove the class, then navigate.
 */
export function StartScreen() {
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

  /**
   * Returns an async thunk that adds the flash class, waits for
   * the animationend event, then removes it.
   */
  function makeFlash(ref: React.RefObject<HTMLButtonElement | null>) {
    return async () => {
      const el = ref.current
      if (!el) return
      el.classList.add('option-btn--flashing')
      await new Promise<void>((resolve) => {
        el.addEventListener('animationend', () => resolve(), { once: true })
      })
      el.classList.remove('option-btn--flashing')
    }
  }

  // Refs for every option button so we can target them individually.
  const introRef = useRef<HTMLButtonElement>(null)
  const gamesRef = useRef<HTMLButtonElement>(null)
  const creditsRef = useRef<HTMLButtonElement>(null)
  const backRef = useRef<HTMLButtonElement>(null)

  const gameRefs = useRef<(HTMLButtonElement | null)[]>([])

  const games = [
    { id: 'start-game-1-btn', label: en.start.game1, slug: 'pong' },
    { id: 'start-game-2-btn', label: en.start.game2, slug: 'pac-man' },
    { id: 'start-game-3-btn', label: en.start.game3, slug: 'game-3' },
    { id: 'start-game-4-btn', label: en.start.game4, slug: 'game-4' },
    { id: 'start-game-5-btn', label: en.start.game5, slug: 'game-5' },
  ]

  /** Flash-then-switch to the games submenu (no navigation). */
  async function handleGamesClick() {
    const el = gamesRef.current
    if (!el) return
    el.classList.add('option-btn--flashing')
    await new Promise<void>((resolve) => {
      el.addEventListener('animationend', () => resolve(), { once: true })
    })
    el.classList.remove('option-btn--flashing')
    setView('games')
  }

  /** Flash-then-go-back to main view. */
  async function handleBackClick() {
    const el = backRef.current
    if (!el) return
    el.classList.add('option-btn--flashing')
    await new Promise<void>((resolve) => {
      el.addEventListener('animationend', () => resolve(), { once: true })
    })
    el.classList.remove('option-btn--flashing')
    setView('main')
  }

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
              {/* INTRO — navigates, flash via onBeforeNavigate */}
              <NavigationLink
                id="start-intro-btn"
                href="/intro"
                from="/"
                className="option-btn"
                ref={introRef}
                onBeforeNavigate={makeFlash(introRef)}
              >
                {en.start.intro}
              </NavigationLink>

              {/* GAMES — opens submenu, no navigation */}
              <button
                id="start-games-btn"
                ref={gamesRef}
                className="option-btn"
                onClick={handleGamesClick}
              >
                {en.start.games}
              </button>

              {/* CREDITS — navigates, flash via onBeforeNavigate */}
              <NavigationLink
                id="start-credits-btn"
                href="/credits"
                from="/"
                className="option-btn"
                ref={creditsRef}
                onBeforeNavigate={makeFlash(creditsRef)}
              >
                {en.start.credits}
              </NavigationLink>
            </>
          )}

          {view === 'games' && (
            <>
              {/* BACK — returns to main view with flash */}
              <button
                id="start-games-back-btn"
                ref={backRef}
                className="option-btn"
                style={{ alignSelf: 'flex-start', width: 'auto' }}
                onClick={handleBackClick}
              >
                {en.nav.back}
              </button>

              {games.map(({ id, label, slug }, i) => {

                return (
                  <NavigationLink
                    key={slug}
                    id={id}
                    href={`/game/${slug}`}
                    from="/"
                    className="option-btn"
                    ref={(el) => {
                      gameRefs.current[i] = el
                    }}
                    onBeforeNavigate={async () => {
                      const el = gameRefs.current[i]
                      if (!el) return
                      el.classList.add('option-btn--flashing')
                      await new Promise<void>((resolve) => {
                        el.addEventListener('animationend', () => resolve(), {
                          once: true,
                        })
                      })
                      el.classList.remove('option-btn--flashing')
                    }}
                  >
                    {label}
                  </NavigationLink>
                )
              })}
            </>
          )}
        </div>
      </div>
    </main>
  )
}
