# PRD — Game Color Themes

## Objetivo

Criar um sistema de cores em **duas camadas** para o site Beautiful Game History:

1. **Tokens Primitivos** — paleta de cores brutas por jogo, sem semântica.
2. **Tokens Semânticos** — mapeamento explícito de onde cada cor primitiva é usada na UI.

Os tokens semânticos são os únicos que os componentes consomem. Os primitivos existem apenas para alimentar os semânticos.

---

## Camada 1 — Tokens Primitivos

> Nomenclatura: `--{slug}-{nome-descritivo}`
> Sem semântica — apenas valores de cor.

### Pong

```css
--pong-white:   #FFFFFF;
--pong-black:   #000000;
```

### Pac-Man

```css
--pacman-cream:   #FFF8D6;
--pacman-black:   #000000;
--pacman-yellow:  #FDFF00;
--pacman-blue:    #4231FF;
--pacman-pink:    #EA82E5;
--pacman-cyan:    #46BFEE;
--pacman-red:     #D03E19;
--pacman-orange:  #DB851C;
```

### Tetris

```css
--tetris-light-green:   #DBE8D5;
--tetris-dark-green:    #062806;
--tetris-green:         #9BBC0F;
--tetris-olive:         #8BAC0F;
--tetris-forest:        #306230;
```

### Mario 85

```css
--mario85-peach:   #FFDDC9;
--mario85-black:   #020100;
--mario85-orange:  #DE5918;
--mario85-red:     #F83612;
```

### Mario 64

```css
--mario64-lavender:  #E1E2FF;
--mario64-navy:      #040D31;
--mario64-red:       #FE0002;
--mario64-blue:      #0104F3;
--mario64-yellow:    #FFE941;
```

---

## Camada 2 — Tokens Semânticos

> Nomenclatura: `--theme-{elemento}`
> São os tokens que os componentes usam. Apontam para primitivos do jogo ativo.

| Token Semântico       | Elemento de UI                                       |
|-----------------------|------------------------------------------------------|
| `--theme-bg`          | Cor de fundo do `<main>` da página do jogo           |
| `--theme-border`      | Bordas: linha inferior do header, linha superior do controller zone |
| `--theme-text`        | Cor de parágrafos / corpo de texto                   |
| `--theme-heading`     | Cor dos títulos de seção (`h2`) no conteúdo do jogo  |
| `--theme-btn`         | Cor do texto dos botões BACK e NEXT no header        |

---

## Mapeamento Semântico por Jogo

### Pong

```
--theme-bg       → --pong-black
--theme-border   → --pong-white
--theme-text     → --pong-white
--theme-heading  → --pong-white
--theme-btn      → --pong-white
```

### Pac-Man

```
--theme-bg       → --pacman-black
--theme-border   → --pacman-yellow
--theme-text     → --pacman-cream
--theme-heading  → --pacman-yellow
--theme-btn      → --pacman-yellow
```

### Tetris

```
--theme-bg       → --tetris-dark-green
--theme-border   → --tetris-green
--theme-text     → --tetris-light-green
--theme-heading  → --tetris-green
--theme-btn      → --tetris-green
```

### Mario 85

```
--theme-bg       → --mario85-black
--theme-border   → --mario85-red
--theme-text     → --mario85-peach
--theme-heading  → --mario85-orange
--theme-btn      → --mario85-red
```

### Mario 64

```
--theme-bg       → --mario64-navy
--theme-border   → --mario64-yellow
--theme-text     → --mario64-lavender
--theme-heading  → --mario64-yellow
--theme-btn      → --mario64-yellow
```

---

## Estratégia de Implementação (Next.js Best Practices)

### 1. `lib/themes.ts` — Fonte única de verdade (Server-safe)

Define as duas camadas como objetos TypeScript puros — sem dependências de browser, compatível com Server Components.

```ts
// lib/themes.ts

export type GameSlug = 'pong' | 'pacman' | 'tetris' | 'mario-85' | 'mario-64'

/** Camada 1: tokens primitivos por slug */
export const PRIMITIVES: Record<GameSlug, Record<string, string>> = {
  pong: {
    '--pong-white': '#FFFFFF',
    '--pong-black': '#000000',
  },
  pacman: {
    '--pacman-cream':   '#FFF8D6',
    '--pacman-black':   '#000000',
    '--pacman-yellow':  '#FDFF00',
    '--pacman-blue':    '#4231FF',
    '--pacman-pink':    '#EA82E5',
    '--pacman-cyan':    '#46BFEE',
    '--pacman-red':     '#D03E19',
    '--pacman-orange':  '#DB851C',
  },
  // ... demais slugs
}

/** Camada 2: tokens semânticos resolvidos por slug */
export type SemanticTheme = {
  bg: string
  border: string
  text: string
  heading: string
  btn: string
}

export const SEMANTIC_MAP: Record<GameSlug, SemanticTheme> = {
  pong: {
    bg:      '#000000',
    border:  '#FFFFFF',
    text:    '#FFFFFF',
    heading: '#FFFFFF',
    btn:     '#FFFFFF',
  },
  pacman: {
    bg:      '#000000',
    border:  '#FDFF00',
    text:    '#FFF8D6',
    heading: '#FDFF00',
    btn:     '#FDFF00',
  },
  // ... demais slugs
}
```

> **RSC boundary:** `lib/themes.ts` é um módulo puro — pode ser importado tanto em Server Components quanto em Client Components sem violações.

---

### 2. `GameScreen.tsx` — Server Component injeta o tema via `style`

`GameScreen` **permanece Server Component** (sem `'use client'`). Ele resolve o tema no servidor e injeta os valores semânticos como CSS custom properties inline no `<main>`.

```tsx
// components/GameScreen.tsx (Server Component)
import { SEMANTIC_MAP, type GameSlug } from '@/lib/themes'

type Props = { slug: GameSlug; /* ... */ }

export default function GameScreen({ slug, ...props }: Props) {
  const theme = SEMANTIC_MAP[slug]

  return (
    <main
      style={{
        '--theme-bg':      theme.bg,
        '--theme-border':  theme.border,
        '--theme-text':    theme.text,
        '--theme-heading': theme.heading,
        '--theme-btn':     theme.btn,
        backgroundColor:   'var(--theme-bg)',
      } as React.CSSProperties}
    >
      {/* children */}
    </main>
  )
}
```

> **Por que inline e não `globals.css`?** O tema muda por rota (slug). Colocar no globals criaria conflitos. Inline vars no `<main>` criam um escopo CSS isolado — os filhos herdam via `var(--theme-*)` normalmente.

> **Props serialização:** `SemanticTheme` contém apenas `string` — seguro para passar de Server → Client components.

---

### 3. `Header.tsx` — Consome `var(--theme-*)` via CSS

O `Header` não recebe o tema como prop. Ele lê as custom properties do contexto CSS herdado do `<main>`.

```tsx
// Linha inferior do header
<div style={{ borderBottom: '1px solid var(--theme-border)' }} />

// Botões de navegação
<button style={{ color: 'var(--theme-btn)' }}>BACK</button>
<button style={{ color: 'var(--theme-btn)' }}>NEXT</button>
```

> Isso evita prop drilling e mantém o Header desacoplado do sistema de temas.

---

### 4. `globals.css` — **Não alterado**

Tokens primitivos e semânticos ficam apenas no TypeScript e como inline vars. Nenhuma variável CSS global é adicionada para temas de jogo.

---

## Regras de Extensibilidade

- Ao adicionar um novo jogo:
  1. Adicionar seus primitivos em `PRIMITIVES[slug]`.
  2. Criar o mapeamento semântico em `SEMANTIC_MAP[slug]`.
  3. Nenhum componente precisa ser alterado.

- Para adicionar um novo elemento tematizado (ex.: `--theme-metadata-text`):
  1. Adicionar o campo ao tipo `SemanticTheme`.
  2. Mapear o valor em cada entrada do `SEMANTIC_MAP`.
  3. Consumir `var(--theme-metadata-text)` no CSS/style do componente correspondente.

---

## Open Questions

- [x] ~~Confirmar paleta de cores por jogo~~ — confirmado via JSON de tokens primitivos.
- [x] Há outros elementos que devem ser tematizados além dos 5 listados? (ex.: metadata text, logo border, controller zone bg) R: todos os textos devem usar o token semantico de textoa
- [x] O background do `<body>` deve mudar junto com `--theme-bg`, ou manter sempre `#0a0a0a`? R: Sim
