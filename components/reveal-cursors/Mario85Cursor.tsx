'use client'

import type { CursorProps } from './types'

export function Mario85Cursor({ pieceHeight }: CursorProps) {
  return (
    <img
      src="/animations/green_shell_mario85.png"
      alt=""
      aria-hidden="true"
      style={{ display: 'block', height: 'var(--piece-height)', width: 'auto' }}
    />
  )
}
