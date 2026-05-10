'use client'

import { useEffect } from 'react'
import { playHover } from '@/lib/sounds'

/**
 * KeyboardNavigation — Client Component.
 * Intercepts Arrow Keys, Space, and Enter globally to provide keyboard accessibility.
 * - Arrow Keys: Moves focus between interactive elements (buttons, links, tabindex).
 * - Space/Enter: Triggers click on the currently focused interactive element.
 */
export function KeyboardNavigation() {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      // Find all focusable elements
      const selector = 'button, a[href], [tabindex]:not([tabindex="-1"])'
      const focusableElements = Array.from(
        document.querySelectorAll<HTMLElement>(selector)
      ).filter(
        // Ensure element is visible and not disabled
        (el) => !el.hasAttribute('disabled') && el.offsetParent !== null
      )

      if (focusableElements.length === 0) return

      const activeElement = document.activeElement as HTMLElement
      const currentIndex = focusableElements.indexOf(activeElement)

      // Handle Arrow Keys
      if (['ArrowDown', 'ArrowRight', 'ArrowUp', 'ArrowLeft'].includes(e.key)) {
        e.preventDefault() // Prevent page scroll

        let nextIndex = 0

        if (currentIndex === -1) {
          // If nothing is focused, focus the first element
          nextIndex = 0
        } else {
          if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
            nextIndex = currentIndex + 1
            if (nextIndex >= focusableElements.length) nextIndex = 0 // Wrap to start
          } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
            nextIndex = currentIndex - 1
            if (nextIndex < 0) nextIndex = focusableElements.length - 1 // Wrap to end
          }
        }

        const nextElement = focusableElements[nextIndex]
        if (nextElement) {
          nextElement.focus({ preventScroll: false }) // Let browser scroll to it
          playHover()
        }
      }

      // Handle Space and Enter for elements that don't natively support them
      if (e.key === ' ' || e.key === 'Enter') {
        if (activeElement && focusableElements.includes(activeElement)) {
          const tag = activeElement.tagName

          // For Space: Buttons handle it natively. Links and others do not.
          if (e.key === ' ' && tag !== 'BUTTON' && tag !== 'INPUT' && tag !== 'TEXTAREA') {
            e.preventDefault() // Prevent page scroll
            activeElement.click()
          }

          // For Enter: Buttons and Links handle it natively. Others do not.
          if (e.key === 'Enter' && tag !== 'BUTTON' && tag !== 'A' && tag !== 'INPUT' && tag !== 'TEXTAREA') {
            e.preventDefault() // Prevent form submit or other defaults
            activeElement.click()
          }
        }
      }
    }

    function handleKeyUp(e: KeyboardEvent) {
      if (e.key === 'Tab') {
        const activeElement = document.activeElement as HTMLElement
        const selector = 'button, a[href], [tabindex]:not([tabindex="-1"])'
        if (activeElement && activeElement.matches(selector)) {
          playHover()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  return null
}
