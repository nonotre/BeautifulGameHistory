'use client'

import { useRouter } from 'next/navigation'
import { useNavigationStore } from '@/store/navigationStore'
import { en } from '@/lib/i18n/en'

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
 * Only serializable primitives (boolean, string) are accepted as props
 * from Server Component parents — no functions passed across the boundary.
 */
export function Header({ hasNext = false, nextHref }: HeaderProps) {
  const router = useRouter()
  const pushRoute = useNavigationStore((s) => s.pushRoute)
  const popRoute = useNavigationStore((s) => s.popRoute)

  function handleBack() {
    const destination = popRoute()
    if (destination) {
      router.push(destination)
    } else {
      router.push('/')
    }
  }

  function handleNext() {
    if (!nextHref) return
    // Record where we came from before navigating forward.
    // The current URL is pushed so BACK can return here.
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
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <button
        id="header-back-btn"
        className="btn btn--ghost"
        onClick={handleBack}
        aria-label="Go back"
      >
        {en.nav.back}
      </button>

      {hasNext && nextHref && (
        <button
          id="header-next-btn"
          className="btn btn--ghost"
          onClick={handleNext}
          aria-label="Go to next page"
        >
          {en.nav.next}
        </button>
      )}
    </header>
  )
}
