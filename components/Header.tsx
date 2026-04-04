'use client'

import { useRouter } from 'next/navigation'
import { useNavigationStore } from '@/store/navigationStore'
import { Button } from '@/components/ui/8bit/button'
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
 * Both buttons use the 8bitcn Button component (pixel-art style).
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
      <Button
        id="header-back-btn"
        onClick={handleBack}
        aria-label="Go back"
        size="lg"
      >
        {en.nav.back}
      </Button>

      {hasNext && nextHref && (
        <Button
          id="header-next-btn"
          onClick={handleNext}
          aria-label="Go to next page"
          size="lg"
        >
          {en.nav.next}
        </Button>
      )}
    </header>
  )
}
