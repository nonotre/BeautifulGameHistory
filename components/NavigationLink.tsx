'use client'

import { forwardRef } from 'react'
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
  /**
   * Optional async callback executed *before* the route push.
   * Useful for running animations (e.g. flash) before navigation.
   * Navigation will wait until the returned Promise resolves.
   */
  onBeforeNavigate?: () => Promise<void>
}

/**
 * NavigationLink — wraps a <button> that:
 * 1. Runs the optional `onBeforeNavigate` async callback (e.g. an animation).
 * 2. Pushes `from` onto the navigationStore history stack.
 * 3. Calls router.push(href).
 *
 * Forwards its ref so callers can access the underlying <button> DOM node
 * (e.g. to imperatively add/remove animation classes).
 *
 * Use this instead of <Link> when navigation must be tracked in the store.
 */
export const NavigationLink = forwardRef<HTMLButtonElement, NavigationLinkProps>(
  function NavigationLink(
    { href, from, children, className, id, style, onBeforeNavigate },
    ref,
  ) {
    const router = useRouter()
    const pushRoute = useNavigationStore((s) => s.pushRoute)

    async function handleClick() {
      if (onBeforeNavigate) {
        await onBeforeNavigate()
      }
      pushRoute(from)
      router.push(href)
    }

    return (
      <button ref={ref} id={id} className={className} style={style} onClick={handleClick}>
        {children}
      </button>
    )
  },
)
