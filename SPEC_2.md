# SPEC_2.md — Interactive History of Video Games

## 1. Overview

An interactive, linear web experience that tells the history of video games through five revolutionary titles. Navigation is primarily keyboard-driven, complemented by mouse. The site is exclusively Dark Mode and targets PC/Desktop users.

---

## 2. Technology Stack

| Layer | Decision |
|---|---|
| Framework | Next.js 15+ (App Router) |
| Styling | Tailwind CSS |
| Global State | Zustand |
| Deploy | Vercel (Hobby Tier) |
| Default Language | English |
| i18n (future) | EN/PT-BR with automatic detection |

---

## 3. Route Architecture

```
/                  → Start Screen (Menu)
/intro             → Introduction Screen
/game/[slug]       → Game Screens (game-1 to game-5)
/credits           → Credits Screen
```

### Game slugs

| Slug | Order |
|---|---|
| game-1 | 1st |
| game-2 | 2nd |
| game-3 | 3rd |
| game-4 | 4th |
| game-5 | 5th |

> Real game names will be inserted in Phase 2.

### File structure (App Router)

```
app/
├── layout.tsx              # Root layout — font, metadata, providers
├── page.tsx                # / → Start Screen (Server Component)
├── error.tsx               # Route-level error boundary
├── not-found.tsx           # 404 page
├── global-error.tsx        # Root layout error boundary
├── intro/
│   └── page.tsx            # /intro
├── game/
│   └── [slug]/
│       ├── page.tsx        # /game/[slug]
│       └── error.tsx       # Game-specific error boundary
└── credits/
    └── page.tsx            # /credits
```

---

## 4. Base Layout

### Central Column

- Single centered column layout.
- `min-width` / `max-width` calibrated for comfortable reading: between `560px` and `720px`.
- On screens narrower than `min-width`, the site expands to 100% width with no horizontal scroll.
- Never two columns. Always a single column.

### Theme

- Native and exclusive Dark Mode (no light/dark toggle).
- Base palette: Black and White (Phase 1).
- Each game screen will have its own color scheme (Phase 2).
- Visual evolution per game:
  1. Game 1 — Black and White
  2. Game 2 — Up to 8 colors
  3. Game 3 — Expanded palette
  4. Game 4 — Colors with gradients and 3D elements

### Typography

- Single font for the entire project.
- Requirements: supports uppercase and lowercase, retro/gaming aesthetic.
- To be chosen in Phase 2.
- **Implementation rule:** use `next/font/google` (or `next/font/local`) in `app/layout.tsx`. Never use a CDN `<link>` tag or a CSS `@import`. Font is initialized once in `layout.tsx` and exposed as a CSS custom property (`variable`) used globally via Tailwind config.

```tsx
// app/layout.tsx — Phase 2 pattern (example font)
import { Press_Start_2P } from 'next/font/google'

const gameFont = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-game',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={gameFont.variable}>
      <body>{children}</body>
    </html>
  )
}
```

---

## 5. Global State (Zustand)

### Store: `navigationStore`

```ts
interface NavigationStore {
  history: string[]
  pushRoute: (route: string) => void
  popRoute: () => string | null
  currentRoute: string
}
```

- History is kept **in memory only** — not persisted in `localStorage` or `sessionStorage`.
- The BACK button consumes the top of the stack to determine its destination.
- All navigation (link, button, keyboard) must push to the store before calling `router.push`.

### RSC boundary rule

Zustand hooks (`useNavigationStore`) and `useRouter` are client-side APIs. Any component that reads or writes the navigation store must be marked `'use client'`. Parent `page.tsx` files remain Server Components and pass only serializable data (strings, numbers, plain objects) to client components.

```tsx
// app/game/[slug]/page.tsx — Server Component
export default async function GamePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params // params must be awaited in Next.js 15+
  return <GameScreen slug={slug} />
}

// components/GameScreen.tsx — Client Component
'use client'
export function GameScreen({ slug }: { slug: string }) {
  const pushRoute = useNavigationStore((s) => s.pushRoute)
  const router = useRouter()
  // ...
}
```

---

## 6. Pages and Screens

### 6.1 Start Screen (`/`)

**Layout:**
- No Header.
- Three buttons stacked vertically, centered: `INTRO`, `GAMES`, `CREDITS`.

**GAMES behavior:**
- Clicking `GAMES` replaces the three buttons **on the same screen** (no route change) with:
  - A `BACK` button (returns to the original three-button layout).
  - Five buttons: `GAME 1` to `GAME 5`.
- This transition is internal state managed by Zustand (or local `useState`).

**Keyboard navigation (Phase 3):**
- `↑`/`↓` or `W`/`S` moves selection between buttons.
- `Enter` or `Space` confirms selection.

**`page.tsx` notes:**
- This page is a Server Component. The interactive menu transitions are handled entirely in a child Client Component.
- No `generateStaticParams` needed (static route).

---

### 6.2 Intro Screen (`/intro`)

**Layout:**
- Header with `BACK` and `NEXT`.
  - `BACK`: follows the general route memory rule.
  - `NEXT`: navigates to `/game/game-1`.
- Centered YouTube embed in the column.

**Video behavior:**
- Video autoplays with sound as soon as the screen loads.
- A **30-second countdown** starts when the video begins playing.
- The `SEE GAMES` button is revealed when **any** of these conditions is met:
  1. The 30 seconds elapse.
  2. The video ends naturally.
  3. The user pauses the video.
- Placeholder URL (Phase 1): `https://www.youtube.com/embed/dQw4w9WgXcQ`
- Final URL: replaced in Phase 3.

**SEE GAMES button:**
- Appears below the video after the conditions above are met.
- On click: navigates to `/` with the games submenu state activated (see open decision I).

**`page.tsx` notes:**
- The countdown and video event listeners are client-side. Extract them to a `'use client'` component. The `page.tsx` itself remains a Server Component with a static metadata export.

---

### 6.3 Game Screens (`/game/[slug]`)

**Layout:**
- Header with `BACK` and `NEXT`.
- Central column containing:
  - Game logo at the top (gray placeholder in Phase 1).
  - Scrollable descriptive/historical text.
  - Gifs and smaller sprites may be present in the body text.
- Fixed bottom area: **Interactive Controller** (see Section 8).

**Vertical height proportion:**
- The screen is split into two fixed-proportion vertical zones:
  - **Content zone** (scrollable): upper portion.
  - **Controller zone** (fixed): lower portion.
- The controller does not overlap the content. Both zones coexist with a fixed proportion.
- Exact proportion to be defined visually in Phase 2.

**Text content:**
- No rich formatting (no bold, no nested lists).
- Simple paragraphs.
- May contain images (logo), gifs, and smaller sprites inline.

**NEXT navigation between games:**
```
/game/game-1 → /game/game-2 → ... → /game/game-5 → /credits
```

**`page.tsx` implementation rules:**

```tsx
// app/game/[slug]/page.tsx

import type { Metadata } from 'next'

type Props = { params: Promise<{ slug: string }> }

// Static generation for all 5 known slugs
export function generateStaticParams() {
  return [
    { slug: 'game-1' },
    { slug: 'game-2' },
    { slug: 'game-3' },
    { slug: 'game-4' },
    { slug: 'game-5' },
  ]
}

// Per-game metadata (Phase 2: replace with real game titles)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  return {
    title: slug, // Phase 2: replace with real game name
  }
}

export default async function GamePage({ params }: Props) {
  const { slug } = await params

  // Validate slug — unknown slugs return 404
  const validSlugs = ['game-1', 'game-2', 'game-3', 'game-4', 'game-5']
  if (!validSlugs.includes(slug)) {
    notFound()
  }

  // Pass only serializable data to client boundary
  return <GameScreen slug={slug} />
}
```

**Image rules:**
- Game logos and all static images must use `next/image` (not `<img>`).
- Use `priority` on the logo image since it is the LCP element.
- Use `placeholder="blur"` on local images for a built-in gray-box effect during load (replaces the manual gray placeholder).

```tsx
// Good: game logo
import Image from 'next/image'
import gameLogo from '@/assets/logos/game-1.png'

<Image
  src={gameLogo}
  alt="Game 1 logo"
  placeholder="blur"
  priority
/>

// Phase 1 placeholder alternative (no real image yet)
<div className="w-full h-40 bg-neutral-700" aria-label="Game logo placeholder" />
```

---

### 6.4 Credits Screen (`/credits`)

**Layout:**
- Header with `BACK` only (no `NEXT`).
- Team image (three developers) — placeholder in Phase 1.
- Descriptive text below the image.
- No Interactive Controller.
- **Phase 3 (optional):** Looping animated sprite with configurable position.

**Image rules:**
- Team photo: `next/image` with `priority` (above the fold, LCP candidate).

---

## 7. Header Component

**Presence:** All screens except the Start Screen (`/`).

**Layout:**
- Constrained to the central column width.
- Two buttons with `justify-content: space-between`:
  `[ BACK ]` — — — — — `[ NEXT ]`
- On screens without NEXT (Credits), only `[ BACK ]` is rendered.

**BACK behavior — Route Memory:**
- BACK returns to exactly the previous route recorded in the `navigationStore` stack.
- Examples:
  - User goes: Menu → GAME 2. BACK → Menu.
  - User goes: Menu → GAME 1 → (NEXT) → GAME 2. BACK → GAME 1.
- The origin route is recorded **at navigation time**, not at BACK click time.

**Implementation note:**
- `Header` is a Client Component (`'use client'`) because it reads from `navigationStore` and calls `useRouter`.
- It receives no props from Server Components other than primitives (e.g., `hasNext: boolean`).

---

## 8. Interactive Controller Component

**Presence:** Only on `/game/[slug]` screens.

**Visual structure:**
- Sprite image of the real controller corresponding to the current game.
- Each game has its own controller (5 distinct controllers).
- All frames of a sprite share the same dimensions.
- If the controller zone's maximum height is greater than the sprite height, the sprite is displayed at its natural size (no stretching). It may bleed downward if necessary.
- `min-width` guaranteed for the controller zone.

**Sprite states:**

| Phase | State |
|---|---|
| Phase 1 | Static gray placeholder |
| Phase 2 | Real image, static (single frame) |
| Phase 3 | Reactive sprite with multiple frames |

**Frame mapping (Phase 3):**

| User action | Frame shown |
|---|---|
| No key pressed | Resting state |
| `↑` or `W` | D-pad up |
| `↓` or `S` | D-pad down |
| `←` or `A` | D-pad left |
| `→` or `D` | D-pad right |
| `Space` or `Enter` | Action button |

- Mouse clicks on the controller's sensitive areas also swap frames and fire the corresponding action (Phase 3).

---

## 9. Reading Cursor System

**Presence:** Only on `/game/[slug]` screens. Active in Phase 3.

### Concept

A visual selector (highlight/cursor) that occupies a fixed position on the screen and highlights the line of text currently "under" it. The text moves (scrolls); the cursor stays fixed.

### Behavior

- The cursor's vertical position on the screen is fixed (e.g., upper third of the content zone). To be defined visually.
- The unit of movement is a **visual line** (CSS `line-height`, dynamic per device).
- The content zone's scroll is controlled by the cursor — content moves up/down to keep the selected line under the cursor.

### Key mapping

| Key | Action |
|---|---|
| `↓` or `S` | Advances one line. If it is the last visible line, smoothly scrolls to reveal the next. |
| `↑` or `W` | Goes back one line. If on the first line, moves selection to the `BACK` button. |
| `←` or `A` | Exits text. Moves selection to the `BACK` button. |
| `→` or `D` | Exits text. Moves selection to the `NEXT` button. |

### Mouse scroll behavior

- Mouse scroll moves the text normally.
- The cursor stays at its fixed position on the screen.
- The highlighted line updates dynamically as text passes under the cursor.
- A sound fires on every line change, even via mouse scroll (Phase 3).

---

## 10. Sound System

**Active in Phase 3.**

| Category | Description |
|---|---|
| Background sound | Music/ambience. Changes per screen (menu, intro, each game, credits). |
| Navigation SFX | Fired on every selection change (button, text line). |
| Confirmation SFX | Fired when clicking/confirming a selection. |
| Controller SFX | Fired when pressing a mapped key or clicking a sensitive controller area. |

### General rules

- **Every** click or selection change has sound, regardless of input (keyboard or mouse).
- Mouse scroll that changes the highlighted line fires an SFX.
- Assets: sourced from free sound libraries (e.g., freesound.org). To be defined in Phase 3.

---

## 11. Internationalization (i18n)

**Active in Phase 3.**

- Default language: **English**.
- Second language: **Portuguese (Brazil)**.
- Automatic detection via browser `Accept-Language` header — read server-side via `await headers()` from `next/headers`.
- The user can manually switch between EN and PT-BR.
- All text content (game texts, menus, credits) must be structured with i18n support from Phase 1 (even if only EN is populated).

### Architecture decision (must be made before Phase 3)

Two approaches exist:

| Approach | Routing impact |
|---|---|
| URL-prefixed (`/en/`, `/pt-br/`) with `[locale]` route group | Routes change: `/en/game/game-1` |
| Cookie/header-based with single route tree | Routes unchanged: `/game/game-1` |

The `Accept-Language` detection approach leans toward **cookie/header-based** (no URL locale prefix). This avoids restructuring all routes. Deciding to add a `[locale]` segment later would be a breaking route change.

---

## 12. Metadata

All pages must export a `metadata` object or `generateMetadata` function. These are Server Component APIs only.

### Root layout

```tsx
// app/layout.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'Beautiful Game History',
    template: '%s | Beautiful Game History',
  },
  description: 'An interactive history of the most revolutionary video games.',
}
```

### Game pages

Use `generateMetadata` with async params. Use `react/cache` if the same data is needed for both metadata and the page component to avoid duplicate fetches.

```tsx
// app/game/[slug]/page.tsx
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  return {
    title: getGameTitle(slug), // Phase 2: real game name
    description: getGameDescription(slug),
  }
}
```

---

## 13. Error Handling

### Required files

```
app/
├── error.tsx           # 'use client' — catches errors in all children
├── global-error.tsx    # 'use client' — catches errors in root layout, must include <html><body>
├── not-found.tsx       # Custom 404
└── game/
    └── [slug]/
        └── error.tsx   # Game-specific error boundary
```

### Not-found for invalid slugs

```tsx
// app/game/[slug]/page.tsx
import { notFound } from 'next/navigation'

const validSlugs = ['game-1', 'game-2', 'game-3', 'game-4', 'game-5']

export default async function GamePage({ params }: Props) {
  const { slug } = await params
  if (!validSlugs.includes(slug)) notFound()
  // ...
}
```

---

## 14. Implementation Roadmap

### PHASE 1 — Foundation and Structure (MVP)

**Goal:** Functional navigation, component structure, global state, and deploy pipeline.

**Deliverables:**
- [ ] Next.js (App Router) + Tailwind CSS + Zustand setup.
- [ ] Vercel deploy configured.
- [ ] Base layout: Dark Mode, single centered column.
- [ ] Routes: `/`, `/intro`, `/game/[slug]`, `/credits`.
- [ ] i18n data structure (EN only populated).
- [ ] Root `metadata` export in `layout.tsx` (title template + description).
- [ ] `generateStaticParams` for the 5 game slugs.
- [ ] `error.tsx`, `global-error.tsx`, `not-found.tsx` files created.
- [ ] Header component (`'use client'`) with BACK logic (route memory via Zustand) and NEXT button.
- [ ] Start Screen with internal games submenu (no route change, Zustand or local state).
- [ ] Intro screen with YouTube placeholder embed and SEE GAMES button reveal logic (30s / end / pause).
- [ ] Game screens with gray logo placeholder (`<div>` or `next/image` with `placeholder="empty"`), placeholder text, static gray controller placeholder, and fixed zone proportions.
- [ ] Credits screen with gray image placeholder and placeholder text.
- [ ] Navigation by mouse click and scroll only (no keyboard control yet).
- [ ] Abrupt transitions (default web behavior).
- [ ] No animations, no sound, no keyboard.

---

### PHASE 2 — Identity and Final Assets

**Goal:** Final design, real content, retro aesthetic.

**Deliverables:**
- [ ] Final typography applied via `next/font/google` (or `next/font/local`) in `layout.tsx`, using `variable` mode for Tailwind integration.
- [ ] Replace placeholders with real assets: game logos, team photo.
- [ ] Final color scheme: global base + per-game theme.
- [ ] `next/image` for all images — logos with `priority`, team photo with `priority`.
- [ ] Static controller image (single frame) for each game.
- [ ] Real game text inserted into each screen.
- [ ] Real text and image on the Credits screen.
- [ ] `generateMetadata` with real game titles and descriptions for `/game/[slug]`.
- [ ] Normal mouse scroll works to read content (no reading cursor yet).
- [ ] Final content zone / controller zone proportion defined.

---

### PHASE 3 — Interactivity, Immersion, and Polish

**Goal:** Complete interactive experience.

**Deliverables:**
- [ ] Text entrance animations (line by line, left to right).
- [ ] Smooth transitions between pages and menus.
- [ ] Hybrid keyboard navigation (WASD, arrows, Space, Enter) across the entire site.
- [ ] Reactive Interactive Controller (frame swapping in real time).
- [ ] Reading Cursor with full highlight and scroll logic.
- [ ] Complete sound system (background + SFX).
- [ ] i18n EN/PT-BR with automatic detection (via `await headers()`) and manual toggle.
- [ ] Final YouTube video URL for the Intro.
- [ ] Looping animated sprite on Credits screen (optional).

---

## 15. Open Decisions

| # | Decision | Phase |
|---|---|---|
| A | Real names of the 5 games and final slugs | Phase 2 |
| B | Final typography choice | Phase 2 |
| C | Color palette per game | Phase 2 |
| D | Controller sprite assets (5 controllers) | Phase 2 |
| E | Final YouTube video URL for Intro | Phase 3 |
| F | Sound assets (SFX + ambience) | Phase 3 |
| G | Fixed vertical position of the reading cursor | Phase 3 |
| H | Exact content zone / controller zone proportion | Phase 2 |
| I | SEE GAMES button destination | Phase 1 |
| J | Animated sprite on Credits screen | Phase 3 |
| K | i18n routing strategy: URL-prefix vs cookie/header | Before Phase 3 |

### Decision I — SEE GAMES destination

Two options:
- **Option A:** Navigate to `/` with the games submenu Zustand state active (no route change needed, consistent with the internal GAMES button behavior already defined).
- **Option B:** Navigate directly to `/game/game-1`.

Recommendation: **Option A** — consistent with in-page submenu transitions, avoids skipping game selection.
