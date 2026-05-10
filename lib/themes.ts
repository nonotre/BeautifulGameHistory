/**
 * lib/themes.ts — Single source of truth for game color themes.
 *
 * Two-layer architecture:
 *   Layer 1 — PRIMITIVES: raw color values per game, no semantic meaning.
 *   Layer 2 — SEMANTIC_MAP: maps UI roles → primitive values per game.
 *
 * Pure TypeScript module — no browser dependencies.
 * Safe to import in both Server Components and Client Components.
 */

// ── Layer 1: Primitive tokens ────────────────────────────────────────────────

export type GameSlug = 'pong' | 'pac-man' | 'tetris' | 'mario-85' | 'mario-64'

/** Raw color palette per game. No semantic meaning — just named values. */
export const PRIMITIVES: Record<GameSlug, Record<string, string>> = {
  pong: {
    '--pong-white': '#FFFFFF',
    '--pong-black': '#000000',
    // btn hover — #FFFFFF mixed with 40% black (channels × 0.6)
    '--pong-white-hover': '#999999',
  },
  'pac-man': {
    '--pacman-cream':   '#FFF8D6',
    '--pacman-black':   '#000000',
    '--pacman-yellow':  '#FDFF00',
    '--pacman-blue':    '#4231FF',
    '--pacman-pink':    '#EA82E5',
    '--pacman-cyan':    '#46BFEE',
    '--pacman-red':     '#D03E19',
    '--pacman-orange':  '#DB851C',
    // btn hover — #FDFF00 mixed with 40% black (channels × 0.6)
    '--pacman-yellow-hover': '#989900',
  },
  tetris: {
    '--tetris-light-green': '#DBE8D5',
    '--tetris-dark-green':  '#011501',
    '--tetris-green':       '#9BBC0F',
    '--tetris-olive':       '#8BAC0F',
    '--tetris-forest':      '#306230',
    // btn hover — #9BBC0F mixed with 40% black (channels × 0.6)
    '--tetris-green-hover': '#5D7109',
  },
  'mario-85': {
    '--mario85-peach':  '#FFDDC9',
    '--mario85-black':  '#020100',
    '--mario85-orange': '#DE5918',
    '--mario85-red':    '#F83612',
    // btn hover — #F83612 mixed with 40% black (channels × 0.6)
    '--mario85-red-hover': '#95200B',
  },
  'mario-64': {
    '--mario64-lavender': '#E1E2FF',
    '--mario64-navy':     '#040D31',
    '--mario64-red':      '#FE0002',
    '--mario64-blue':     '#0104F3',
    '--mario64-yellow':   '#FFE941',
    // btn hover — #FFE941 mixed with 40% black (channels × 0.6)
    '--mario64-yellow-hover': '#998C27',
  },
}

// ── Layer 2: Semantic tokens ─────────────────────────────────────────────────

/**
 * Semantic theme — the only tokens components should consume.
 *
 * Each field maps to a CSS custom property:
 *   bg      → --theme-bg      (background of the game <main>)
 *   border  → --theme-border  (header bottom line, controller zone top line)
 *   text    → --theme-text    (paragraphs / body copy)
 *   heading → --theme-heading (section headings <h2>)
 *   btn     → --theme-btn     (BACK / NEXT button text color)
 */
export type SemanticTheme = {
  bg:      string
  border:  string
  text:    string
  heading: string
  btn:     string
  /** Button hover color — btn color mixed with 40% black. */
  btnHover: string
}

/** Semantic values per game — each field references a PRIMITIVES entry. */
export const SEMANTIC_MAP: Record<GameSlug, SemanticTheme> = {
  pong: {
    bg:      PRIMITIVES.pong['--pong-black'],
    border:  PRIMITIVES.pong['--pong-white'],
    text:    PRIMITIVES.pong['--pong-white'],
    heading: PRIMITIVES.pong['--pong-white'],
    btn:     PRIMITIVES.pong['--pong-white'],
    btnHover: PRIMITIVES.pong['--pong-white-hover'],
  },
  'pac-man': {
    bg:      PRIMITIVES['pac-man']['--pacman-black'],
    border:  PRIMITIVES['pac-man']['--pacman-blue'],
    text:    PRIMITIVES['pac-man']['--pacman-cream'],
    heading: PRIMITIVES['pac-man']['--pacman-yellow'],
    btn:     PRIMITIVES['pac-man']['--pacman-yellow'],
    btnHover: PRIMITIVES['pac-man']['--pacman-yellow-hover'],
  },
  tetris: {
    bg:      PRIMITIVES.tetris['--tetris-dark-green'],
    border:  PRIMITIVES.tetris['--tetris-olive'],
    text:    PRIMITIVES.tetris['--tetris-light-green'],
    heading: PRIMITIVES.tetris['--tetris-green'],
    btn:     PRIMITIVES.tetris['--tetris-green'],
    btnHover: PRIMITIVES.tetris['--tetris-green-hover'],
  },
  'mario-85': {
    bg:      PRIMITIVES['mario-85']['--mario85-black'],
    border:  PRIMITIVES['mario-85']['--mario85-red'],
    text:    PRIMITIVES['mario-85']['--mario85-peach'],
    heading: PRIMITIVES['mario-85']['--mario85-orange'],
    btn:     PRIMITIVES['mario-85']['--mario85-red'],
    btnHover: PRIMITIVES['mario-85']['--mario85-red-hover'],
  },
  'mario-64': {
    bg:      PRIMITIVES['mario-64']['--mario64-navy'],
    border:  PRIMITIVES['mario-64']['--mario64-blue'],
    text:    PRIMITIVES['mario-64']['--mario64-lavender'],
    heading: PRIMITIVES['mario-64']['--mario64-red'],
    btn:     PRIMITIVES['mario-64']['--mario64-yellow'],
    btnHover: PRIMITIVES['mario-64']['--mario64-yellow-hover'],
  },
}
