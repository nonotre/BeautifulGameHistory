'use client'

import { useRef, useState, useEffect, useId } from 'react'
import { playConfirm, playHover } from '@/lib/sounds'

// ── Pixel-art triangle ───────────────────────────────────────────────────────
// Em-unit pyramid so the icon scales with the text font size.
// Height: 4 rows × 0.15em = 0.6em  (0.6× of previous 1em).
// Widths: 0.6em, 0.45em, 0.3em, 0.15em — same 4:3:2:1 proportions.
//
// Closed (pointing down): wide row first → narrow row last.
// Open   (pointing up):   narrow row first → wide row last.

const ROW_WIDTHS_EM = [0.6, 0.45, 0.3, 0.15] // closed = down

interface TriangleProps {
  open: boolean
}

function PixelTriangle({ open }: TriangleProps) {
  const rows = open ? [...ROW_WIDTHS_EM].reverse() : ROW_WIDTHS_EM

  return (
    <span
      aria-hidden="true"
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 0,
        flexShrink: 0,
        // Total height = 4 rows × 0.15em = 0.6em
        height: '0.6em',
      }}
    >
      {rows.map((w, i) => (
        <span
          key={i}
          style={{
            display: 'block',
            width: `${w}em`,
            height: '0.15em',
            backgroundColor: 'currentColor',
          }}
        />
      ))}
    </span>
  )
}

// ── Link list item ─────────────────────────────────────────────────────────

interface LinkItem {
  href: string
  label: string
}

// ── Animated reveal for lines ──────────────────────────────────────────────
// Same cadence as Paragraphs in AnimatedContent: start=150ms, accel=10ms/line, min=100ms.

const LINE_INTERVAL_START = 150
const LINE_INTERVAL_MIN = 100
const LINE_ACCEL = 10

// ── Main component ─────────────────────────────────────────────────────────

interface LinksAccordionProps {
  /** Label shown on the header row (e.g. "Pong"). */
  title: string
  links: readonly LinkItem[]
}

export function LinksAccordion({ title, links }: LinksAccordionProps) {
  const [open, setOpen] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [revealed, setRevealed] = useState(0)
  const revealedRef = useRef(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const panelId = useId()

  // Start reveal animation when opened; reset when closed.
  useEffect(() => {
    if (open) {
      revealedRef.current = 0
      setRevealed(0)

      function revealNext(lineIdx: number) {
        if (lineIdx >= links.length) return
        revealedRef.current = lineIdx + 1
        setRevealed(lineIdx + 1)
        const delay = Math.max(LINE_INTERVAL_START - lineIdx * LINE_ACCEL, LINE_INTERVAL_MIN)
        timerRef.current = setTimeout(() => revealNext(lineIdx + 1), delay)
      }

      // Kick off after a tiny delay so the open animation starts first
      timerRef.current = setTimeout(() => revealNext(0), 60)
    } else {
      if (timerRef.current) clearTimeout(timerRef.current)
      revealedRef.current = 0
      setRevealed(0)
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [open, links.length])

  // Hover color: gray on hover, current text color otherwise (header only).
  const headerColor = hovered
    ? 'color-mix(in srgb, var(--theme-text, currentColor) 50%, transparent)'
    : 'var(--theme-text, inherit)'

  return (
    <div>
      {/* ── Header row — the entire thing is clickable ── */}
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => { playConfirm(); setOpen((v) => !v) }}
        onMouseEnter={() => { playHover(); setHovered(true) }}
        onMouseLeave={() => setHovered(false)}
        style={{
          // Reset button styles
          all: 'unset',
          // Layout
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          cursor: 'pointer',
          // all: 'unset' already strips the global heading font override,
          // so we get the body (VT323) font by default. Make it explicit:
          fontFamily: 'var(--font-body), monospace',
          lineHeight: 1.8,
          color: headerColor,
          fontSize: 'var(--font-size-base, 1rem)',
          // Smooth hover color transition
          transition: 'color 150ms ease',
        }}
      >
        <span style={{ flex: 1 }}>{title}</span>
        {/* gap between text and triangle */}
        <span style={{ width: '1rem', flexShrink: 0 }} />
        <PixelTriangle open={open} />
      </button>

      {/* ── Body — not clickable, lines fade in one by one ── */}
      <div
        id={panelId}
        role="region"
        aria-label={title}
        style={{
          overflow: 'hidden',
          // Height collapses to 0 when closed, auto when open.
          // CSS grid trick for smooth height animation.
          display: 'grid',
          gridTemplateRows: open ? '1fr' : '0fr',
          transition: 'grid-template-rows 250ms ease',
        }}
      >
        <div style={{ overflow: 'hidden' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              paddingTop: '0.5rem',
              paddingBottom: '0.25rem',
              gap: 0,
            }}
          >
            {links.map((link, i) => (
              <a
                key={i}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  // Reveal: invisible until its turn
                  opacity: i < revealed ? 1 : 0,
                  transition: i < revealed ? 'opacity 120ms ease' : 'none',
                  lineHeight: 1.8,
                  color: 'var(--theme-text, inherit)',
                  fontSize: 'var(--font-size-base, 1rem)',
                  textDecoration: 'underline',
                  textUnderlineOffset: '3px',
                  wordBreak: 'break-all',
                  // Use body font (VT323) — the global CSS applies heading font
                  // (Silkscreen) to all <a> elements, which only has uppercase glyphs.
                  fontFamily: 'var(--font-body), monospace',
                  textTransform: 'none',
                  display: 'block',
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
