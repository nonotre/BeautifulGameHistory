'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/Header'
import { useNavigationStore } from '@/store/navigationStore'
import { useDictionary } from '@/lib/i18n/useDictionary'
import { playHover, playConfirm } from '@/lib/sounds'

const YOUTUBE_VIDEO_ID = 'SXKn4ZgzNW4'
const YOUTUBE_EMBED_URL = `https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}`
const COUNTDOWN_SECONDS = 30

/**
 * IntroScreen — Client Component.
 * Contains the YouTube embed, 30-second countdown, and SEE GAMES reveal.
 *
 * SEE GAMES button is revealed when ANY of:
 * 1. 30 seconds elapse.
 * 2. Video ends naturally (YouTube postMessage: onStateChange info=0).
 * 3. User pauses the video (onStateChange info=2).
 */
export function IntroScreen() {
  const dict = useDictionary()
  const router = useRouter()
  const openGamesSubmenu = useNavigationStore((s) => s.openGamesSubmenu)
  const pushRoute = useNavigationStore((s) => s.pushRoute)

  const [countdown, setCountdown] = useState(COUNTDOWN_SECONDS)
  const [showSeeGames, setShowSeeGames] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const seeGamesBtnRef = useRef<HTMLButtonElement>(null)
  const revealedRef = useRef(false)

  function revealSeeGames() {
    if (revealedRef.current) return
    revealedRef.current = true
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

  /**
   * After the iframe loads, tell the YouTube player to emit state-change events.
   * This ensures onStateChange fires even when the user seeks to the end.
   */
  function handleIframeLoad() {
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: 'listening', id: 1, channel: 'widget' }),
      'https://www.youtube.com',
    )
  }

  // YouTube IFrame API via postMessage.
  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.origin !== 'https://www.youtube.com') return
      try {
        const data = JSON.parse(event.data as string)

        // After the player is ready, subscribe to onStateChange events.
        if (data.event === 'onReady') {
          iframeRef.current?.contentWindow?.postMessage(
            JSON.stringify({
              event: 'command',
              func: 'addEventListener',
              args: ['onStateChange'],
              id: 1,
              channel: 'widget',
            }),
            'https://www.youtube.com',
          )
        }

        // onStateChange: info is the state number directly (0=ended).
        if (data.event === 'onStateChange') {
          if (data.info === 0) {
            revealSeeGames()
          }
        }

        // infoDelivery: state is nested under info.playerState.
        if (data.event === 'infoDelivery' && data.info?.playerState !== undefined) {
          if (data.info.playerState === 0) {
            revealSeeGames()
          }
        }
      } catch {
        // Non-JSON messages from the iframe — ignore.
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /** Flash animation then navigate to games. */
  async function handleSeeGames() {
    playConfirm()
    const el = seeGamesBtnRef.current
    if (el) {
      el.classList.add('option-btn--flashing')
      await new Promise<void>((resolve) => {
        el.addEventListener('animationend', () => resolve(), { once: true })
      })
      el.classList.remove('option-btn--flashing')
    }
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
        <Header hasNext nextHref="/game/pong" />

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
              src={`${YOUTUBE_EMBED_URL}?autoplay=1&enablejsapi=1`}
              title="Introduction video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              onLoad={handleIframeLoad}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                border: 'none',
              }}
            />
          </div>

          {/* Countdown */}
          {!showSeeGames && (
            <p
              style={{
                color: 'var(--color-muted)',
                fontSize: 'var(--font-size-base)',
                letterSpacing: '0.08em',
              }}
            >
              {dict.intro.countdownMessage(countdown)}
            </p>
          )}

          {/* SEE GAMES — same style/animation as back & next buttons */}
          {showSeeGames && (
            <button
              ref={seeGamesBtnRef}
              id="intro-see-games-btn"
              className="option-btn"
              style={{ width: 'auto', color: 'var(--theme-btn)' }}
              onClick={handleSeeGames}
              onMouseEnter={playHover}
            >
              {dict.intro.seeGames}
            </button>
          )}
        </div>
      </div>
    </main>
  )
}
