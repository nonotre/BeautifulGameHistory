'use client'

import { useEffect, useRef, useState } from 'react'
import { useNavigationStore } from '@/store/navigationStore'
import { useLanguageStore } from '@/store/languageStore'
import { useDictionary } from '@/lib/i18n/useDictionary'
import { NavigationLink } from '@/components/NavigationLink'
import { Switch } from '@/components/ui/8bit/switch'

type MenuView = 'main' | 'games' | 'options'

/**
 * StartScreen — Client Component.
 * Manages the internal menu state (main options ↔ games submenu ↔ options submenu).
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
  const lang = useLanguageStore((s) => s.lang)
  const setLang = useLanguageStore((s) => s.setLang)
  const dict = useDictionary()

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
  const optionsRef = useRef<HTMLButtonElement>(null)
  const backGamesRef = useRef<HTMLButtonElement>(null)
  const backOptionsRef = useRef<HTMLButtonElement>(null)

  const gameRefs = useRef<(HTMLButtonElement | null)[]>([])

  const games = [
    { id: 'start-game-1-btn', label: dict.start.game1, slug: 'pong' },
    { id: 'start-game-2-btn', label: dict.start.game2, slug: 'pac-man' },
    { id: 'start-game-3-btn', label: dict.start.game3, slug: 'tetris' },
    { id: 'start-game-4-btn', label: dict.start.game4, slug: 'mario-85' },
    { id: 'start-game-5-btn', label: dict.start.game5, slug: 'mario-64' },
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

  /** Flash-then-switch to the options submenu (no navigation). */
  async function handleOptionsClick() {
    const el = optionsRef.current
    if (!el) return
    el.classList.add('option-btn--flashing')
    await new Promise<void>((resolve) => {
      el.addEventListener('animationend', () => resolve(), { once: true })
    })
    el.classList.remove('option-btn--flashing')
    setView('options')
  }

  /** Flash-then-go-back to main view (from games). */
  async function handleBackGamesClick() {
    const el = backGamesRef.current
    if (!el) return
    el.classList.add('option-btn--flashing')
    await new Promise<void>((resolve) => {
      el.addEventListener('animationend', () => resolve(), { once: true })
    })
    el.classList.remove('option-btn--flashing')
    setView('main')
  }

  /** Flash-then-go-back to main view (from options). */
  async function handleBackOptionsClick() {
    const el = backOptionsRef.current
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
                {dict.start.intro}
              </NavigationLink>

              {/* GAMES — opens submenu, no navigation */}
              <button
                id="start-games-btn"
                ref={gamesRef}
                className="option-btn"
                onClick={handleGamesClick}
              >
                {dict.start.games}
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
                {dict.start.credits}
              </NavigationLink>

              {/* OPTIONS — opens options submenu, no navigation */}
              <button
                id="start-options-btn"
                ref={optionsRef}
                className="option-btn"
                onClick={handleOptionsClick}
              >
                {dict.start.options}
              </button>
            </>
          )}

          {view === 'games' && (
            <>
              {/* BACK — returns to main view with flash */}
              <button
                id="start-games-back-btn"
                ref={backGamesRef}
                className="option-btn"
                style={{ alignSelf: 'flex-start', width: 'auto' }}
                onClick={handleBackGamesClick}
              >
                {dict.nav.back}
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

          {view === 'options' && (
            <>
              {/* BACK — returns to main view with flash */}
              <button
                id="start-options-back-btn"
                ref={backOptionsRef}
                className="option-btn"
                style={{ alignSelf: 'flex-start', width: 'auto' }}
                onClick={handleBackOptionsClick}
              >
                {dict.nav.back}
              </button>

              {/* Language toggle — Portuguese ←→ English */}
              <div
                id="start-options-lang-toggle"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.5rem',
                  marginTop: '1rem',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-heading), monospace',
                    fontSize: 'clamp(1rem, 4vw, 1.5rem)',
                    color: lang === 'pt' ? '#ffffff' : 'var(--color-muted)',
                    transition: 'color 200ms ease',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  {dict.options.labelPt}
                </span>

                <Switch
                  id="lang-switch"
                  checked={lang === 'en'}
                  onCheckedChange={(checked) => setLang(checked ? 'en' : 'pt')}
                  aria-label="Toggle language between Portuguese and English"
                />

                <span
                  style={{
                    fontFamily: 'var(--font-heading), monospace',
                    fontSize: 'clamp(1rem, 4vw, 1.5rem)',
                    color: lang === 'en' ? '#ffffff' : 'var(--color-muted)',
                    transition: 'color 200ms ease',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  {dict.options.labelEn}
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  )
}
