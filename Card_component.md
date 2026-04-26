# InfoCard Component — Implementation Plan

## Overview

Replace the current "Technical and Market Information" unordered list in every game page with three horizontal info cards displaying **Year**, **Sales**, and **Creators** in a visually distinct, card-based layout.

Each card is a rectangle with:
- A border matching the header's bottom rule (`4px solid var(--theme-border)`)
- Three vertically-stacked elements, left-aligned:
  1. **Label** — small, uppercase label (e.g. "YEAR", "SALES", "CREATORS")
  2. **Highlight** — a large value (e.g. "1984", "+40M") that should be as large as possible while fitting in at most 2 lines
  3. **Description** — up to 3 lines of body-font text for extra context

---

## Architecture Decisions

- **New component**: `components/InfoCard.tsx` — a pure presentational component, receives `label`, `highlight`, and `description` as props
- **Row wrapper**: rendered inline inside `GameScreen.tsx`, replacing the existing `salesVolume` block
- **Data source**: `en.ts` and `pt.ts` — each game entry gains three new fields per card: `yearHighlight`, `yearDescription`, `salesHighlight`, `salesDescription`, `creatorsHighlight`, `creatorsDescription`. The existing `year`, `salesVolume`, and `creators` fields are kept for backward compatibility and can be removed after the card system is validated.
- **Styling**: pure inline styles (matching the rest of the codebase) + one new CSS class in `globals.css` for the card itself and for text clamping
- **No new route**: a test page already exists at `app/test/` — use it.

---

## Data structure change in `en.ts` / `pt.ts`

Each game entry in `games: { ... }` gains:

```ts
// NEW card fields
yearHighlight: string         // e.g. "1984"
yearDescription: string       // e.g. "Initially developed on the Electronika 60"
salesHighlight: string        // e.g. "+520M"  (short, punchy)
salesDescription: string      // e.g. "Copies worldwide, including physical media and mobile downloads."
creatorsHighlight: string     // e.g. "Alexey Pajitnov"  (name only, at most 2 lines)
creatorsDescription: string   // e.g. "Developed by Spectrum HoloByte and later The Tetris Company"
```

> **Rule for splitting data:**  
> `highlight` = the shortest, most impactful value that fits in 1–2 lines at large font size.  
> `description` = everything that was previously in parentheses or after a comma that adds context, capped at 3 lines of body text.

### Concrete values for each game (EN)

#### Pong
| Field | Value |
|-------|-------|
| `yearHighlight` | `"1972"` |
| `yearDescription` | `"Arcade release. Home console version followed in 1975."` |
| `salesHighlight` | `"+8,000"` |
| `salesDescription` | `"Arcade machines by 1974. ~150,000 Home Pong units sold in a single season (1975)."` |
| `creatorsHighlight` | `"Allan Alcorn"` |
| `creatorsDescription` | `"Developed under direction of Atari Inc. founders Nolan Bushnell and Ted Dabney."` |

#### Pac-Man
| Field | Value |
|-------|-------|
| `yearHighlight` | `"1980"` |
| `yearDescription` | `"Released for arcades by Namco."` |
| `salesHighlight` | `"+400,000"` |
| `salesDescription` | `"Arcade cabinets sold worldwide, one of the highest-grossing games in history."` |
| `creatorsHighlight` | `"Toru Iwatani"` |
| `creatorsDescription` | `"Developed at Namco."` |

#### Tetris
| Field | Value |
|-------|-------|
| `yearHighlight` | `"1984"` |
| `yearDescription` | `"Created on the Electronika 60. Popularized worldwide via Game Boy and NES."` |
| `salesHighlight` | `"+520M"` |
| `salesDescription` | `"Copies worldwide, including physical media and mobile downloads."` |
| `creatorsHighlight` | `"Alexey Pajitnov"` |
| `creatorsDescription` | `"Originally developed at the Soviet Academy of Sciences. Rights reclaimed in 1996 via The Tetris Company."` |

#### Mario (1985)
| Field | Value |
|-------|-------|
| `yearHighlight` | `"1985"` |
| `yearDescription` | `"Released for Famicom (Japan) and NES (North America)."` |
| `salesHighlight` | `"+40M"` |
| `salesDescription` | `"Copies sold, cementing it as one of the best-selling games of all time."` |
| `creatorsHighlight` | `"Miyamoto\n& Tezuka"` |
| `creatorsDescription` | `"Directed by Shigeru Miyamoto and Takashi Tezuka at Nintendo R&D4."` |

#### Mario 64
| Field | Value |
|-------|-------|
| `yearHighlight` | `"1996"` |
| `yearDescription` | `"Nintendo 64 launch title, released alongside Pilotwings 64."` |
| `salesHighlight` | `"~11.91M"` |
| `salesDescription` | `"Original cartridge units sold worldwide for the Nintendo 64."` |
| `creatorsHighlight` | `"Shigeru Miyamoto"` |
| `creatorsDescription` | `"Developed by Nintendo Entertainment Analysis & Development (EAD)."` |

> **PT values**: mirror the EN values exactly in structure. Translate only description strings; keep numeric highlights identical.

---

## Component spec: `InfoCard.tsx`

```tsx
interface InfoCardProps {
  label: string        // "YEAR" | "SALES" | "CREATORS"
  highlight: string    // large text, ≤2 lines
  description: string  // body text, ≤3 lines
}
```

### Layout (vertical, left-aligned)

```
┌─────────────────────────────┐  ← border: 4px solid var(--theme-border)
│ YEAR                        │  ← label: small uppercase, --font-heading, ~0.65rem, color: var(--theme-text) opacity 0.6
│                             │
│ 1984                        │  ← highlight: large, --font-heading, fluid size (clamp), color: var(--theme-heading)
│                             │
│ Initially developed on the  │  ← description: --font-body, ~var(--font-size-base), color: var(--theme-text)
│ Electronika 60. Popularized │    max 3 lines (-webkit-line-clamp: 3)
│ via Game Boy and NES.       │
└─────────────────────────────┘
```

### Sizing rules

- **Highlight font**: `clamp(1.5rem, 5vw, 2.75rem)` so it scales with viewport. With a max card width of ~220px inside the 720px column the text will typically render 2.0–2.5rem. Two-word names (e.g. "Miyamoto\n& Tezuka") break at the explicit `\n` — use `white-space: pre-line` on the highlight element.
- **Card width**: each card gets `flex: 1 1 0` inside a `display: flex; gap: 0.75rem` row, so all three are equal width.
- **Card padding**: `1rem` on all sides.
- **Row wrapper**: `display: flex; gap: 0.75rem; padding-inline: 0` (already inside the `.column` container).

### CSS additions to `globals.css`

```css
/* ── Info cards ────────────────────────────────────────────────── */
.info-card {
  flex: 1 1 0;
  border: 4px solid var(--theme-border);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.info-card__label {
  font-family: var(--font-heading), monospace;
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--theme-text);
  opacity: 0.6;
}

.info-card__highlight {
  font-family: var(--font-heading), monospace;
  font-size: clamp(1.5rem, 5vw, 2.75rem);
  color: var(--theme-heading);
  white-space: pre-line;          /* allows \n line breaks */
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 1.15;
}

.info-card__description {
  font-family: var(--font-body), monospace;
  font-size: var(--font-size-base);
  color: var(--theme-text);
  line-height: 1.4;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
```

---

## Markdown file format update (`external-files/texts/`)

Each `game-(language).md` file's **Tags** block must be restructured so the three card fields are explicit. New format:

```markdown
**Tags:**
*   **Year highlight:** 1984
*   **Year description:** Initially developed on the Electronika 60. Popularized worldwide via Game Boy and NES.
*   **Sales highlight:** +520M
*   **Sales description:** Copies worldwide, including physical media and mobile downloads.
*   **Creators highlight:** Alexey Pajitnov
*   **Creators description:** Originally developed at the Soviet Academy of Sciences. Rights reclaimed in 1996 via The Tetris Company.
```

> The old single-field `Year`, `Console`, `Sales volume`, and `Creator` tags are replaced by the six fields above. The `Console` tag is removed (it is redundant — the info is usually embedded in Year description or body text).

---

## Task List

### Task 1 — Create the component and verify it visually

- [ ] **1.1** Add CSS classes to `app/globals.css`:
  - `.info-card`, `.info-card__label`, `.info-card__highlight`, `.info-card__description`
  - Spec is given in the "CSS additions" section above.

- [ ] **1.2** Create `components/InfoCard.tsx` with props `{ label, highlight, description }` and the layout described above.

- [ ] **1.3** Create/update a test page at `app/test/page.tsx` that renders three `<InfoCard>` components side by side with hardcoded sample values:
  - Label: "YEAR" / "SALES" / "CREATORS"
  - Highlight: "1984" / "+520M" / "Alexey Pajitnov"
  - Description: the Tetris values from the table above
  - Wrap them in a `<div style={{ display: 'flex', gap: '0.75rem', padding: '2rem', backgroundColor: '#0a0a0a' }}>` so the dark background is visible. Set `--theme-border`, `--theme-heading`, and `--theme-text` as inline CSS vars on that wrapper.

- [ ] **1.4** ✋ **USER CHECKPOINT**: give this link `http://localhost:3000/test` to user and ask him to check:
  - Three cards appear side by side, equal width
  - Border matches the header separator in thickness and color
  - Label is small and dimmer than the body text
  - Highlight is large (fits in 1–2 lines)
  - Description text is body-font and clamped to 3 lines
  - The layout does not break if you resize the browser window

---

### Task 2 — Wire cards into all game screens

- [ ] **2.1** Add the six new card fields (`yearHighlight`, `yearDescription`, `salesHighlight`, `salesDescription`, `creatorsHighlight`, `creatorsDescription`) to every game entry in `lib/i18n/en.ts`, using the values from the table above.

- [ ] **2.2** Mirror the same six fields in `lib/i18n/pt.ts` with Portuguese descriptions. Highlight values (numbers, names) stay the same; descriptions are translated.

- [ ] **2.3** In `components/GameScreen.tsx`, replace the block:
  ```tsx
  {(game as any).salesVolume && (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <h2 ...>{dict.game.technicalInfo}</h2>
      <ul ...>
        <li><strong>Year:</strong> {game.year}</li>
        <li><strong>Sales:</strong> {(game as any).salesVolume}</li>
        <li><strong>Creators:</strong> {(game as any).creators}</li>
      </ul>
    </div>
  )}
  ```
  With:
  ```tsx
  {(game as any).yearHighlight && (
    <div style={{ display: 'flex', gap: '0.75rem' }}>
      <InfoCard
        label={dict.game.cardLabelYear}
        highlight={(game as any).yearHighlight}
        description={(game as any).yearDescription}
      />
      <InfoCard
        label={dict.game.cardLabelSales}
        highlight={(game as any).salesHighlight}
        description={(game as any).salesDescription}
      />
      <InfoCard
        label={dict.game.cardLabelCreators}
        highlight={(game as any).creatorsHighlight}
        description={(game as any).creatorsDescription}
      />
    </div>
  )}
  ```

- [ ] **2.4** Add three new shared labels to `lib/i18n/en.ts` and `lib/i18n/pt.ts` under the `game:` key:
  ```ts
  cardLabelYear:     'YEAR',        // PT: 'ANO'
  cardLabelSales:    'SALES',       // PT: 'VENDAS'
  cardLabelCreators: 'CREATORS',    // PT: 'CRIADORES'
  ```

- [ ] **2.5** Add the `InfoCard` import to `GameScreen.tsx`.

- [ ] **2.6** ✋ **USER CHECKPOINT**: Navigate to each of the 5 game pages and confirm:
  - The three info cards are displayed correctly
  - Language switching (PT ↔ EN) updates card labels and descriptions
  - No TypeScript errors in the console
  - The old `<ul>` list is gone

---

### Task 3 — Update external markdown files

> These files are the "source of truth" used for content review and future re-imports. They must be kept in sync with the dictionary so that `create-game-page` skill and human editors can work from them.

- [ ] **3.1** Update `external-files/texts/tetris-en.md` — replace the `**Tags:**` block with the new 6-field format (values from table above).
- [ ] **3.2** Update `external-files/texts/tetris-pt.md` — same structure, PT descriptions.
- [ ] **3.3** Update `external-files/texts/pong-en.md`.
- [ ] **3.4** Update `external-files/texts/pong-pt.md`.
- [ ] **3.5** Update `external-files/texts/pac-man-en.md`.
- [ ] **3.6** Update `external-files/texts/pac-man-pt.md`.
- [ ] **3.7** Update `external-files/texts/mario-85-en.md`.
- [ ] **3.8** Update `external-files/texts/mario-85-pt.md`.
- [ ] **3.9** Update `external-files/texts/mario-3d-en.md`.
- [ ] **3.10** Update `external-files/texts/mario-3d-pt.md`.

- [ ] **3.11** ✋ **USER CHECKPOINT**: Open any two markdown files (one EN, one PT) and confirm the new tag structure is in place and values match what is displayed on the web page.

---

## File Change Summary

| File | Action |
|------|--------|
| `components/InfoCard.tsx` | **CREATE** — new card component |
| `app/globals.css` | **MODIFY** — add 4 new CSS classes |
| `app/test/page.tsx` | **MODIFY** — add card preview |
| `lib/i18n/en.ts` | **MODIFY** — add 6 card fields per game + 3 label keys |
| `lib/i18n/pt.ts` | **MODIFY** — same as above, in Portuguese |
| `components/GameScreen.tsx` | **MODIFY** — swap list block for InfoCard row |
| `external-files/texts/*.md` (×10) | **MODIFY** — update Tags section in all 10 files |
