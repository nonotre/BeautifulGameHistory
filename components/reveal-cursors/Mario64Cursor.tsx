'use client'

import type { CursorProps } from './types'

export function Mario64Cursor({ pieceHeight }: CursorProps) {
  return (
    <img
      src="/animations/hat-mario64.png"
      alt=""
      aria-hidden="true"
      style={{ display: 'block', height: pieceHeight, width: 'auto' }}
    />
  )
}
