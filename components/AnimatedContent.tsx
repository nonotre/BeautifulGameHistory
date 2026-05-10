'use client'

import { useCallback, useEffect, useRef, type ComponentType, type RefObject } from 'react'
import { AnimatedBlock } from './AnimatedBlock'
import { Mario85Cursor } from './reveal-cursors/Mario85Cursor'
import { Mario64Cursor } from './reveal-cursors/Mario64Cursor'
import { TetrisCursor } from './reveal-cursors/TetrisCursor'
import { PacmanCursor } from './reveal-cursors/PacmanCursor'
import { PongCursor } from './reveal-cursors/PongCursor'
import type { CursorProps } from './reveal-cursors/types'
import type { GameSlug } from '@/lib/themes'

// ── Timing constants ────────────────────────────────────────────────────────

/** ms between each revealed character in a heading. */
const HEADING_CHAR_INTERVAL_MS = 36
/** Starting ms between revealed lines in a paragraph group. */
const PARA_LINE_INTERVAL_START = 150
/** Minimum ms between revealed lines (floor). */
const PARA_LINE_INTERVAL_MIN = 100
/** How much faster each successive line is (ms subtracted per line). */
const PARA_LINE_ACCEL = 10

// ── Cursor registry ────────────────────────────────────────────────────────

const CURSOR_MAP: Partial<Record<GameSlug, ComponentType<CursorProps>>> = {
  'mario-85': Mario85Cursor,
  'mario-64': Mario64Cursor,
  'tetris': TetrisCursor,
  'pac-man': PacmanCursor,
  'pong': PongCursor,
}

interface CursorConfig {
  heightScale: number
  aspectRatio?: number
  overlapRatio: number
}

const CURSOR_CONFIG: Partial<Record<GameSlug, CursorConfig>> = {
  'pong': { 
    heightScale: 2, 
    aspectRatio: 1.5, 
    // overlap by ~10% so the right paddle is over the new characters
    overlapRatio: 0.1 
  },
  'mario-85': { heightScale: 3, overlapRatio: 0.6 },
  'mario-64': { heightScale: 3, overlapRatio: 0.6 },
  'tetris': { 
    heightScale: 1, 
    aspectRatio: 31 / 7, 
    // overlap by 60% of ONE block. Since total width is 31/7 blocks,
    // the ratio relative to total width is 0.6 / (31/7).
    overlapRatio: 0.6 / (31 / 7) 
  },
  'pac-man': {
    heightScale: 1,
    aspectRatio: 9.5, // 2 (big) + 5 (dots) + 5*0.5 (gaps)
    // The front piece is the big circle on the left (width 2).
    // To make it overlap the text by 60% of its width (1.2),
    // we need spriteX = x - (2 - 1.2) = x - 0.8.
    // Since pieceWidth is 9.5, overlapRatio must be 8.7 / 9.5.
    overlapRatio: 8.7 / 9.5
  },
}

function getCursorConfig(slug: GameSlug | null | undefined): CursorConfig {
  if (!slug) return { heightScale: 1, overlapRatio: 0.6 }
  return CURSOR_CONFIG[slug] || { heightScale: 1, overlapRatio: 0.6 }
}

/** Public URL of each sprite — used to preload natural dimensions. */
const SPRITE_URL_MAP: Partial<Record<GameSlug, string>> = {
  'mario-85': '/animations/green_shell_mario85.png',
  'mario-64': '/animations/hat-mario64.png',
  'tetris': '/animations/block-tetris.png',
}

// ── Types ─────────────────────────────────────────────────────────────────

interface VisualLine {
  chars: HTMLSpanElement[]
  /** True when all chars in this visual line belong to a heading block. */
  isHeading: boolean
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
  /** Index of the next char to reveal within the current heading line. */
  const charIdxInLine = useRef(0)
  /** All char spans collected from AnimatedBlock children. */
  const allCharSpans = useRef<HTMLSpanElement[]>([])
  /** RAF handle. */
  const rafId = useRef(0)
  /** Last tick timestamp for char/line interval gating. */
  const lastTime = useRef(0)
  /** Whether the RAF loop is currently running. */
  const running = useRef(false)

  // ── Paragraph acceleration state ─────────────────────────────────────
  /** Lines revealed in the current paragraph group (resets after each heading). */
  const paraLineCount = useRef(0)

  // ── Heading cursor animation state ───────────────────────────────────
  /**
   * When a heading line starts, we record its geometry so the cursor can glide
   * smoothly from left to right in every RAF frame, independent of char ticks.
   */
  const headingCursorActive = useRef(false)
  const headingLineStartX = useRef(0)   // left edge of first char (relative to container)
  const headingLineEndX = useRef(0)     // right edge of last char  (relative to container)
  const headingLineBaseY = useRef(0)    // top edge of the line (relative to container)
  const headingLineHeight = useRef(0)   // height of one char (for vertical centering)
  const headingStartTime = useRef(0)    // performance.now() when this heading line began
  const headingTotalDuration = useRef(0) // chars * HEADING_CHAR_INTERVAL_MS

  const cursorRef = useRef<HTMLSpanElement | null>(null)
  const pieceRef = useRef<HTMLDivElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  /** Cached pieceHeight for the sprite cursor. */
  const pieceHeightRef = useRef(0)
  /** naturalWidth / naturalHeight of the sprite — preloaded once. */
  const spriteAspectRatioRef = useRef(1)

  // Determine whether this game uses a sprite cursor.
  const SpriteCursor = CURSOR_MAP[gameSlug] ?? null

  // ── Helpers ───────────────────────────────────────────────────────────

  /** True if the visual line is fully within the scroll container's visible band. */
  function isLineVisible(line: VisualLine): boolean {
    const sc = scrollContainerRef.current
    if (!sc || line.chars.length === 0) return false
    const rect = line.chars[0].getBoundingClientRect()
    const scRect = sc.getBoundingClientRect()
    // Require the bottom of the character to be fully inside the viewport.
    // This prevents paragraph lines from instantly animating while still partially off-screen.
    return rect.top >= scRect.top - 2 && rect.bottom <= scRect.bottom
  }

  /** ms to wait before revealing the next paragraph line (with acceleration). */
  function paraInterval(): number {
    const interval = PARA_LINE_INTERVAL_START - paraLineCount.current * PARA_LINE_ACCEL
    return Math.max(interval, PARA_LINE_INTERVAL_MIN)
  }

  /**
   * Begin the smooth cursor glide for a heading line.
   * Calculates coordinates relative to the scroll container so the cursor
   * natively scrolls with the text without needing RAF updates.
   */
  function startHeadingCursor(line: VisualLine, now: number) {
    const first = line.chars[0]
    const last = line.chars[line.chars.length - 1]
    const firstR = first.getBoundingClientRect()
    const lastR = last.getBoundingClientRect()
    const containerR = containerRef.current!.getBoundingClientRect()

    if (SpriteCursor) {
      const config = getCursorConfig(gameSlug)
      const style = getComputedStyle(first.parentElement!)
      const fontSize = parseFloat(style.fontSize)
      const pieceHeight = fontSize * config.heightScale
      pieceHeightRef.current = pieceHeight

      // Set CSS variable so complex components (like Tetris) can size multiple children
      if (pieceRef.current) {
        pieceRef.current.style.setProperty('--piece-height', `${pieceHeight}px`)
      }

      const pieceWidth = pieceHeight * spriteAspectRatioRef.current

      const startX = firstR.left - containerR.left
      const originalEndX = lastR.right - containerR.left
      const originalDistance = originalEndX - startX
      const originalTime = line.chars.length * HEADING_CHAR_INTERVAL_MS
      const speed = originalTime > 0 ? originalDistance / originalTime : 0

      // Extrapolate the journey: add enough distance so that the final position
      // leaves exactly a 4px gap. Since we shift the sprite right by overlapRatio
      // during the render, we need extraDistance = pieceWidth * (1 - overlapRatio) + 4
      const extraDistance = pieceWidth * (1 - config.overlapRatio) + 4
      const extraTime = speed > 0 ? extraDistance / speed : 0

      headingLineStartX.current = startX
      headingLineEndX.current = originalEndX + extraDistance
      headingLineBaseY.current = firstR.top - containerR.top
      headingLineHeight.current = firstR.height
      headingStartTime.current = now
      headingTotalDuration.current = originalTime + extraTime
      headingCursorActive.current = true

      if (pieceRef.current) {
        pieceRef.current.style.setProperty('--text-end-x', `${originalEndX}px`)
        pieceRef.current.style.display = 'block'
        updateHeadingCursor(now)
      }
    } else {
      // Fallback
      headingLineStartX.current = firstR.left - containerR.left
      headingLineEndX.current = lastR.right - containerR.left
      headingLineBaseY.current = firstR.top - containerR.top
      headingLineHeight.current = firstR.height
      headingStartTime.current = now
      headingTotalDuration.current = line.chars.length * HEADING_CHAR_INTERVAL_MS
      headingCursorActive.current = true

      if (cursorRef.current) cursorRef.current.style.display = 'inline'
    }
  }

  /**
   * Update the cursor position every RAF frame for a smooth glide.
   * X and Y are now perfectly container-relative.
   */
  function updateHeadingCursor(now: number) {
    if (!headingCursorActive.current) return

    const elapsed = now - headingStartTime.current
    const progress = Math.min(elapsed / headingTotalDuration.current, 1)

    const x = headingLineStartX.current + progress * (headingLineEndX.current - headingLineStartX.current)
    const y = headingLineBaseY.current

    if (SpriteCursor) {
      const config = getCursorConfig(gameSlug)
      const piece = pieceRef.current
      if (!piece) return
      
      const pieceHeight = pieceHeightRef.current
      const pieceWidth = pieceHeight * spriteAspectRatioRef.current

      // Use exact previous logic: right edge of the sprite aligns with x.
      // Shifted the sprite right by overlapRatio to cover the newly revealed letters.
      const spriteX = x - pieceWidth + (pieceWidth * config.overlapRatio)
      const spriteY = y + (headingLineHeight.current / 2) - (pieceHeight / 2)

      piece.style.left = `${spriteX}px`
      piece.style.top = `${spriteY}px`
      
      // Mask the cursor dynamically at the left edge of the container (x=0)
      // so trailing blocks smoothly "enter" the column instead of popping in.
      const clipLeft = Math.max(0, -spriteX)
      piece.style.clipPath = `inset(-100% -100% -100% ${clipLeft}px)`
      
      // Update progress variable for complex cursors
      piece.style.setProperty('--cursor-progress', progress.toString())
      piece.style.setProperty('--cursor-x', `${spriteX}px`)
    } else {
      const cursor = cursorRef.current
      if (!cursor) return
      const gap = 8 // fixed px gap for fallback cursor
      cursor.style.transform = `translate(${x + gap}px, ${y}px)`
    }
  }

  // ── Scroll Spy for Active Clone ──────────────────────────────────────────

  /** Calculate and update which Pac-Man clone should be actively chomping based on scroll */
  const updateActiveClone = useCallback(() => {
    if (gameSlug !== 'pac-man') return
    const sc = scrollContainerRef.current
    const container = containerRef.current
    if (!sc || !container) return

    const scRect = sc.getBoundingClientRect()
    const clones = Array.from(container.querySelectorAll<HTMLElement>('.reveal-piece-clone'))
    
    let activeClone: HTMLElement | null = null
    let minTop = Infinity

    clones.forEach(clone => {
      const rect = clone.getBoundingClientRect()
      // Check if the clone is visible in the scroll container's viewport
      if (rect.bottom > scRect.top && rect.top < scRect.bottom) {
        if (rect.top < minTop) {
          minTop = rect.top
          activeClone = clone
        }
      }
    })

    clones.forEach(clone => {
      if (clone === activeClone) {
        clone.classList.add('pacman-active')
      } else {
        clone.classList.remove('pacman-active')
      }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameSlug])

  // ── RAF tick ──────────────────────────────────────────────────────────

  const tick = useCallback(function tick(now: number) {
    const lines = allLines.current

    // ── Per-frame: update heading cursor glide ─────────────────────────
    if (SpriteCursor && headingCursorActive.current) {
      updateHeadingCursor(now)
    }

    if (nextLineIdx.current >= lines.length) {
      running.current = false
      return
    }

    const line = lines[nextLineIdx.current]

    if (!isLineVisible(line)) {
      running.current = false
      return
    }

    if (line.isHeading) {
      // ── Heading: wall-clock synchronized reveal ──────────────────────
      const chars = line.chars
      
      if (charIdxInLine.current === 0) {
        paraLineCount.current = 0 // reset paragraph acceleration
        startHeadingCursor(line, now)
        chars[0].style.color = 'inherit'
        charIdxInLine.current = 1
        lastTime.current = now // keep paragraph timer updated
      }

      const elapsed = now - headingStartTime.current
      // +1 because the 0th character is revealed at t=0
      const expectedChars = Math.floor(elapsed / HEADING_CHAR_INTERVAL_MS) + 1

      while (charIdxInLine.current < expectedChars && charIdxInLine.current < chars.length) {
        chars[charIdxInLine.current].style.color = 'inherit'
        charIdxInLine.current++
      }

      // Finish this line only when both chars are revealed AND the cursor has reached the end
      if (charIdxInLine.current >= chars.length && elapsed >= headingTotalDuration.current) {
        
        // Clone the cursor and leave it behind permanently!
        if (SpriteCursor && pieceRef.current) {
          const clone = pieceRef.current.cloneNode(true) as HTMLElement
          clone.classList.add('reveal-piece-clone')
          clone.dataset.headingIdx = String(nextLineIdx.current)
          if (gameSlug === 'pac-man') clone.classList.add('pacman-outro')
          containerRef.current?.appendChild(clone)

          // Prevent CSS animation jump when the clone is inserted by syncing the currentTime
          // to exactly match the original element's current animation phase.
          try {
            const originalAnims = pieceRef.current.getAnimations({ subtree: true })
            const cloneAnims = clone.getAnimations({ subtree: true })
            cloneAnims.forEach((anim, i) => {
              if (originalAnims[i]) {
                anim.currentTime = originalAnims[i].currentTime
              }
            })
          } catch (e) {
            // fallback if not supported, jump will happen but it won't crash
          }

          pieceRef.current.style.display = 'none'
          
          updateActiveClone()
        } else if (!SpriteCursor && cursorRef.current) {
          const clone = cursorRef.current.cloneNode(true) as HTMLElement
          clone.classList.add('reveal-cursor-clone')
          containerRef.current?.appendChild(clone)
          cursorRef.current.style.display = 'none'
        }

        headingCursorActive.current = false
        nextLineIdx.current++
        charIdxInLine.current = 0
        
        if (nextLineIdx.current < lines.length && !isLineVisible(lines[nextLineIdx.current])) {
          running.current = false
        }
      }
    } else {
      // ── Paragraph: interval-based line reveal ────────────────────────
      const elapsed = now - lastTime.current
      if (elapsed >= paraInterval()) {
        lastTime.current = now
        const chars = line.chars

        for (const ch of chars) {
          ch.style.color = 'inherit'
        }
        
        paraLineCount.current++
        nextLineIdx.current++
        charIdxInLine.current = 0

        if (nextLineIdx.current >= lines.length) {
          running.current = false
          return
        }

        if (lines[nextLineIdx.current].isHeading) {
          paraLineCount.current = 0
        }

        if (!isLineVisible(lines[nextLineIdx.current])) {
          running.current = false
          return
        }
      }
    }

    if (running.current) {
      rafId.current = requestAnimationFrame(tick)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const config = getCursorConfig(gameSlug)
    if (config.aspectRatio) {
      spriteAspectRatioRef.current = config.aspectRatio
    } else {
      spriteAspectRatioRef.current = 1
    }

    const url = SPRITE_URL_MAP[gameSlug]
    if (!url) return

    if (!config.aspectRatio) {
      const img = new window.Image()
      img.onload = () => {
        if (img.naturalHeight > 0) {
          spriteAspectRatioRef.current = img.naturalWidth / img.naturalHeight
        }
      }
      img.src = url
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameSlug])

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

    const tops = spans.map((s) => s.getBoundingClientRect().top)

    const TOLERANCE = 4
    const lines: VisualLine[] = []
    let lineChars: HTMLSpanElement[] = [spans[0]]
    let lineTop = tops[0]

    for (let i = 1; i < spans.length; i++) {
      if (tops[i] > lineTop + TOLERANCE) {
        lines.push({ chars: lineChars, isHeading: lineChars[0].hasAttribute('data-heading-char') })
        lineChars = [spans[i]]
        lineTop = tops[i]
      } else {
        lineChars.push(spans[i])
      }
    }
    if (lineChars.length > 0) lines.push({ chars: lineChars, isHeading: lineChars[0].hasAttribute('data-heading-char') })

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

      function handleScroll() {
        maybeStartLoop()
        updateActiveClone()
      }
      sc?.addEventListener('scroll', handleScroll, { passive: true })

      function handleResize() {
        cancelAnimationFrame(rafId.current)
        running.current = false
        charIdxInLine.current = 0
        paraLineCount.current = 0
        
        // Remove all clones to avoid messy layout on resize
        const clones = containerRef.current?.querySelectorAll('.reveal-piece-clone, .reveal-cursor-clone')
        clones?.forEach(c => c.remove())

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
        /* Sprite cursor — position:absolute, moves relative to container */
        <div
          ref={pieceRef}
          className="reveal-piece"
          aria-hidden="true"
          style={{ position: 'absolute', display: 'none' }}
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
