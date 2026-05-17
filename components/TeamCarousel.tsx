'use client'

import { useState, useEffect } from 'react'
import { playConfirm, playHover } from '@/lib/sounds'
import { useDictionary } from '@/lib/i18n/useDictionary'
import Image from 'next/image'

// ── Pixel-art arrow ───────────────────────────────────────────────────────────
// Bars rendered as vertical slices inside a flex-row container.
// direction='left'  → widest bar on the LEFT  (pointing left)
// direction='right' → widest bar on the RIGHT (pointing right)

const BAR_HEIGHTS_EM = [0.6, 0.45, 0.3, 0.15] // widest → narrowest

interface PixelArrowProps {
  direction: 'left' | 'right'
  hovered: boolean
}

function PixelArrow({ direction, hovered }: PixelArrowProps) {
  // Analogy from PixelTriangle: widest-first = pointing DOWN.
  // Rotated 90° CW: pointing LEFT = narrow-first (wide on right = point on left)
  //                 pointing RIGHT = wide-first  (wide on left = point on right)
  const bars = direction === 'left' ? [...BAR_HEIGHTS_EM].reverse() : BAR_HEIGHTS_EM

  return (
    <span
      aria-hidden="true"
      style={{
        display: 'inline-flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 0,
        flexShrink: 0,
        width: '0.6em',
        // White normally, dims to ~50% on hover (same pattern as LinksAccordion)
        color: hovered
          ? 'color-mix(in srgb, var(--theme-text, white) 50%, transparent)'
          : 'var(--theme-text, white)',
        transition: 'color 150ms ease',
      }}
    >
      {bars.map((h, i) => (
        <span
          key={i}
          style={{
            display: 'block',
            height: `${h}em`,
            width: '0.15em',
            backgroundColor: 'currentColor',
          }}
        />
      ))}
    </span>
  )
}

// ── Arrow button ──────────────────────────────────────────────────────────────

interface ArrowButtonProps {
  direction: 'left' | 'right'
  onClick: () => void
  ariaLabel: string
}

function ArrowButton({ direction, onClick, ariaLabel }: ArrowButtonProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={() => { playConfirm(); onClick() }}
      onMouseEnter={() => { playHover(); setHovered(true) }}
      onMouseLeave={() => setHovered(false)}
      style={{
        all: 'unset',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '64px',
        height: '64px',
        flexShrink: 0,
        fontSize: 'calc(var(--font-size-base) * 2.4)',
        lineHeight: 1,
      }}
    >
      <PixelArrow direction={direction} hovered={hovered} />
    </button>
  )
}

// ── Social icons ─────────────────────────────────────────────────────────────
// Links are stored as Partial<Record<SocialType, string>> per team member.
// Omit a key entirely to hide that icon — no empty placeholder is rendered.

type SocialType = 'website' | 'linkedin' | 'github'
type SocialLinks = Partial<Record<SocialType, string>>

const ICON_SIZE = '1.1em'

function SocialIcon({ type, href }: { type: SocialType; href: string }) {
  const label = type === 'website' ? 'Website' : type === 'linkedin' ? 'LinkedIn' : 'GitHub'
  const [hovered, setHovered] = useState(false)

  const icons: Record<SocialType, React.ReactNode> = {
    website: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor" aria-hidden="true" style={{ width: ICON_SIZE, height: ICON_SIZE, display: 'block' }}>
        <path d="M325-111.5q-73-31.5-127.5-86t-86-127.5Q80-398 80-480.5t31.5-155q31.5-72.5 86-127t127.5-86Q398-880 480.5-880t155 31.5q72.5 31.5 127 86t86 127Q880-563 880-480.5T848.5-325q-31.5 73-86 127.5t-127 86Q563-80 480.5-80T325-111.5ZM480-162q26-36 45-75t31-83H404q12 44 31 83t45 75Zm-104-16q-18-33-31.5-68.5T322-320H204q29 50 72.5 87t99.5 55Zm208 0q56-18 99.5-55t72.5-87H638q-9 38-22.5 73.5T584-178ZM170-400h136q-3-20-4.5-39.5T300-480q0-21 1.5-40.5T306-560H170q-5 20-7.5 39.5T160-480q0 21 2.5 40.5T170-400Zm216 0h188q3-20 4.5-39.5T580-480q0-21-1.5-40.5T574-560H386q-3 20-4.5 39.5T380-480q0 21 1.5 40.5T386-400Zm268 0h136q5-20 7.5-39.5T800-480q0-21-2.5-40.5T790-560H654q3 20 4.5 39.5T660-480q0 21-1.5 40.5T654-400Zm-16-240h118q-29-50-72.5-87T584-782q18 33 31.5 68.5T638-640Zm-234 0h152q-12-44-31-83t-45-75q-26 36-45 75t-31 83Zm-200 0h118q9-38 22.5-73.5T376-782q-56 18-99.5 55T204-640Z"/>
      </svg>
    ),
    github: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ width: ICON_SIZE, height: ICON_SIZE, display: 'block' }}>
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
      </svg>
    ),
    linkedin: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ width: ICON_SIZE, height: ICON_SIZE, display: 'block' }}>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      onMouseEnter={() => { playHover(); setHovered(true) }}
      onMouseLeave={() => setHovered(false)}
      onClick={() => playConfirm()}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: ICON_SIZE,
        height: ICON_SIZE,
        color: hovered ? '#888888' : '#ffffff',
        flexShrink: 0,
        transition: 'color 150ms ease',
      }}
    >
      {icons[type]}
    </a>
  )
}

// ── Team member data ──────────────────────────────────────────────────────────
// roles key maps to dict.credits.team[n].roles (EN / PT)

interface TeamMember {
  nameKey: 'deizielle' | 'joao' | 'pedro'
  name: string
  /** Add a key to show the icon; omit it to hide. */
  socials: SocialLinks
  photo?: string
}

// ─────────────────────────────────────────────────────────────────────────────
// EDITAR LINKS AQUI
// Para cada membro, adicione ou remova chaves: 'website', 'linkedin', 'github'.
// Se a chave não existir, o ícone simplesmente não aparece.
// ─────────────────────────────────────────────────────────────────────────────
const TEAM: TeamMember[] = [
  {
    nameKey: 'deizielle',
    name: 'Deizielle Klemp',
    photo: '/profile-images/deizielleklemp.png',
    socials: {
      linkedin: 'https://www.linkedin.com',
      github:   'https://github.com',
    },
  },
  {
    nameKey: 'joao',
    name: 'João Pedro Oliveira',
    photo: '/profile-images/joaopedro.png',
    socials: {
      website:  'https://www.nonotre.com',
      linkedin: 'https://www.linkedin.com/in/nonotre',
      github:   'https://github.com/nonotre',
    },
  },
  {
    nameKey: 'pedro',
    name: 'Pedro Sarni',
    photo: '/profile-images/pedrosarni.png',
    socials: {
      linkedin: 'https://www.linkedin.com',
      github:   'https://github.com',
    },
  },
]

// ── Card ─────────────────────────────────────────────────────────────────────

interface CardProps {
  member: TeamMember
  roles: string
}

function TeamCard({ member, roles }: CardProps) {
  const dict = useDictionary()

  return (
    <div
      style={{
        // Same thick border as InfoCard; fallback to white when no game theme is active
        border: '4px solid var(--theme-border, white)',
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: '9rem',
        overflow: 'hidden',
      }}
    >
      {/* ── Photo — square, full card height ── */}
      <div
        style={{
          flexShrink: 0,
          width: '9rem',
          height: '100%',
          position: 'relative',
          backgroundColor: 'color-mix(in srgb, var(--theme-border, white) 25%, transparent)',
          borderRight: '4px solid var(--theme-border, white)',
        }}
      >
        {member.photo && (
          <Image
            src={member.photo}
            alt={dict.credits.memberPhotoAlt(member.name)}
            fill
            sizes="9rem"
            style={{
              objectFit: 'cover',
            }}
            priority
          />
        )}
      </div>

      {/* ── Text content ── */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '0.35rem',
          padding: '0.85rem 1rem',
          overflow: 'hidden',
        }}
      >
        {/* Name */}
        <span
          style={{
            fontFamily: 'var(--font-heading), monospace',
            fontSize: 'clamp(1rem, 4vw, 1.5rem)',
            color: 'var(--theme-heading)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            lineHeight: 1.2,
          }}
        >
          {member.name}
        </span>

        {/* Roles */}
        <span
          style={{
            fontFamily: 'var(--font-body), monospace',
            fontSize: 'var(--font-size-base)',
            color: 'var(--theme-text)',
            opacity: 0.75,
            lineHeight: 1.3,
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          } as React.CSSProperties}
        >
          {roles}
        </span>

        {/* Social icons row */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '0.5rem',
            alignItems: 'center',
            marginTop: 'auto',
          }}
        >
          {(Object.entries(member.socials) as [SocialType, string][]).map(([type, href]) => (
            <SocialIcon key={type} type={type} href={href} />
          ))}
        </div>
      </div>
    </div>
  )
}

// ── TeamCarousel ──────────────────────────────────────────────────────────────

export function TeamCarousel() {
  const dict = useDictionary()
  const [index, setIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const total = TEAM.length

  function prev() { setIndex((i) => (i - 1 + total) % total) }
  function next() { setIndex((i) => (i + 1) % total) }

  useEffect(() => {
    if (isHovered) return

    const interval = setInterval(() => {
      next()
    }, 2800)

    return () => clearInterval(interval)
  }, [isHovered, index])

  const member = TEAM[index]
  const roles = dict.credits.team[member.nameKey]

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '0.5rem',
        width: '100%',
      }}
    >
      <ArrowButton direction="left"  onClick={prev} ariaLabel="Previous team member" />

      <div style={{ flex: 1, minWidth: 0 }}>
        <TeamCard member={member} roles={roles} />
      </div>

      <ArrowButton direction="right" onClick={next} ariaLabel="Next team member" />
    </div>
  )
}
