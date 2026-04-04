'use client'

/**
 * PixelButton — Pixel-art styled button for BACK / NEXT navigation.
 *
 * Structure:
 *   <span class="pixel-btn-wrap">   ← holds the depth shadow via filter
 *     <button class="pixel-btn">   ← holds clip-path pixel-art corners
 *   </span>
 *
 * Why the wrapper?
 *   CSS `clip-path` clips box-shadow, so we can't apply both on the same
 *   element. `filter: drop-shadow` on the wrapper follows the clipped shape
 *   of the inner button, giving us pixel-art corners AND a visible shadow.
 *
 * Active / sinking effect:
 *   The wrapper translates down-left (same offset as the shadow).
 *   The shadow is removed — the button appears flush with the surface.
 *   Uses :has(button:active) on the wrapper for a single transform point.
 *
 * All colours come from CSS custom properties in globals.css.
 * No opacity is used anywhere.
 */

interface PixelButtonProps {
  id?: string
  children: React.ReactNode
  onClick?: () => void
  /** aria-label for screen readers */
  ariaLabel?: string
  /** Extra class names on the wrapper span */
  className?: string
}

export function PixelButton({
  id,
  children,
  onClick,
  ariaLabel,
  className = '',
}: PixelButtonProps) {
  return (
    <span className={`pixel-btn-wrap${className ? ` ${className}` : ''}`}>
      <button
        id={id}
        onClick={onClick}
        aria-label={ariaLabel}
        className="pixel-btn"
      >
        {children}
      </button>
    </span>
  )
}
