'use client'

import { PRIMITIVES } from '@/lib/themes'
import type { CursorProps } from './types'

export function PacmanCursor({ pieceHeight }: CursorProps) {
  // Use CSS variables for fluid sizing injected by AnimatedContent.tsx
  const ph = `var(--piece-height, ${pieceHeight}px)`
  const bigSize = `calc(${ph} * 2)`
  const gap = `calc(${ph} / 2)`

  const colors = PRIMITIVES['pac-man']
  const yellow = colors['--pacman-yellow']
  const cream = colors['--pacman-cream']

  return (
    <>
      <style>{`
        @keyframes pacman-chomp {
          0% { clip-path: polygon(100% 90%, 50% 50%, 100% 10%, 100% 0, 0 0, 0 100%, 100% 100%); }
          100% { clip-path: polygon(100% 50%, 50% 50%, 100% 50%, 100% 0, 0 0, 0 100%, 100% 100%); }
        }

        .pacman-head {
          animation: pacman-chomp 0.15s infinite alternate linear;
        }

        /* OUTRO OVERRIDES (When .pacman-outro is applied) */
        .pacman-outro .pacman-head {
          /* By default, it chomps 7 times (approx 1s) then stops closed */
          animation: pacman-chomp 0.15s 7 alternate linear forwards;
        }

        .pacman-outro.pacman-active .pacman-head {
          /* If active (determined by scroll), it chomps infinitely */
          animation: pacman-chomp 0.15s infinite alternate linear;
        }
      `}</style>
      <div 
        style={{ 
          position: 'relative',
          width: `calc(${ph} * 9.5)`,
          height: ph,
        }}
      >
        {/* The Track of Dots (rendered behind head so it masks seamlessly) */}
        <div 
          className="pacman-track" 
          style={{ 
            position: 'absolute',
            left: ph, /* Starts exactly at the center of the head */
            width: `calc(${ph} * 8.5)`,
            maxWidth: `calc(var(--text-end-x, 10000px) - var(--cursor-x, 0px) - ${ph})`,
            height: ph,
            backgroundImage: `radial-gradient(circle closest-side, ${cream} 85%, transparent 90%)`,
            backgroundSize: `calc(${ph} * 1.5) 100%`,
            backgroundPositionX: `calc(var(--text-end-x, 10000px) - var(--cursor-x, 0px) - ${ph})`,
            backgroundRepeat: 'repeat-x',
            zIndex: 0,
          }} 
        />

        {/* Big circle (Pac-Man) */}
        <div 
          className="pacman-head"
          style={{
            position: 'absolute',
            left: 0,
            top: `calc(${ph} * -0.5)`,
            width: bigSize,
            height: bigSize,
            borderRadius: '50%',
            backgroundColor: yellow,
            zIndex: 10,
          }}
        />
      </div>
    </>
  )
}
