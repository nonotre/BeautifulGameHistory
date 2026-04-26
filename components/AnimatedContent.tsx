'use client'

import { useCallback, useEffect, useRef, type ComponentType, type RefObject } from 'react'
import { AnimatedBlock } from './AnimatedBlock'
import { Mario85Cursor } from './reveal-cursors/Mario85Cursor'
import { Mario64Cursor } from './reveal-cursors/Mario64Cursor'
import type { CursorProps } from './reveal-cursors/types'
import type { GameSlug } from '@/lib/themes'

const CHAR_INTERVAL_MS = 12

// ── Cursor registry ────────────────────────────────────────────────────────
// Only games with sprite cursors appear here. Other slugs fall back to the
// blinking `|` cursor (reveal-cursor class, unchanged behavior).

const CURSOR_MAP: Partial<Record<GameSlug, ComponentType<CursorProps>>> = {
  'mario-85': Mario85Cursor,
  'mario-64': Mario64Cursor,
}

/** Public URL of each sprite — used to preload natural dimensions. */
const SPRITE_URL_MAP: Partial<Record<GameSlug, string>> = {
  'mario-85': '/animations/green_shell_mario85.png',
  'mario-64': '/animations/hat-mario64.png',
}

// ── Types ─────────────────────────────────────────────────────────────────

interface VisualLine {
  chars: HTMLSpanElement[]
}

interface AnimatedContentProps {
  content: readonly string[]
  gameSlug: GameSlug
  /**
   * Ref to the scrollable section — used as IntersectionObserver root and
   * scroll event target so the engine reacts to the correct viewport.
   */
  scrollContainerRef: RefObject<HTMLElement | null>
}

// ── Component ─────────────────────────────────────────────────────────────

export function AnimatedContent({ content, gameSlug, scrollContainerRef }: AnimatedContentProps) {

  // ── Stable refs (no re-renders during animation) ─────────────────────

  /** Visual lines in document order, built once after fonts load. */
  const allLines = useRef<VisualLine[]>([])
  /** Index of the next line to start revealing. */
  const nextLineIdx = useRef(0)
  /** Index of the next char to reveal within the current line. */
  const charIdxInLine = useRef(0)
  /** All char spans collected from AnimatedBlock children. */
  const allCharSpans = useRef<HTMLSpanElement[]>([])
  /** RAF handle. */
  const rafId = useRef(0)
  /** Last tick timestamp. */
  const lastTime = useRef(0)
  /** Whether the RAF loop is currently running. */
  const running = useRef(false)

  const cursorRef = useRef<HTMLSpanElement | null>(null)
  const pieceRef = useRef<HTMLDivElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  /** Cached pieceHeight for the sprite cursor (updated in moveCursor). */
  const pieceHeightRef = useRef(0)
  /**
   * naturalWidth / naturalHeight of the sprite image — preloaded once so
   * pieceWidth can be derived as pieceHeight × aspectRatio without relying
   * on offsetWidth of a display:none element (which is always 0).
   */
  const spriteAspectRatioRef = useRef(1)

  // Determine whether this game uses a sprite cursor.
  const SpriteCursor = CURSOR_MAP[gameSlug] ?? null

  // ── Helpers ───────────────────────────────────────────────────────────

  /** True if the first char of `line` is within the scroll container's visible band. */
  function isLineVisible(line: VisualLine): boolean {
    const sc = scrollContainerRef.current
    if (!sc || line.chars.length === 0) return false
    const rect = line.chars[0].getBoundingClientRect()
    const scRect = sc.getBoundingClientRect()
    return rect.top >= scRect.top - 2 && rect.top < scRect.bottom
  }

  function moveCursor(el: HTMLSpanElement) {
    const r = el.getBoundingClientRect()

    if (SpriteCursor) {
      // ── Sprite cursor — position:fixed, viewport coords ────────────
      const piece = pieceRef.current
      if (!piece) return

      // Measure line metrics — pieceHeight = fontSize + inter-line gap (per plan §2).
      const style = getComputedStyle(el.parentElement!)
      const fontSize = parseFloat(style.fontSize)
      const lineHeightRaw = style.lineHeight
      const lineHeight =
        lineHeightRaw === 'normal' ? fontSize * 1.2 : parseFloat(lineHeightRaw)
      const gap = lineHeight - fontSize
      const pieceHeight = fontSize + gap
      pieceHeightRef.current = pieceHeight

      // Update the img's height directly (prop can't update without re-render).
      const img = piece.querySelector('img')
      if (img) (img as HTMLElement).style.height = `${pieceHeight}px`

      // Derive pieceWidth from preloaded aspect ratio.
      const pieceWidth = pieceHeight * spriteAspectRatioRef.current

      // Vertically center the piece on the character's line.
      const verticalCenter = r.top + (r.height / 2) - (pieceHeight / 2)

      // Place sprite: right edge aligns with char's right edge.
      piece.style.left = `${r.right - pieceWidth}px`
      piece.style.top = `${verticalCenter}px`
      piece.style.display = 'block'
    } else {
      // ── Fallback blinking `|` cursor — position:absolute in container ──
      const container = containerRef.current
      if (!container) return
      const cursor = cursorRef.current
      if (!cursor) return
      const cr = container.getBoundingClientRect()
      cursor.style.transform = `translate(${r.right - cr.left}px, ${r.top - cr.top}px)`
      cursor.style.display = 'inline'
    }
  }

  function hideCursor() {
    if (SpriteCursor) {
      if (pieceRef.current) pieceRef.current.style.display = 'none'
    } else {
      if (cursorRef.current) cursorRef.current.style.display = 'none'
    }
  }

  // ── RAF tick ──────────────────────────────────────────────────────────

  /**
   * Named inside useCallback so it can self-reference via closure.
   * Accesses everything through refs — zero re-renders.
   */
  const tick = useCallback(function tick(now: number) {
    const elapsed = now - lastTime.current

    if (elapsed >= CHAR_INTERVAL_MS) {
      lastTime.current = now
      const lines = allLines.current

      // All lines done
      if (nextLineIdx.current >= lines.length) {
        running.current = false
        hideCursor()
        return
      }

      const currentLine = lines[nextLineIdx.current]

      // Pause when the current line is not visible
      if (!isLineVisible(currentLine)) {
        running.current = false
        hideCursor()
        return
      }

      const chars = currentLine.chars
      const ci = charIdxInLine.current

      if (ci < chars.length) {
        // Reveal next char
        chars[ci].style.color = 'inherit'
        moveCursor(chars[ci])
        charIdxInLine.current++
      } else {
        // Line complete — advance pointer
        nextLineIdx.current++
        charIdxInLine.current = 0

        // All done
        if (nextLineIdx.current >= lines.length) {
          running.current = false
          hideCursor()
          return
        }

        // Pause if next line not visible
        if (!isLineVisible(lines[nextLineIdx.current])) {
          running.current = false
          hideCursor()
          return
        }
      }
    }

    rafId.current = requestAnimationFrame(tick)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ── Sprite preload ────────────────────────────────────────────────────
  // Load the sprite image off-screen so we have naturalWidth/naturalHeight
  // before the animation loop starts. This avoids offsetWidth=0 from a
  // display:none element.

  useEffect(() => {
    const url = SPRITE_URL_MAP[gameSlug]
    if (!url) return
    const img = new window.Image()
    img.onload = () => {
      if (img.naturalHeight > 0) {
        spriteAspectRatioRef.current = img.naturalWidth / img.naturalHeight
      }
    }
    img.src = url
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /** Start the loop only if stopped and the next unrevealed line is visible. */
  function maybeStartLoop() {
    if (running.current) return
    const lines = allLines.current
    if (nextLineIdx.current >= lines.length) return
    if (!isLineVisible(lines[nextLineIdx.current])) return
    running.current = true
    lastTime.current = 0
    rafId.current = requestAnimationFrame(tick)
  }

  // ── Line grouping ─────────────────────────────────────────────────────

  function buildLineGroups() {
    const spans = allCharSpans.current
    if (spans.length === 0) return

    // Snapshot all top values in one pass (avoids repeated getBoundingClientRect calls).
    const tops = spans.map((s) => s.getBoundingClientRect().top)

    // Scan in DOM order (= reading order).
    // A new visual line starts when a span's top is more than TOLERANCE px
    // below the current line's reference top. 4 px is well below any real
    // line-height but larger than sub-pixel rounding differences, so a single
    // visual row is always kept in one group even if individual chars differ
    // by ±1–2 px in their reported top.
    const TOLERANCE = 4
    const lines: VisualLine[] = []
    let lineChars: HTMLSpanElement[] = [spans[0]]
    let lineTop = tops[0]

    for (let i = 1; i < spans.length; i++) {
      if (tops[i] > lineTop + TOLERANCE) {
        lines.push({ chars: lineChars })
        lineChars = [spans[i]]
        lineTop = tops[i]
      } else {
        lineChars.push(spans[i])
      }
    }
    if (lineChars.length > 0) lines.push({ chars: lineChars })

    allLines.current = lines
  }

  // ── Span collection callback ──────────────────────────────────────────

  const onSpansReady = useCallback((_blockId: string, spans: HTMLSpanElement[]) => {
    allCharSpans.current.push(...spans)
  }, [])

  // ── Setup effect ──────────────────────────────────────────────────────

  useEffect(() => {
    let resizeTimer: ReturnType<typeof setTimeout>

    document.fonts.ready.then(() => {
      buildLineGroups()

      const container = containerRef.current
      if (!container) return

      const sc = scrollContainerRef.current

      // IntersectionObserver — triggers initial start as each block enters view.
      // root = scrollContainerRef so visibility is relative to the scroll window.
      const sentinels = Array.from(
        container.querySelectorAll<HTMLSpanElement>('[data-sentinel-id]'),
      )

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              observer.unobserve(entry.target)
              maybeStartLoop()
            }
          }
        },
        { root: sc, threshold: 0 },
      )
      sentinels.forEach((el) => observer.observe(el))

      // Scroll listener — resumes the loop whenever new lines scroll into view.
      function handleScroll() {
        maybeStartLoop()
      }
      sc?.addEventListener('scroll', handleScroll, { passive: true })

      // Resize — rebuild line groups and attempt resume.
      function handleResize() {
        cancelAnimationFrame(rafId.current)
        running.current = false
        charIdxInLine.current = 0
        buildLineGroups()
        maybeStartLoop()
      }
      function debouncedResize() {
        clearTimeout(resizeTimer)
        resizeTimer = setTimeout(handleResize, 200)
      }
      window.addEventListener('resize', debouncedResize)

      return () => {
        cancelAnimationFrame(rafId.current)
        observer.disconnect()
        sc?.removeEventListener('scroll', handleScroll)
        window.removeEventListener('resize', debouncedResize)
        clearTimeout(resizeTimer)
      }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ── Render ────────────────────────────────────────────────────────────

  return (
    <div
      ref={containerRef}
      style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
    >
      {content.map((item, idx) => (
        <AnimatedBlock
          key={idx}
          text={item}
          blockId={String(idx)}
          onSpansReady={onSpansReady}
        />
      ))}

      {SpriteCursor ? (
        /* Sprite cursor — absolutely positioned, moved by JS */
        <div
          ref={pieceRef}
          className="reveal-piece"
          aria-hidden="true"
          style={{ display: 'none' }}
        >
          <SpriteCursor pieceHeight={pieceHeightRef.current || 20} />
        </div>
      ) : (
        /* Blinking cursor — absolutely positioned, moved by JS */
        <span
          ref={cursorRef}
          className="reveal-cursor"
          aria-hidden="true"
          style={{ display: 'none' }}
        >
          |
        </span>
      )}
    </div>
  )
}
