---
name: create-game-page
description: Adds a new game page to Beautiful Game History by parsing an EN or PT markdown content file and wiring it into the i18n dictionary, GameScreen component, and route system.
user-invocable: true
---

# Create Game Page

This skill adds a fully functional game page to **Beautiful Game History** by reading a pre-written markdown content file and wiring it into every layer of the codebase: i18n dictionary, route definitions, the GameScreen component, and the Start Screen label.

---

## Inputs Required from the User

The user invokes the skill by providing all of the following. Ask for any that are missing.

| Input | Description | Example |
|---|---|---|
| `textPath` | Relative path to the markdown content file | `external-files/texts/tetris-en.md` |
| `language` | `en` or `pt` (one at a time) | `en` |
| `logoPath` | Relative path to the logo image (inside `external-files/logos/`) or a public URL | `external-files/logos/tetris.png` |
| `startLabel` | The label shown in the Start Screen games list (ALL CAPS convention) | `TETRIS (1984)` |
| `slug` | URL/dictionary key for the game — derive from filename if not given | `tetris` |

**Deriving the slug:** strip the language suffix from the filename: `tetris-en.md` → `tetris`, `pac-man-pt.md` → `pac-man`.

---

## Step 1 — Read Existing Code

Before writing anything, read these files to understand current state:

- `lib/i18n/en.ts` — i18n dictionary structure and all existing game slugs
- `components/GameScreen.tsx` — how logos and content are rendered; current `GAME_ORDER`
- `app/game/[slug]/page.tsx` — current `VALID_SLUGS`
- `components/StartScreen.tsx` — how `games[]` array maps `en.start.gameN` keys to slugs

---

## Step 2 — Parse the Markdown File

Read the file at `textPath`. The file always follows this structure:

```
# Game Title (Year): Headline
                                          ← blank line
**Description:** Long description text.
(or **Descrição:** in PT)
                                          ← blank line
### Technical/Market Info Heading
* **Year:** value
* **Console:** value
* **Sales volume:** value
* **Creator:** value  (singular or plural)
                                          ← --- separator ---
### Section A Heading
Paragraph text...

Another paragraph if present...

### Section B Heading
Paragraph text...
```

### Mapping Rules

**Title line** (`# …`): Discard. The game title comes from `startLabel` converted to title-case.
> e.g. `TETRIS (1984)` → `title: 'Tetris (1984)'`

**Description** (`**Description:**` / `**Descrição:**`): Extract the text that follows on the same line (everything after the colon and space).

**Technical/Market bullet block** (first `### ` section, before `---`):
Parse each `* **Key:** value` bullet into these i18n fields:

| Bullet key (EN) | Bullet key (PT) | i18n field |
|---|---|---|
| `Year` | `Ano` | `year` |
| `Console` | `Console` | `console` |
| `Sales volume` | `Quantidade de Vendas` | `salesVolume` |
| `Creator` / `Creators` | `Criador` / `Criadores` | `creators` |

> ⚠️ The bullet block is **not** added to `content[]`. Its data becomes the four metadata fields above.

**Section headings and paragraphs** (everything after `---`):
- Each `### Heading` line → add to `content[]` as-is, keeping the `### ` prefix: `'### Heading Text'`
- Each non-empty, non-heading line → add to `content[]` as a plain string paragraph
- Skip blank lines and the `---` separator itself

> **Critical:** The `### ` prefix is the convention this codebase uses to distinguish headings from paragraphs at render time. Every heading must be stored in `content[]` with the `### ` prefix intact.

### Output Structure

```typescript
'game-slug': {
  title: 'Game Title (Year)',       // from startLabel, converted to title-case
  description: 'Description text.',
  console: 'Platform name; e.g. Game Boy / NES',
  year: 'Year value from bullet',
  salesVolume: 'Sales value from bullet',
  creators: 'Creators value from bullet',
  content: [
    '### First Section Heading',
    'First paragraph of section A...',
    'Second paragraph of section A (if present)...',
    '### Second Section Heading',
    'First paragraph of section B...',
    // … one entry per heading or paragraph
  ]
}
```

> Note: New games use `console` (not `manufacturer`). `GameScreen.tsx` renders `(game as any).manufacturer || (game as any).console` so both coexist.

---

## Step 3 — Update the i18n Dictionary

### English (`language = 'en'`) — edit `lib/i18n/en.ts`

1. **Add the game entry** inside `game.games`, after the last existing real game (before the placeholder comments):

```typescript
// lib/i18n/en.ts — inside game.games
tetris: {
  title: 'Tetris (1984)',
  description: '...',
  console: '...',
  year: '...',
  salesVolume: '...',
  creators: '...',
  content: [ /* parsed content[] */ ]
},
```

2. **Update the Start Screen label** — find the next placeholder in the `start` object and replace it with `startLabel`:

```typescript
// Before (example: game2 was a placeholder)
game2: 'GAME 2',
// After
game2: 'TETRIS (1984)',
```

   Cross-check `StartScreen.tsx` to find which `gameN` key maps to which slug.
   In `StartScreen.tsx` the `games` array is ordered: `game1 → pong`, `game2 → game-2`, etc.
   Replace the placeholder whose slug (`game-2`, `game-3`, …) matches the new game's slug.

### Portuguese (`language = 'pt'`) — edit or create `lib/i18n/pt.ts`

If `lib/i18n/pt.ts` does not exist, create it:

```typescript
/**
 * Portuguese (PT-BR) game content — partial dictionary.
 * Full PT support (UI labels, navigation, etc.) is added in Phase 3.
 */
export const pt = {
  game: {
    games: {
      'game-slug': {
        title: 'Título (Ano)',
        description: '...',
        console: '...',
        year: '...',
        salesVolume: '...',
        creators: '...',
        content: [ /* parsed PT content[] */ ]
      },
    },
  },
} as const
```

If `lib/i18n/pt.ts` already exists, add the new game entry inside `pt.game.games`.

> ⚠️ The app currently only renders the `en` dictionary. Adding Portuguese here prepares the data layer. A language-switching mechanism will be wired in Phase 3.

---

## Step 4 — Register the Slug in the Route System

### `app/game/[slug]/page.tsx`

Add the new slug to `VALID_SLUGS`. Replace the matching placeholder slug (e.g. `'game-2'`) with the real slug, **or** append it after the last non-placeholder if none matches:

```typescript
// Example: replacing game-2 placeholder
const VALID_SLUGS = ['pong', 'tetris', 'game-3', 'game-4', 'game-5'] as const
```

### `components/GameScreen.tsx`

Add the new slug to `GAME_ORDER` at the same position:

```typescript
const GAME_ORDER = ['pong', 'tetris', 'game-3', 'game-4', 'game-5'] as const
```

> Keep placeholder slugs (e.g. `'game-3'`) in place for unused positions — they are needed for `notFound()` validation and NEXT navigation to work correctly.

---

## Step 5 — Wire the Logo in GameScreen

Open `components/GameScreen.tsx` and locate the logo dispatch block (the `{slug === 'pong' ? … : (…)}` chain in the **Logo** section).

### If the logo is a local file

1. Confirm the file exists at `external-files/logos/<slug>.<ext>`.
2. Copy or verify there is a copy at `public/logos/<slug>.<ext>` (Next.js serves files from `public/` at the root).
   - If the file is already in `external-files/logos/`, copy it to `public/logos/` using a terminal command.
3. Add the new case **before** the final fallback `<div>`:

```tsx
{slug === 'pong' ? (
  <Image src="/logos/pong.jpg" alt={en.game.logoAlt(game.title)} width={720} height={405}
    style={{ width: '100%', height: 'auto', objectFit: 'cover' }} priority />
) : slug === 'tetris' ? (
  <Image src="/logos/tetris.png" alt={en.game.logoAlt(game.title)} width={720} height={405}
    style={{ width: '100%', height: 'auto', objectFit: 'cover' }} priority />
) : (
  <div className="placeholder-block" style={{ height: '10rem', width: '100%' }}
    aria-label={en.game.logoAlt(game.title)}>
    {game.title} logo
  </div>
)}
```

### If the logo is an external URL

1. Add the external hostname to `remotePatterns` in `next.config.ts` if not already listed.
2. Use the URL directly as the `src`:

```tsx
) : slug === 'new-game' ? (
  <Image src="https://example.com/path/to/logo.png" alt={en.game.logoAlt(game.title)}
    width={720} height={405} style={{ width: '100%', height: 'auto', objectFit: 'cover' }} priority />
```

---

## Step 6 — Update `StartScreen.tsx` (if slug mapping changed)

`StartScreen.tsx` contains a static `games` array that maps `en.start.gameN` labels to slugs:

```typescript
const games = [
  { id: 'start-game-1-btn', label: en.start.game1, slug: 'pong' },
  { id: 'start-game-2-btn', label: en.start.game2, slug: 'game-2' },
  ...
]
```

Update the `slug` field of the matching entry from its placeholder value (e.g. `'game-2'`) to the real slug (e.g. `'tetris'`):

```typescript
{ id: 'start-game-2-btn', label: en.start.game2, slug: 'tetris' },
```

---

## Step 7 — Verify

Ask user to verify. You do not have to verify, and do not add these steps in your plan.