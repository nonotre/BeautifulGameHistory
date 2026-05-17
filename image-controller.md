# Image Controller — Notas de Alteração

## Status: DESATIVADO (comentado)

**Data:** 2026-05-17  
**Arquivo:** `components/GameScreen.tsx`  
**Linhas afetadas:** 210–227 (originais)

---

## O que foi feito

A seção *Controller zone* foi envolvida num bloco de comentário JSX (`{/* ... */}`), preservando **todo o código original intacto**. Nenhuma linha foi deletada.

### Antes

```tsx
{/* Controller zone — fixed height, ~35vh */}
<section
  aria-label="Interactive controller"
  style={{
    flex: '0 0 35%',
    borderTop: '4px solid var(--theme-border)',
    padding: '1rem',
    overflow: 'hidden',
  }}
>
  <div
    className="placeholder-block"
    style={{ width: '100%', height: '100%' }}
    aria-label={dict.game.controllerAlt(game.title)}
  >
    {game.title} controller
  </div>
</section>
```

### Depois

```tsx
{/* DISABLED — Controller zone placeholder (restore when ready)
<section
  aria-label="Interactive controller"
  style={{
    flex: '0 0 35%',
    borderTop: '4px solid var(--theme-border)',
    padding: '1rem',
    overflow: 'hidden',
  }}
>
  <div
    className="placeholder-block"
    style={{ width: '100%', height: '100%' }}
    aria-label={dict.game.controllerAlt(game.title)}
  >
    {game.title} controller
  </div>
</section>
*/}
```

---

## Como restaurar

Localizar o bloco `{/* DISABLED — Controller zone placeholder` em `GameScreen.tsx` e remover as marcações de comentário:
- Remover a linha `{/* DISABLED — Controller zone placeholder (restore when ready)`
- Remover a linha de fechamento `*/}`
- Restaurar o comentário original `{/* Controller zone — fixed height, ~35vh */}` antes da `<section>`

---

## Impacto visual

- O espaço de ~35% da viewport que era ocupado pelo placeholder foi liberado para a zona de conteúdo.
- A borda superior (`4px solid var(--theme-border)`) que separava as zonas também desapareceu.
- O `flex: '0 0 35%'` deixou de consumir espaço vertical, dando mais espaço ao conteúdo scrollável.
