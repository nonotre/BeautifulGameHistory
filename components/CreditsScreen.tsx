'use client'

import { useRef } from 'react'
import { Header } from '@/components/Header'
import { LinksAccordion } from '@/components/LinksAccordion'
import { TeamCarousel } from '@/components/TeamCarousel'
import { AnimatedContent } from '@/components/AnimatedContent'
import { useDictionary } from '@/lib/i18n/useDictionary'

/**
 * CreditsScreen — Client Component.
 * Header with BACK only (no NEXT button).
 * Renders the Team Carousel, the animated Project Credits content, and the References.
 */
export function CreditsScreen() {
  const dict = useDictionary()
  const scrollContainerRef = useRef<HTMLElement>(null)

  return (
    <main
      style={
        {
          height: '100dvh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          // ── Semantic CSS custom properties ────────────────────────────────
          '--theme-bg': '#000000',
          '--theme-border': '#ffffff',
          '--theme-text': '#ffffff',
          '--theme-heading': '#ffffff',
          '--theme-btn': '#ffffff',
          '--theme-btn-hover': '#999999',
        } as React.CSSProperties
      }
    >
      <div
        className="column"
        style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}
      >
        <Header hasNext={false} />

        <section
          ref={scrollContainerRef}
          className="hide-scrollbar"
          style={{
            flex: 1,
            overflowY: 'auto',
            overflowX: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            paddingBlock: '2rem',
          }}
        >
          {/* Team carousel */}
          <TeamCarousel />

          {/* About section using AnimatedContent */}
          <AnimatedContent
            content={[`### ${dict.credits.aboutHeading}`, ...dict.credits.aboutText]}
            gameSlug="credits"
            scrollContainerRef={scrollContainerRef}
          />

          {/* References section
               Negative margin + matching padding gives focus outlines (4px + 4px-offset = 8px)
               room to render on all sides without shifting the layout. */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.25rem',
              // 10px > outline (4px) + outline-offset (4px) = 8px needed
              marginInline: '-10px',
              paddingInline: '10px',
              paddingBottom: '10px',
              marginBottom: '-10px',
            }}
          >
            <h2
              style={{
                fontSize: '1rem',
                color: 'var(--theme-heading)',
                textTransform: 'uppercase',
                marginTop: '1rem',
                marginBottom: '0.5rem',
              }}
            >
              {dict.credits.linksHeading}
            </h2>

            {dict.credits.links.map((section) => (
              <LinksAccordion
                key={section.game}
                title={section.game}
                links={section.items}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
