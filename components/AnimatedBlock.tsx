'use client'

import { forwardRef, useMemo } from 'react'

// ── Types ─────────────────────────────────────────────────────────────────

type Run = { bold: boolean; chars: string[] }

// ── Helpers ───────────────────────────────────────────────────────────────

/**
 * Splits a raw content string into plain and bold runs.
 * Each character within a run is kept as a separate element.
 *
 * Example: "Hello **World**!" → [
 *   { bold: false, chars: ['H','e','l','l','o',' '] },
 *   { bold: true,  chars: ['W','o','r','l','d'] },
 *   { bold: false, chars: ['!'] },
 * ]
 */
function parseRuns(text: string): Run[] {
  // Split on **…** markers, keeping the delimiters in the result array.
  const parts = text.split(/(\*\*.*?\*\*)/g)
  return parts
    .filter((part) => part.length > 0)
    .map((part) => {
      const bold = part.startsWith('**') && part.endsWith('**') && part.length > 4
      const raw = bold ? part.slice(2, -2) : part
      return { bold, chars: [...raw] } // spread → Unicode-safe char array
    })
}

// ── Props ─────────────────────────────────────────────────────────────────

interface AnimatedBlockProps {
  /** Raw content string (may start with '### ' for headings, may contain **bold**). */
  text: string
  /** Unique identifier for this block; written as data-block-id on the sentinel. */
  blockId: string
  /**
   * Callback fired once after initial render to expose all span elements.
   * The parent (AnimatedContent) uses these to build the global char list.
   */
  onSpansReady: (blockId: string, spans: HTMLSpanElement[]) => void
}

// ── Component ─────────────────────────────────────────────────────────────

/**
 * AnimatedBlock — renders one item from game.content[].
 *
 * All characters start as `color: transparent`. The parent AnimatedContent
 * engine reveals them one by one by toggling their color to `inherit`.
 *
 * The sentinel <span> at the top is observed by IntersectionObserver in the
 * parent; when it enters the viewport all lines of this block are enqueued.
 */
export const AnimatedBlock = forwardRef<HTMLDivElement, AnimatedBlockProps>(
  function AnimatedBlock({ text, blockId, onSpansReady }, ref) {
    const isHeading = text.startsWith('### ')
    const displayText = isHeading ? text.slice(4) : text

    // Parse into bold/plain runs — stable across re-renders (content never changes).
    const runs = useMemo(() => parseRuns(displayText), [displayText])

    // Collect span refs via callback ref pattern.
    const spanCollector: HTMLSpanElement[] = []

    function captureSpan(el: HTMLSpanElement | null) {
      if (el) spanCollector.push(el)
    }

    // After the element mounts fire onSpansReady exactly once.
    // We use a callback ref on the wrapper div for this.
    function handleWrapperRef(el: HTMLDivElement | null) {
      // Forward the ref (forwardRef)
      if (typeof ref === 'function') ref(el)
      else if (ref) ref.current = el

      if (el) {
        // Collect all .reveal-char spans inside this block from the DOM,
        // in document order (guaranteed stable on initial mount).
        const spans = Array.from(
          el.querySelectorAll<HTMLSpanElement>('[data-reveal-char]'),
        )
        onSpansReady(blockId, spans)
      }
    }

    const charSpanStyle: React.CSSProperties = {
      color: 'transparent',
      display: 'inline',
    }

    // ── Render helper ───────────────────────────────────────────────────

    function renderRuns() {
      return runs.map((run, runIdx) => {
        const chars = run.chars.map((ch, charIdx) => (
          <span
            key={`${runIdx}-${charIdx}`}
            data-reveal-char
            data-block-id={blockId}
            ref={captureSpan}
            style={charSpanStyle}
          >
            {ch}
          </span>
        ))
        return run.bold ? (
          <strong key={runIdx} style={{ fontWeight: 'bold' }}>
            {chars}
          </strong>
        ) : (
          <span key={runIdx}>{chars}</span>
        )
      })
    }

    // ── JSX ────────────────────────────────────────────────────────────

    return (
      <div ref={handleWrapperRef} style={{ position: 'relative' }}>
        {/* Zero-height sentinel element observed by IntersectionObserver */}
        <span
          data-sentinel-id={blockId}
          style={{ display: 'block', height: 0, overflow: 'hidden' }}
          aria-hidden="true"
        />

        {isHeading ? (
          <h2
            style={{
              fontSize: '1rem',
              color: 'var(--theme-heading)',
              textTransform: 'uppercase',
              marginTop: '1rem',
            }}
          >
            {renderRuns()}
          </h2>
        ) : (
          <p
            style={{
              lineHeight: 1.8,
              color: 'var(--theme-text)',
              fontSize: 'var(--font-size-base)',
            }}
          >
            {renderRuns()}
          </p>
        )}
      </div>
    )
  },
)
