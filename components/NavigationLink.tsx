'use client'

import { useRouter } from 'next/navigation'
import { useNavigationStore } from '@/store/navigationStore'

interface NavigationLinkProps {
  /** Href to navigate to after pushing current route to the store. */
  href: string
  /** The route to record as "where we came from" before navigating. */
  from: string
  children: React.ReactNode
  className?: string
  id?: string
  style?: React.CSSProperties
}

/**
 * NavigationLink — wraps a <button> that:
 * 1. Pushes `from` onto the navigationStore history stack.
 * 2. Calls router.push(href).
 *
 * Use this instead of <Link> when navigation must be tracked in the store.
 */
export function NavigationLink({
  href,
  from,
  children,
  className,
  id,
  style,
}: NavigationLinkProps) {
  const router = useRouter()
  const pushRoute = useNavigationStore((s) => s.pushRoute)

  function handleClick() {
    pushRoute(from)
    router.push(href)
  }

  return (
    <button id={id} className={className} style={style} onClick={handleClick}>
      {children}
    </button>
  )
}
