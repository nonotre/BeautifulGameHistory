'use client'

import type { CursorProps } from './types'

export function TetrisCursor({ pieceHeight }: CursorProps) {
  // Use CSS variables for fluid sizing injected by AnimatedContent.tsx, 
  // falling back to pieceHeight if not set.
  const ph = `var(--piece-height, ${pieceHeight}px)`
  const gap = `calc(${ph} / 7)`
  
  // Total width is 4 blocks + 3 gaps
  // 4 + 3/7 = 31/7
  const totalWidth = `calc(${ph} * 31 / 7)`

  // We render a div with full totalWidth x pieceHeight.
  // The blocks are positioned relative to the right edge (the front).
  return (
    <div 
      style={{ 
        position: 'relative',
        height: ph,
        width: totalWidth,
      }}
    >
      {/* Front block (Rightmost) */}
      <img 
        src="/animations/block-tetris.png" 
        alt="" 
        style={{ 
          position: 'absolute', 
          right: 0, 
          top: 0,
          height: ph, 
          width: ph, 
          display: 'block' 
        }} 
      />
      
      {/* Block 2 */}
      <img 
        src="/animations/block-tetris.png" 
        alt="" 
        style={{ 
          position: 'absolute', 
          right: `calc(${ph} + ${gap})`, 
          top: 0,
          height: ph, 
          width: ph,
          display: 'block'
        }} 
      />
      
      {/* Block 3 */}
      <img 
        src="/animations/block-tetris.png" 
        alt="" 
        style={{ 
          position: 'absolute', 
          right: `calc(${ph} * 2 + ${gap} * 2)`, 
          top: 0,
          height: ph, 
          width: ph,
          display: 'block'
        }} 
      />

      {/* Block 4 */}
      <img 
        src="/animations/block-tetris.png" 
        alt="" 
        style={{ 
          position: 'absolute', 
          right: `calc(${ph} * 3 + ${gap} * 3)`, 
          top: 0,
          height: ph, 
          width: ph,
          display: 'block'
        }} 
      />
    </div>
  )
}
