# Game-Specific Reveal Animations — Revised Implementation Plan

> **Scope:** Replace the blinking `|` cursor with a per-game moving piece that reveals text left-to-right, with real multi-line wrap for composite pieces and gradual slide-in entry.

---

## 1. Sprites → `public/animations/`

#### [NEW] `public/animations/green_shell_mario85.png`
#### [NEW] `public/animations/hat-mario64.png`
#### [NEW] `public/animations/block-tetris.png`

Copy from `external-files/animations/`. Rename `hat-mario64.png` → `hat-mario64.png`.

---

## 2. Shared Height Calculation

All 5 pieces use the same height logic. On each `moveCursor` call, compute:

```ts
const style = getComputedStyle(span.parentElement!)
const fontSize = parseFloat(style.fontSize)
const lineHeight = parseFloat(style.lineHeight)
const gap = lineHeight - fontSize  // total inter-line space
const pieceHeight = fontSize + gap  // text height + half gap above + half gap below
```

This value is stored in a ref and passed to the active cursor component. It is recalculated whenever the current span changes parent (i.e., entering a new block with potentially different font size).

---

## 3. Piece Positioning — Definitive Rule

The **right edge** of the piece aligns with the **right edge of the last revealed character**.

```ts
// On each tick, after revealing char at index i:
const r = allChars.current[i].el.getBoundingClientRect()
const container = containerRef.current!.getBoundingClientRect()

const rightEdge = r.right - container.left
const verticalCenter = r.top - container.top + (r.height / 2) - (pieceHeight / 2)

cursorDiv.style.transform = `translate(${rightEdge - pieceWidth}px, ${verticalCenter}px)`
```

The piece is positioned so that it always "trails behind" the reveal point, with its right edge marking exactly how far the text has been uncovered.

---

## 4. Gradual Slide-In Entry

### Problem
When a new line begins (either the first line on page load or any subsequent line after scroll), the piece must not pop in fully formed. It must **slide in from the left edge** of the content area, as if it was hidden offscreen and is now entering.

### Solution
The `AnimatedContent` container has `overflow: hidden` (or a clip boundary) on the left edge. The piece is always rendered at its full width, but when positioned near the left edge, the leftmost sub-elements are naturally clipped.

In practice:
- At the start of a new line, the revealed char is near `x = 0` relative to the container.
- The piece position = `rightEdge - pieceWidth`, which yields a **negative X** value.
- With `overflow: hidden` on the container, the portion of the piece that extends to the left of `x = 0` is clipped and invisible.
- As the reveal advances rightward, more of the piece slides into view.

This produces the effect described in the scope: sub-elements appear one by one from the left edge. For Pac-Man, the rightmost bolinha (25% opacity) appears first, then the others, and finally the Pac-Man itself.

```
Container left edge
|
|  [clipped]  [visible portion]
|  ██ ██ ██ | ██  ←  only rightmost rect visible
|           |
|     pieceWidth
```

**Important:** `overflow: hidden` must be applied **only horizontally** (`overflow-x: hidden`) so vertical content and scroll behavior are unaffected.

---

## 5. Real Wrap Between Lines (Composite Pieces)

### Problem
When a composite piece (Pong, Tetris, Pac-Man) reaches the right edge of the container, its sub-elements must split across two lines: some remain at the end of the current line, others appear at the start of the next line.

### Which pieces wrap
- **Pong** (4 rects): Yes
- **Tetris** (4 blocks): Yes
- **Pac-Man** (5 elements): Yes
- **Mario 85** (1 sprite): No — jumps to next line
- **Mario 64** (1 sprite): No — jumps to next line

### Strategy: Dual-position rendering

Each composite cursor component receives not just `pieceHeight` but also **layout context** that tells it where the line boundaries are:

```ts
export interface CursorProps {
  pieceHeight: number
}

export interface CompositeCursorProps extends CursorProps {
  /**
   * Available width from the piece's left edge to the right edge of the
   * current line's container. When this is less than the piece's total
   * width, the piece must wrap.
   */
  availableWidth: number

  /**
   * Vertical offset to the next line (distance from current line's top
   * to next line's top). Used to position wrapped sub-elements.
   */
  nextLineOffsetY: number

  /**
   * Horizontal position of the left edge of the container (x = 0),
   * used to position wrapped elements at the start of the next line.
   */
  containerLeftX: number

  /**
   * Current X position of the piece's left edge relative to container.
   */
  currentX: number
}
```

#### How `availableWidth` is computed

```ts
const containerRight = containerRef.current!.getBoundingClientRect().right
const pieceLeftEdge = r.right - pieceWidth  // where the piece starts
const availableWidth = containerRight - containerRef.current!.getBoundingClientRect().left - (pieceLeftEdge < 0 ? 0 : pieceLeftEdge)
```

More simply: `availableWidth = containerWidth - currentX` (where `currentX` is the piece's left-edge X relative to the container). If `currentX < 0` (slide-in phase), `availableWidth = containerWidth`.

#### How `nextLineOffsetY` is computed

The engine already knows the visual lines. When processing a line, it can look ahead to the next line in the queue and compute:

```ts
const currentLineTop = currentLineChars[0].el.getBoundingClientRect().top
const nextLineTop = nextLineChars?.[0]?.el.getBoundingClientRect().top ?? currentLineTop
const nextLineOffsetY = nextLineTop - currentLineTop
```

If there's no next line yet (not enqueued), use `pieceHeight` as a fallback (since line height ≈ piece height).

#### Rendering logic inside composite cursors

Each sub-element is positioned absolutely within the cursor container. The cursor component lays them out left-to-right and checks against `availableWidth`:

```
For each sub-element (left to right):
  accumulatedX += elementWidth + gap

  if accumulatedX <= availableWidth:
    → position normally: (accumulatedX - elementWidth, 0)
  else:
    → position on next line: (wrappedX, nextLineOffsetY)
    → wrappedX starts at (containerLeftX - currentX) and advances right
```

This way, sub-elements that "overflow" the current line are rendered below, at the start of the next line, creating the visual split.

**Example — Tetris at line end:**
```
Line 1:  ...text revealed... [block][block][block]
Line 2:  [block] ...text continues...
```

**Example — Pac-Man at line end:**
```
Line 1:  ...text... [dot25][dot50][dot75]
Line 2:  [dot100][PacMan] ...text continues...
```

---

## 6. Per-Game Cursor Components

### [NEW] `components/reveal-cursors/types.ts`

No `'use client'` needed — this is a pure type file.

```ts
export interface CursorProps {
  pieceHeight: number
}

export interface CompositeCursorProps extends CursorProps {
  availableWidth: number
  nextLineOffsetY: number
  containerLeftX: number
  currentX: number
}
```

---

### [NEW] `components/reveal-cursors/PongCursor.tsx`

- **Directive:** `'use client'` at the top of the file.
- Accepts `CompositeCursorProps`.
- Renders 4 `<div>` rectangles (no images needed — pure CSS).
- Each rect: `width = pieceHeight / 4`, `height = pieceHeight`.
- Gap between rects = `pieceHeight / 4`.
- Total width = `7 * pieceHeight / 4`.
- Color: `#888888`.
- Uses the wrap logic from §5 to split rects across lines.

---

### [NEW] `components/reveal-cursors/Mario85Cursor.tsx`

- **Directive:** `'use client'` at the top of the file.
- Accepts `CursorProps` (no composite props needed — no wrap).
- Uses `next/image` with a **static import** so dimensions are inferred at build time:
  ```tsx
  import Image from 'next/image'
  import shellImg from '@/public/animations/green_shell_mario85.png'

  // Inside the component:
  <Image
    src={shellImg}
    alt=""
    aria-hidden="true"
    style={{ height: pieceHeight, width: 'auto' }}
    draggable={false}
  />
  ```
- `height = pieceHeight` via inline style; `width: auto` preserves aspect ratio.
- Jumps to next line start (no split).

---

### [NEW] `components/reveal-cursors/Mario64Cursor.tsx`

- **Directive:** `'use client'` at the top of the file.
- Identical behavior to Mario85Cursor.
- Static import: `import hatImg from '@/public/animations/hat-mario64.png'`
- Renders `<Image src={hatImg} alt="" aria-hidden="true" style={{ height: pieceHeight, width: 'auto' }} draggable={false} />`.

---

### [NEW] `components/reveal-cursors/TetrisCursor.tsx`

- **Directive:** `'use client'` at the top of the file.
- Accepts `CompositeCursorProps`.
- Uses `next/image` with a static import:
  ```tsx
  import Image from 'next/image'
  import blockImg from '@/public/animations/block-tetris.png'

  // Render each of the 4 blocks:
  <Image
    src={blockImg}
    alt=""
    aria-hidden="true"
    style={{ width: pieceHeight, height: pieceHeight }}
    draggable={false}
  />
  ```
- Each block: `width = height = pieceHeight` (forced square via inline style).
- Gap: `0.14 * pieceHeight`.
- Total width: `4 * pieceHeight + 3 * 0.14 * pieceHeight = 4.42 * pieceHeight`.
- Uses the wrap logic from §5.

---

### [NEW] `components/reveal-cursors/PacManCursor.tsx`

- **Directive:** `'use client'` at the top of the file.
- Accepts `CompositeCursorProps`.

**Pac-Man (leftmost element):**
- SVG-based circle with animated wedge cutout.
- `width = height = pieceHeight`.
- Fill: `var(--pacman-yellow)`.
- Mouth direction: right (toward movement).
- Mouth angle: ~70° when open, 0° when closed.
- Animation: CSS keyframes, ~400ms per cycle, runs continuously while piece is visible.

**Implementation of mouth animation:**
```css
@keyframes pacman-mouth {
  0%, 100% { clip-path: polygon(100% 50%, 75% 85%, 0% 100%, 0% 0%, 75% 15%); }
  50%      { clip-path: polygon(100% 50%, 100% 100%, 0% 100%, 0% 0%, 100% 0%); }
}
```
Or via SVG `<path>` with CSS animation on the `d` attribute. Either approach works; CSS clip-path on a colored `<div>` is simpler.

**4 Dots (to the right of Pac-Man):**
- `<div>` circles: `diameter = pieceHeight * 0.25`.
- Fill: `var(--pacman-cream)`.
- Opacities left-to-right: `1.0`, `0.75`, `0.5`, `0.25`.
- Gap between all 5 elements: `1.5 * dotDiameter`.

**Total width:** `pieceHeight + 4 * dotDiameter + 4 * gap`
= `pieceHeight + 4 * (pieceHeight * 0.25) + 4 * (1.5 * pieceHeight * 0.25)`
= `pieceHeight + pieceHeight + 1.5 * pieceHeight`
= `3.5 * pieceHeight`

Uses the wrap logic from §5. When wrapping, dots go to the next line first (rightmost elements wrap first since they're at the trailing edge), and Pac-Man follows last.

---

## 7. `AnimatedContent.tsx` Modifications

#### [MODIFY] `components/AnimatedContent.tsx`

**New prop:**
```ts
interface AnimatedContentProps {
  content: readonly string[]
  scrollContainerRef: React.RefObject<HTMLElement>
  gameSlug: GameSlug
}
```

**Changes:**

1. **Container gets `overflow-x: hidden`** — enables the slide-in clipping effect.

2. **Replace cursor element**: Remove `<span class="reveal-cursor">|</span>`. Replace with:
   ```tsx
   <div
     ref={cursorRef}
     className="reveal-piece"
     aria-hidden="true"
     style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
   >
     <CursorComponent {...cursorProps} />
   </div>
   ```
   Where `CursorComponent` is selected via a map:
   ```ts
   const CURSOR_MAP: Record<GameSlug, ComponentType<CursorProps | CompositeCursorProps>> = {
     pong: PongCursor,
     'super-mario-bros': Mario85Cursor,
     'super-mario-64': Mario64Cursor,
     tetris: TetrisCursor,
     'pac-man': PacManCursor,
   }
   ```

3. **`moveCursor` updated**: On each tick:
   - Compute `pieceHeight` from `getComputedStyle`.
   - Compute `pieceWidth` based on game slug and `pieceHeight`.
   - Compute `rightEdge` = char's right edge relative to container.
   - Set `transform: translate(rightEdge - pieceWidth, verticalCenter)`.
   - For composite pieces: compute and pass `availableWidth`, `nextLineOffsetY`, `containerLeftX`, `currentX`.

4. **`pieceWidth` calculation**: A helper function returns total piece width given `gameSlug` and `pieceHeight`:
   ```ts
   function getPieceWidth(slug: GameSlug, h: number): number {
     switch (slug) {
       case 'pong': return 7 * h / 4
       case 'tetris': return 4.42 * h
       case 'pac-man': return 3.5 * h
       case 'super-mario-bros':
       case 'super-mario-64':
         return h * spriteAspectRatio  // precomputed or read from img.naturalWidth/Height
     }
   }
   ```

5. **Cursor visibility**: Hidden (`display: none`) when the queue is empty and all content is revealed. Visible whenever the RAF loop is running.

---

## 8. `GameScreen.tsx` Modifications

#### [MODIFY] `components/GameScreen.tsx`

1. Pass `gameSlug={slug}` to `<AnimatedContent>`.
2. Inject `PRIMITIVES[slug]` as CSS custom properties on the `<main>` style object alongside the existing semantic tokens. This makes `--pacman-yellow`, `--pacman-cream`, and any other primitive tokens available to all descendants via `var()`.

---

## 9. CSS Changes

#### [MODIFY] `app/globals.css`

1. **Remove**: `.reveal-cursor` class and `@keyframes reveal-cursor-blink`.
2. **Add**:
   ```css
   .reveal-piece {
     position: absolute;
     top: 0;
     left: 0;
     pointer-events: none;
     will-change: transform;
     z-index: 10;
   }

   @keyframes pacman-mouth {
     0%, 100% {
       clip-path: polygon(100% 50%, 75% 85%, 0% 100%, 0% 0%, 75% 15%);
     }
     50% {
       clip-path: polygon(100% 50%, 100% 100%, 0% 100%, 0% 0%, 100% 0%);
     }
   }
   ```

---

## 10. File Summary

| File | Action | Notes |
|---|---|---|
| `public/animations/green_shell_mario85.png` | NEW (copy) | From `external-files/` |
| `public/animations/hat-mario64.png` | NEW (copy) | Renamed, no space |
| `public/animations/block-tetris.png` | NEW (copy) | From `external-files/` |
| `components/reveal-cursors/types.ts` | NEW | `CursorProps` + `CompositeCursorProps` |
| `components/reveal-cursors/PongCursor.tsx` | NEW | 4 grey rects, wraps |
| `components/reveal-cursors/Mario85Cursor.tsx` | NEW | Shell sprite, no wrap |
| `components/reveal-cursors/Mario64Cursor.tsx` | NEW | Hat sprite, no wrap |
| `components/reveal-cursors/TetrisCursor.tsx` | NEW | 4 block sprites, wraps |
| `components/reveal-cursors/PacManCursor.tsx` | NEW | SVG Pac-Man + 4 dots, wraps |
| `components/AnimatedContent.tsx` | MODIFY | `gameSlug` prop, new cursor system, `overflow-x: hidden`, updated `moveCursor` |
| `components/GameScreen.tsx` | MODIFY | Pass `gameSlug`, inject primitive CSS vars |
| `app/globals.css` | MODIFY | Remove old cursor, add `.reveal-piece` + `@keyframes pacman-mouth` |

---

## 11. Summary Flow

```
On mount (same as before, engine unchanged)
  → parse content into char spans
  → group into visual lines
  → attach IntersectionObserver

On each tick (modified moveCursor):
  → reveal char (color: transparent → inherit)
  → compute pieceHeight from getComputedStyle
  → compute pieceWidth from gameSlug + pieceHeight
  → position cursor div: right edge of piece = right edge of revealed char
  → container overflow-x: hidden clips piece during slide-in at line starts
  → for composite pieces: compute availableWidth and pass to cursor component
    → cursor component splits sub-elements across lines when availableWidth < pieceWidth
  → on queue empty: hide cursor div

Piece behavior by game:
  Pong:     4 rects  → slide-in + wrap across lines
  Mario 85: 1 sprite → slide-in + jump to next line
  Mario 64: 1 sprite → slide-in + jump to next line
  Tetris:   4 blocks → slide-in + wrap across lines
  Pac-Man:  5 elems  → slide-in + wrap across lines + mouth animation
```