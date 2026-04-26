# Text Reveal Animation — Implementation Spec

> **Target file:** `components/GameScreen.tsx`  
> **Scope:** Animated character-by-character text reveal with a blinking cursor, applied **only to `game.content[]` items** (headings and paragraphs). The description, InfoCards, logo, and all other sections are **not animated**.

---

## 1. Core Concept

All text is present in the DOM from the first render — it occupies its full height and participates normally in layout. What changes over time is **visual visibility**, not DOM presence.

The key insight is: **never alter the layout**. The scroll position, paragraph heights, and page structure must be identical before and after the animation completes.

---

## 2. Rendering Strategy

### 2.1 "Color-toggle" approach (recommended)

Every character is wrapped in its own `<span>`. Each span holds one of two states:

| State | CSS rule |
|---|---|
| **Hidden** | `color: transparent` |
| **Revealed** | `color: inherit` |

The text is always there — only its color changes. This is the safest approach because:
- Zero layout shift (no width/height changes).
- Works across all browsers without vendor prefixes.
- Bold, headings, and colored text (`var(--theme-heading)`, `var(--theme-text)`) continue to work since `color: inherit` resolves to the parent's computed color.

### 2.2 Alternative: `clip-path` per line

A single `clip-path: inset(0 100% 0 0)` on each line element, animated to `inset(0 0% 0 0)` via `requestAnimationFrame`. Simpler state (one value per line instead of one per char), but requires knowing the exact bounding box width of each visual line — fragile when the container resizes.

**Recommendation: use 2.1.**

---

## 3. Component Architecture

```
GameScreen (existing 'use client')
  └── AnimatedContent            ← NEW client component
        ├── AnimatedBlock        ← NEW (one per content[] item)
        │     └── <span> × N    ← one per character
        └── Cursor               ← NEW blinking "|"
```

### 3.1 `AnimatedContent`

- Must begin with `'use client'` — it uses `useRef`, `useEffect`, `IntersectionObserver`, and `requestAnimationFrame`.
- Receives only the `game.content` array.
- Owns all animation state via `useRef` (mutable, no re-renders during animation).
- Replaces only the current inline `.map()` block in `GameScreen` — the `<Paragraphs>` description call above it is **not touched**.

### 3.2 `AnimatedBlock`

- Must begin with `'use client'` — it reads DOM refs and receives forwarded refs from the parent.
- Renders one item from `game.content` (heading or paragraph).
- Splits its text into an array of `<span>` elements, one per character.
- Exposes a `ref` so the parent can read `getBoundingClientRect()` on each character span.
- Handles the `### ` prefix → `<h2>` distinction exactly as the current code does.
- Handles **bold** regions (text wrapped with `**…**`) by rendering a `<strong>` whose chars are also individually wrapped in spans.
- Has **no knowledge** of `description`, `yearHighlight`, `salesHighlight`, `creatorsHighlight`, or any other game field.

### 3.3 `Cursor`

- A single `<span>` containing `|`.
- Absolutely positioned, translated to follow the current character position via inline `style.transform`.
- Blinks via a CSS `@keyframes` animation (`opacity 0.6s step-end infinite`).
- Hidden (`display: none` or `opacity: 0`) once all content is revealed.

---

## 4. Text Splitting

Before rendering, each content string must be split into:
1. **Plain runs** — consecutive characters rendered in a `<span>` each.
2. **Bold runs** — substrings matched by `/\*\*(.*?)\*\*/g`, rendered in `<strong>`, whose characters are also individually spanned.

```ts
// Pseudocode — runs this once per item string, memoized
type Run = { bold: boolean; chars: string[] }

function parseRuns(text: string): Run[] {
  const parts = text.split(/(\*\*.*?\*\*)/g)
  return parts.map(part => {
    const bold = part.startsWith('**')
    const raw  = bold ? part.slice(2, -2) : part
    return { bold, chars: [...raw] } // spread gives Unicode-safe chars
  })
}
```

The total character count across all runs, across all items, forms the **global character index** used by the animation engine.

---

## 5. Animation Engine

The engine lives in `AnimatedContent` and runs entirely in `useRef` values — **no `useState` is mutated during the animation loop**, preventing re-renders.

### 5.1 Data structures

```ts
// Built once after first render, never mutated
type CharRef = {
  el: HTMLSpanElement   // the DOM span
  lineKey: string       // unique id of the visual line this char belongs to
}

const allChars    = useRef<CharRef[]>([])  // flat ordered list
const revealedIdx = useRef(0)             // pointer: next char to reveal
const queue       = useRef<string[]>([])  // ordered visual line IDs queued for reveal
const revealed    = useRef<Set<string>>(new Set()) // line IDs already done
```

### 5.2 Visual line detection

After the initial render, the engine must group character spans into visual lines (rows on screen), because the spec requires revealing one visual line at a time.

```ts
function groupByVisualLine(chars: CharRef[]): Map<string, CharRef[]> {
  const map = new Map<string, CharRef[]>()
  for (const c of chars) {
    const top = Math.round(c.el.getBoundingClientRect().top + window.scrollY)
    const key = `${top}`
    if (!map.has(key)) map.set(key, [])
    map.get(key)!.push(c)
  }
  return map
}
```

> **Important:** Use `getBoundingClientRect().top + window.scrollY` to get a stable document-relative Y coordinate. This ensures line keys remain consistent regardless of scroll position.

### 5.3 Timing

```ts
const CHAR_INTERVAL_MS = 12  // ~83 chars/second — fast aesthetic reveal
```

The loop uses `requestAnimationFrame` accumulating elapsed time, not `setInterval`, to avoid timer drift.

```ts
let lastTime = 0
function tick(now: number) {
  const elapsed = now - lastTime
  if (elapsed >= CHAR_INTERVAL_MS) {
    revealNextChar()
    lastTime = now
  }
  if (animationIsStillRunning) {
    rafId.current = requestAnimationFrame(tick)
  }
}
```

### 5.4 Line sequencing

The engine processes one visual line at a time:

1. Pop the first line ID from `queue`.
2. Iterate its characters, revealing one per tick.
3. Move the cursor span to follow each revealed character.
4. When the last char of the line is revealed, immediately pop the next line from the queue and continue — **no pause**.
5. When the queue is empty, stop the RAF and hide the cursor.

---

## 6. IntersectionObserver — Viewport Integration

```ts
useEffect(() => {
  // One sentinel element per content block (paragraph or heading)
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const blockId = entry.target.dataset.blockId!
          // Push all visual-line IDs of this block to the queue, in order
          const lineIds = linesByBlock.get(blockId) ?? []
          for (const id of lineIds) {
            if (!revealed.current.has(id) && !queue.current.includes(id)) {
              queue.current.push(id)
            }
          }
          observer.unobserve(entry.target) // one-shot per block
        }
      }
      maybeStartLoop()
    },
    { threshold: 0.1 }
  )

  sentinels.forEach(el => observer.observe(el))
  return () => observer.disconnect()
}, [])
```

**Sentinel elements** are lightweight `<span style={{ display: 'block', height: 0 }}>` nodes placed at the start of each `AnimatedBlock`. When they enter the viewport, all visual lines from that block are enqueued.

---

## 7. Cursor Positioning

The cursor is a `position: absolute` span inside a `position: relative` wrapper that wraps the entire animated text area.

After revealing character at global index `i`:
```ts
const rect = allChars.current[i].el.getBoundingClientRect()
const containerRect = containerRef.current!.getBoundingClientRect()
cursor.current!.style.transform =
  `translate(${rect.right - containerRect.left}px, ${rect.top - containerRect.top}px)`
```

This positions `|` immediately to the right of the last revealed character, correct for any font or line-height combination.

Cursor blink CSS (add to `globals.css` or equivalent):
```css
@keyframes reveal-cursor-blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
}
.reveal-cursor {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  font-weight: 400;
  color: var(--theme-text);
  animation: reveal-cursor-blink 0.6s step-end infinite;
  will-change: transform;
}
```

---

## 8. Integration in `GameScreen.tsx`

### 8.1 What changes

| Current code | After |
|---|---|
| `game.content.map(...)` inline JSX | Replaced by `<AnimatedContent content={game.content} />` |
| `<Paragraphs key={idx} items={[item]} />` inside the map | Rendered by `AnimatedBlock` internally |

`<Paragraphs items={[game.description]} />` stays exactly where it is — it is rendered above the animated zone and is **not animated**.

### 8.2 Props for `AnimatedContent`

```ts
interface AnimatedContentProps {
  content: readonly string[]   // game.content[] only
}
```

### 8.3 What is NOT touched

- `<Paragraphs items={[game.description]} />` — **not animated**, stays in place.
- `InfoCard` (yearHighlight, salesHighlight, creatorsHighlight) — **not animated**.
- `Header` — untouched.
- Logo block — untouched.
- Platform/Year `<p>` — untouched.
- Controller section — untouched.
- Theme CSS variables injection on `<main>` — untouched.

---

## 9. Lifecycle & Cleanup

```ts
useEffect(() => {
  // Setup: build allChars refs, group by visual line, attach observer
  window.addEventListener('resize', handleResize)

  return () => {
    cancelAnimationFrame(rafId.current)
    observer.disconnect()
    window.removeEventListener('resize', handleResize) // prevent leak
  }
}, []) // empty deps — runs once per mount
```

> **Note:** All browser APIs used here (`window`, `document`, `IntersectionObserver`, `requestAnimationFrame`) are accessed exclusively inside `useEffect` — never at module scope or component top-level — ensuring SSR compatibility.

Because `GameScreen` is a Next.js navigation target, React unmounts and remounts the component on each page visit. This naturally resets all `useRef` state, satisfying the **"revisit = restart from zero"** requirement at no extra cost.

---

## 10. Edge Cases

| Scenario | Handling |
|---|---|
| User scrolls very fast | Multiple block sentinels fire; all their line IDs are pushed to `queue` in DOM order; revealed sequentially. |
| Window resize mid-animation | Visual line grouping by `getBoundingClientRect().top` becomes stale. Attach a debounced `resize` listener to re-group unrevealed characters. |
| Font not yet loaded | Run initial grouping inside `document.fonts.ready.then(...)` to ensure `getBoundingClientRect` reflects correct line breaks from the actual typeface. |
| Content with no `**` bold markers | `parseRuns` degenerates to a single plain run — no branching needed. |
| Heading with `### ` + bold inside | Strip `### `, then pass the remainder through `parseRuns` as usual. |
| `description` is not animated | `<Paragraphs>` for description renders normally above `<AnimatedContent>`; no sentinel, no queue entry. |

---

## 11. Files to Create / Modify

| Action | File | Directive |
|---|---|---|
| **CREATE** | `components/AnimatedContent.tsx` | `'use client'` |
| **CREATE** | `components/AnimatedBlock.tsx` | `'use client'` |
| **MODIFY** | `components/GameScreen.tsx` — replace the `game.content.map(...)` block with `<AnimatedContent content={game.content} />` | already `'use client'` |
| **MODIFY** | `app/globals.css` (or equivalent) — add `.reveal-cursor` keyframe | — |

> `Paragraphs` is **not deleted** — it still renders `game.description` unchanged above the animated zone.

---

## 12. Summary Flow

```
Animated zone: game.content[] items only
Not animated:  game.description, InfoCards, logo, header, controller

On mount (inside useEffect — never at module scope)
  → await document.fonts.ready          ← browser API; safe here, not during SSR
  → parse game.content[] into char spans (all hidden: color: transparent)
  → group char spans into visual lines by getBoundingClientRect().top
  → attach IntersectionObserver on one sentinel per content[] block
  → attach debounced resize listener    ← removed in useEffect cleanup

On sentinel intersect (content block enters viewport)
  → push that block's line IDs to the queue (in document order)
  → start RAF loop if not already running

RAF loop (ticks every ~12ms)
  → reveal next char of current line (set color: inherit on its span)
  → move cursor span to right edge of that char
  → on line complete → immediately dequeue next line
  → on queue empty → hide cursor, cancel RAF

On unmount (useEffect cleanup)
  → cancelAnimationFrame
  → observer.disconnect()
  → window.removeEventListener('resize', handleResize)
```
