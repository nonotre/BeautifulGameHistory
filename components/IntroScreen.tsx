'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/Header'
import { useNavigationStore } from '@/store/navigationStore'
import { en } from '@/lib/i18n/en'

const YOUTUBE_PLACEHOLDER = 'https://www.youtube.com/embed/dQw4w9WgXcQ'
const COUNTDOWN_SECONDS = 30

/**
 * IntroScreen — Client Component.
 * Contains the YouTube embed, 30-second countdown, and SEE GAMES reveal.
 *
 * SEE GAMES button is revealed when ANY of:
 * 1. 30 seconds elapse.
 * 2. Video ends naturally (YouTube postMessage event).
 * 3. User pauses the video.
 */
export function IntroScreen() {
  const router = useRouter()
  const openGamesSubmenu = useNavigationStore((s) => s.openGamesSubmenu)
  const pushRoute = useNavigationStore((s) => s.pushRoute)

  const [countdown, setCountdown] = useState(COUNTDOWN_SECONDS)
  const [showSeeGames, setShowSeeGames] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  function revealSeeGames() {
    setShowSeeGames(true)
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }

  // Countdown timer — starts immediately.
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          revealSeeGames()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // YouTube IFrame API via postMessage.
  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.origin !== 'https://www.youtube.com') return
      try {
        const data = JSON.parse(event.data as string)
        // info.playerState: 0 = ended, 2 = paused
        if (data.event === 'infoDelivery' && data.info?.playerState !== undefined) {
          if (data.info.playerState === 0 || data.info.playerState === 2) {
            revealSeeGames()
          }
        }
      } catch {
        // Non-JSON messages from the iframe — ignore.
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  function handleSeeGames() {
    // Decision I, Option A: navigate to / with games submenu active.
    pushRoute('/intro')
    openGamesSubmenu()
    router.push('/')
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div className="column" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Header hasNext nextHref="/game/game-1" />

        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2rem',
            paddingBlock: '3rem',
          }}
        >
          {/* YouTube embed */}
          <div
            style={{
              width: '100%',
              aspectRatio: '16 / 9',
              background: '#000',
              position: 'relative',
            }}
          >
            <iframe
              ref={iframeRef}
              id="intro-youtube-player"
              src={`${YOUTUBE_PLACEHOLDER}?autoplay=1&enablejsapi=1`}
              title="Introduction video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                border: 'none',
              }}
            />
          </div>

          {/* Countdown or SEE GAMES */}
          {!showSeeGames && (
            <p
              style={{
                color: 'var(--color-muted)',
                fontSize: 'var(--font-size-base)',
                letterSpacing: '0.08em',
              }}
            >
              {en.intro.countdownMessage(countdown)}
            </p>
          )}

          {showSeeGames && (
            <button
              id="intro-see-games-btn"
              className="btn"
              onClick={handleSeeGames}
            >
              {en.intro.seeGames}
            </button>
          )}
        </div>
      </div>
    </main>
  )
}
