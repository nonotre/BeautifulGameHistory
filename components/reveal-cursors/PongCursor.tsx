'use client'

import { useEffect, useState } from 'react'
import type { CursorProps } from './types'

export function PongCursor({ pieceHeight }: CursorProps) {
  const ph = `var(--piece-height, ${pieceHeight}px)`
  
  // textHeight is half of pieceHeight because heightScale is 2
  const th = `calc(${ph} / 2)`
  
  // totalWidth is 3 times textHeight = 1.5 times pieceHeight
  const tw = `calc(${ph} * 1.5)`
  
  const ballSize = `calc(${th} / 4)`
  
  // Reasonable paddle sizes
  const paddleWidth = `calc(${th} / 6)`
  const paddleHeight = `calc(${th} * 0.8)`

  const [delay, setDelay] = useState(0)
  useEffect(() => {
    // Generate a random negative delay between 0s and -4s
    setDelay(-(Math.random() * 4))
  }, [])

  return (
    <div 
      className="pong-cursor"
      style={{ 
        position: 'relative',
        height: ph,
        width: tw,
        backgroundColor: 'black',
        '--paddle-w': paddleWidth,
        '--paddle-h': paddleHeight,
        '--ball-s': ballSize,
        '--anim-delay': `${delay}s`,
      } as React.CSSProperties}
    >
      <style>{`
        @keyframes pong-ball-move {
          0% { left: var(--paddle-w); top: 10%; }
          25% { left: calc(100% - var(--paddle-w) - var(--ball-s)); top: 90%; }
          50% { left: var(--paddle-w); top: 50%; }
          75% { left: calc(100% - var(--paddle-w) - var(--ball-s)); top: 20%; }
          100% { left: var(--paddle-w); top: 10%; }
        }

        @keyframes pong-paddle-left-move {
          0% { top: 10%; }
          25% { top: 30%; }
          50% { top: 50%; }
          75% { top: 30%; }
          100% { top: 10%; }
        }

        @keyframes pong-paddle-right-move {
          0% { top: 50%; }
          25% { top: 90%; }
          50% { top: 55%; }
          75% { top: 20%; }
          100% { top: 50%; }
        }

        .pong-paddle {
          position: absolute;
          width: var(--paddle-w);
          height: var(--paddle-h);
          background-color: currentColor;
          transform: translateY(-50%);
        }

        .pong-paddle-left {
          left: 0;
          animation: pong-paddle-left-move 4s linear infinite var(--anim-delay);
        }

        .pong-paddle-right {
          right: 0;
          animation: pong-paddle-right-move 4s linear infinite var(--anim-delay);
        }

        .pong-ball {
          position: absolute;
          width: var(--ball-s);
          height: var(--ball-s);
          background-color: currentColor;
          transform: translateY(-50%);
          animation: pong-ball-move 4s linear infinite var(--anim-delay);
        }
      `}</style>
      
      <div className="pong-paddle pong-paddle-left" />
      <div className="pong-paddle pong-paddle-right" />
      <div className="pong-ball" />
    </div>
  )
}
