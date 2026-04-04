# resources.md — Phase 2: Identity & Final Assets

> **Who fills this in?** Sections tagged 🙋 **YOU** require input from the developer/owner.
> Sections tagged 🤖 **AI** can be coded immediately once the 🙋 decisions are made.
> Work through the sections in order — each decision unblocks the next.

---

## Open Decisions from SPEC_2 (Phase 2)

| # | Decision | Status |
|---|---|---|
| A | Real names of the 5 games and final slugs | ❌ Need your input |
| B | Final typography choice | ❌ Need your input |
| C | Color palette per game | ❌ Need your input |
| D | Controller sprite assets (5 controllers) | ❌ Need your input |
| H | Exact content zone / controller zone proportion | ❌ Need your input |

---

## Step 1 — Games: Names, Slugs, and Metadata

> 🙋 **YOU** must answer this.

For each of the 5 games, provide the following. The AI will use these to:
- Update `generateStaticParams` and `generateMetadata` in `app/game/[slug]/page.tsx`
- Update the `en.ts` i18n dictionary
- Set per-game `<title>` and `description` tags
- Create per-game theme data

### Template — fill in:

```
Game 1:
  Real title:       e.g. "Pong"
  Final slug:       e.g. "pong"   ← URL-safe, lowercase, no spaces
  Manufacturer:     e.g. "Atari"
  Year:             e.g. 1972
  Page title:       e.g. "Pong | Beautiful Game History"
  Meta description: (1–2 sentences, used in <meta name="description">)

Game 2:
  Real title:
  Final slug:
  Manufacturer:
  Year:
  Page title:
  Meta description:

Game 3:
  Real title:
  Final slug:
  Manufacturer:
  Year:
  Page title:
  Meta description:

Game 4:
  Real title:
  Final slug:
  Manufacturer:
  Year:
  Page title:
  Meta description:

Game 5:
  Real title:
  Final slug:
  Manufacturer:
  Year:
  Page title:
  Meta description:
```

> **Note on slugs:** If a slug changes from `game-1` … `game-5`, the AI must update
> 1. `generateStaticParams` array in `app/game/[slug]/page.tsx`
> 2. The `GAME_ORDER` constant in `components/GameScreen.tsx`
> 3. The `en.ts` keys for each game
> 4. Any navigation link that hard-codes `game-1`, etc.
>
> If you prefer to keep the generic slugs (`game-1` … `game-5`), that is also fine — the AI will only update the display titles.

---

## Step 2 — Game Page Text Content

> 🙋 **YOU** must supply the real text for each game screen.

The current `en.ts` has 5 generic placeholder paragraphs shared across all games. For Phase 2, each game gets its **own** array of paragraphs.

### Rules (from SPEC_2 §6.3):
- No rich formatting (no bold, no nested lists).
- Simple paragraphs.
- May reference inline images (gifs, sprites) — mark their position with a comment like `[IMAGE: gif_name_here]` and the AI will slot them in.
- Length: as long as you need. The content zone is scrollable.

### Template — fill in:

```
Game 1 — "<real title>":
  Paragraph 1: ...
  Paragraph 2: ...
  [IMAGE: some_sprite.gif]   ← optional inline image marker
  Paragraph 3: ...
  ... (add more as needed)

Game 2 — "<real title>":
  Paragraph 1: ...
  ...

Game 3 — ...
Game 4 — ...
Game 5 — ...
```

---

## Step 3 — Credits Screen Text and Team Information

> 🙋 **YOU** must supply this.

The current placeholder text in `en.credits.placeholderText` is:
```
"Beautiful Game History was created by a team of three passionate developers."
"The project is a love letter to the games that shaped our childhood and our profession."
"Thank you for playing."
```

Replace with:

```
Team member 1: Name, Role (e.g. "João, Lead Developer")
Team member 2: Name, Role
Team member 3: Name, Role

Credits body text (plain paragraphs, as many as needed):
  Paragraph 1: ...
  Paragraph 2: ...
  ...
```

---

## Step 4 — Typography

> 🙋 **YOU** decide the font. The AI handles the implementation.

### Requirements (SPEC_2 §4):
- A single font for the entire project.
- **Retro/gaming aesthetic** — supports both uppercase and lowercase.
- Must be available on Google Fonts OR as a local file.

### Recommendations to consider:

| Font | Style | Notes |
|---|---|---|
| **Press Start 2P** | Pixel / 8-bit | Classic arcade look. Best in uppercase only. |
| **VT323** | Pixel terminal | Monospace pixel, very legible at small sizes. |
| **Silkscreen** | Pixel / clean | More readable than Press Start 2P; has regular + bold. |
| **Orbitron** | Geometric sci-fi | Not pixel but very futuristic. Has multiple weights. |
| **Share Tech Mono** | Monospace retro | Clean terminal feel, upper + lowercase. |
| **Oxanium** | Semi-retro | Modern but geometric, gaming feel. Multiple weights. |
| **Russo One** | Bold display | Strong heading feel, gaming logos aesthetic. |

> **Tip:** Preview any of these at [fonts.google.com](https://fonts.google.com) before deciding.

### 🙋 Your answer:

```
Chosen font: ________________
Source: Google Fonts / Local file
```

### 🤖 AI will do (once you decide):

```tsx
// app/layout.tsx — replace Inter with your chosen font
import { Press_Start_2P } from 'next/font/google'   // ← example

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

```css
/* globals.css — update @theme block */
@theme inline {
  --font-game: var(--font-game);
}

body {
  font-family: var(--font-game), system-ui, monospace;
}
```

---

## Step 5 — Global Color Palette & Per-Game Themes

> 🙋 **YOU** decide the palettes. The AI implements the CSS custom properties.

### Global base (Phase 1 — already implemented):
```css
--color-bg:      #0a0a0a   /* near-black background */
--color-surface: #111111   /* elevated surface */
--color-border:  #2a2a2a   /* subtle dividers */
--color-text:    #ededed   /* primary text */
--color-muted:   #888888   /* secondary text */
--color-accent:  #ffffff   /* highlight / focus */
```

> SPEC_2 says the base stays Black and White globally. The per-game color scheme applies **to that game's screen only**.

### Visual evolution rule (SPEC_2 §4):
| Game | Color rule |
|---|---|
| Game 1 | Black & White only |
| Game 2 | Up to 8 colors |
| Game 3 | Expanded palette |
| Game 4 | Colors with gradients and 3D elements |
| Game 5 | Your call |

### Template — for each game:

```
Game 1 — "<title>" — Black & White:
  (no overrides needed — inherits global palette)

Game 2 — "<title>" — up to 8 colors:
  --color-bg:      #______
  --color-accent:  #______
  --color-surface: #______
  Additional tokens:
    --game-color-1: #______
    --game-color-2: #______

Game 3 — "<title>":
  (same template)

Game 4 — "<title>" — gradients allowed:
  --game-gradient-primary: linear-gradient(...)

Game 5 — "<title>":
  ...
```

> **Tip:** If you're unsure, tell me the game's era and aesthetic and I'll propose a palette.

### 🤖 AI will implement as:

```css
/* globals.css — per-game overrides via data attribute */
[data-game="game-1"] { /* inherits :root */ }

[data-game="game-2"] {
  --color-bg: /* chosen */;
  --color-accent: /* chosen */;
}
```

```tsx
// components/GameScreen.tsx
<main data-game={slug} style={{ height: '100dvh', ... }}>
```

---

## Step 6 — Image Assets

> 🙋 **YOU** supply the image files. The AI handles `next/image` integration.

### 6a. Game Logos

One logo per game. Place in `public/logos/`.

| Slot | Filename | Notes |
|---|---|---|
| Game 1 logo | `public/logos/game-1.png` | PNG preferred, transparent background |
| Game 2 logo | `public/logos/game-2.png` | Provide at 2× resolution for retina |
| Game 3 logo | `public/logos/game-3.png` | |
| Game 4 logo | `public/logos/game-4.png` | |
| Game 5 logo | `public/logos/game-5.png` | |

> The logo is the **LCP element** on each game page. The AI will add `priority` to
> the `<Image>` to trigger preloading.

### 6b. Team Photo (Credits Screen)

```
File: public/team.jpg (or .png)
Format: Landscape/horizontal preferred
Notes: Full column width (max 720px), auto height
```

### 6c. Inline GIFs / Sprites (optional, within game text)

```
Game X, between paragraph N and N+1:
  File: public/sprites/game-x-sprite.gif
  Alt text: "..."
  Display size: e.g. 64×64px, centered
```

---

## Step 7 — Controller Sprites (Phase 2: Static)

> 🙋 **YOU** supply the controller image for each game.

Phase 2 = one static image per game (full animation is Phase 3).

| Game | Controller (example) | File |
|---|---|---|
| Game 1 | Atari joystick | `public/controllers/game-1.png` |
| Game 2 | Intellivision pad | `public/controllers/game-2.png` |
| Game 3 | NES controller | `public/controllers/game-3.png` |
| Game 4 | SNES controller | `public/controllers/game-4.png` |
| Game 5 | PlayStation 1 pad | `public/controllers/game-5.png` |

### Display rules (SPEC_2 §8):
- If controller zone height > sprite height → display at **natural size**, not stretched.
- Centered horizontally and vertically within controller zone.

> 🤖 **AI will implement:**
> ```tsx
> <Image
>   src={`/controllers/${slug}.png`}
>   alt={`${gameTitle} controller`}
>   width={naturalWidth}    // you provide per-game
>   height={naturalHeight}
>   style={{ objectFit: 'contain', maxHeight: '100%' }}
> />
> ```

---

## Step 8 — Content Zone / Controller Zone Proportion

> 🙋 **YOU** decide visually once real images are in place.

Current values in `components/GameScreen.tsx`:
```tsx
// Content zone (scrollable text + logo)
flex: '0 0 65%'

// Controller zone (fixed)
flex: '0 0 35%'
```

Typical range:
| Content | Controller | Best for |
|---|---|---|
| 55% | 45% | Large controllers (e.g. arcade sticks) |
| 60% | 40% | Mid-size controllers |
| 65% | 35% | Small/compact controllers (current) |
| 70% | 30% | Very small sprites |

```
Your chosen proportion:
  Content zone:    ___%
  Controller zone: ___%
```

---

## Step 9 — Start Screen: Real Game Menu Labels

> 🙋 **YOU** decide the short button labels.

Current `en.ts`:
```ts
start: { game1: 'GAME 1', game2: 'GAME 2', ... }
```

These are short button labels (all caps is fine — they render uppercase by CSS):
```
Game 1 button: e.g. "PONG"
Game 2 button: e.g. "SPACE INVADERS"
Game 3 button: e.g. "SUPER MARIO BROS"
Game 4 button: e.g. "DOOM"
Game 5 button: e.g. "MINECRAFT"
```

---

## Phase 2 — Full AI Implementation Checklist

Once all 🙋 steps above are answered, the AI executes the following in order:

### 1. `lib/i18n/en.ts`
- [ ] Replace `game.placeholderText` with per-game text arrays keyed by slug
- [ ] Add `game.title`, `game.description`, `game.manufacturer`, `game.year` per game
- [ ] Update `game.logoAlt` and `game.controllerAlt` with real names
- [ ] Update `start.game1`…`game5` to real short button labels
- [ ] Update `credits.placeholderText` with real credits text
- [ ] Update `credits.teamImageAlt`

### 2. `app/layout.tsx` — Typography
- [ ] Remove `Inter` import
- [ ] Add chosen retro font via `next/font/google` (or `next/font/local`)
- [ ] Rename CSS variable `--font-sans` → `--font-game`
- [ ] Update `className` on `<html>` to use new variable

### 3. `app/globals.css` — Design Tokens
- [ ] Update `@theme` block: `--font-game: var(--font-game)`
- [ ] Update `body { font-family: ... }`
- [ ] Add `letter-spacing` / `line-height` tweaks for chosen font (pixel fonts need more)
- [ ] Add `[data-game="game-X"]` override blocks for each game's color scheme
- [ ] Add gradient utilities for Game 4+ if needed
- [ ] Remove `.placeholder-block` styles (no longer needed)

### 4. `app/game/[slug]/page.tsx` — Metadata
- [ ] Update `generateStaticParams` if slugs changed
- [ ] Implement `generateMetadata` with real `title` and `description` per slug
- [ ] Extract `getGameData(slug)` helper with `cache()` from React

### 5. `components/GameScreen.tsx`
- [ ] Add `data-game={slug}` on `<main>`
- [ ] Replace logo placeholder `<div>` with `<Image … priority />`
- [ ] Replace generic text loop with per-game paragraph arrays (and inline images)
- [ ] Replace controller placeholder `<div>` with `<Image>` (natural size, `objectFit: contain`)
- [ ] Adjust `flex` proportions to agreed proportion

### 6. `components/CreditsScreen.tsx`
- [ ] Replace team photo placeholder with `<Image … priority />`
- [ ] Replace placeholder text with real credits content from `en.ts`

### 7. `components/StartScreen.tsx`
- [ ] Update game button labels to real short titles

### 8. `next.config.ts` (if needed)
- [ ] Add `images.remotePatterns` for any external image hosts
- [ ] Otherwise, keep all images local in `/public/`

### 9. Verify
```bash
npm run build
# Expect: no TypeScript errors, 5 static game routes generated, all images resolved
```

---

## Summary: Everything You Need to Provide

| # | What | Where |
|---|---|---|
| 1 | 5 game names, slugs, years, manufacturers | Step 1 |
| 2 | Meta descriptions (1–2 sentences per game) | Step 1 |
| 3 | Full text copy for each game page | Step 2 |
| 4 | Credits text + team member names/roles | Step 3 |
| 5 | Font choice (from list or your own) | Step 4 |
| 6 | Per-game color palette (or approval of AI proposal) | Step 5 |
| 7 | Logo images (`public/logos/game-1.png` … `game-5.png`) | Step 6 |
| 8 | Team photo (`public/team.jpg`) | Step 6 |
| 9 | Inline sprites/gifs (optional) | Step 6 |
| 10 | Controller images (`public/controllers/game-1.png` … `game-5.png`) | Step 7 |
| 11 | Content/controller zone proportion (%) | Step 8 |
| 12 | Short menu labels for 5 games | Step 9 |
