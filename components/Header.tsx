'use client'

import { useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useNavigationStore } from '@/store/navigationStore'
import { useDictionary } from '@/lib/i18n/useDictionary'

interface HeaderProps {
  /** Whether to render the NEXT button. */
  hasNext?: boolean
  /** The href the NEXT button navigates to. */
  nextHref?: string
}

/**
 * Shared header — Client Component.
 * - BACK: pops the navigationStore history stack and router.push to that route.
 * - NEXT: pushes current route then router.push to nextHref.
 *
 * Both buttons use the same .option-btn style and flash animation as the
 * homepage menu buttons (StartScreen).
 */
export function Header({ hasNext = false, nextHref }: HeaderProps) {
  const dict = useDictionary()
  const router = useRouter()
  const pushRoute = useNavigationStore((s) => s.pushRoute)
  const popRoute = useNavigationStore((s) => s.popRoute)

  const backRef = useRef<HTMLButtonElement>(null)
  const nextRef = useRef<HTMLButtonElement>(null)

  /** Runs the 450ms flash animation on the given button element. */
  async function flash(ref: React.RefObject<HTMLButtonElement | null>) {
    const el = ref.current
    if (!el) return
    el.classList.add('option-btn--flashing')
    await new Promise<void>((resolve) => {
      el.addEventListener('animationend', () => resolve(), { once: true })
    })
    el.classList.remove('option-btn--flashing')
  }

  async function handleBack() {
    await flash(backRef)
    const destination = popRoute()
    if (destination) {
      router.push(destination)
    } else {
      router.push('/')
    }
  }

  async function handleNext() {
    if (!nextHref) return
    await flash(nextRef)
    const currentPath = window.location.pathname
    pushRoute(currentPath)
    router.push(nextHref)
  }

  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 0',
        // Reads --theme-border injected by GameScreen on the parent <main>.
        borderBottom: '4px solid var(--theme-border)',
      }}
    >
      <button
        ref={backRef}
        id="header-back-btn"
        className="option-btn"
        // Reads --theme-btn injected by GameScreen on the parent <main>.
        style={{ width: 'auto', textAlign: 'left', color: 'var(--theme-btn)' }}
        onClick={handleBack}
        aria-label="Go back"
      >
        {dict.nav.back}
      </button>

      {hasNext && nextHref && (
        <button
          ref={nextRef}
          id="header-next-btn"
          className="option-btn"
          // Reads --theme-btn injected by GameScreen on the parent <main>.
          style={{ width: 'auto', textAlign: 'right', color: 'var(--theme-btn)' }}
          onClick={handleNext}
          aria-label="Go to next page"
        >
          {dict.nav.next}
        </button>
      )}
    </header>
  )
}
