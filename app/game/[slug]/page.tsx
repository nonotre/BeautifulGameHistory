import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { GameScreen } from '@/components/GameScreen'

import { en } from '@/lib/i18n/en'

type Props = { params: Promise<{ slug: string }> }

const VALID_SLUGS = ['pong', 'game-2', 'game-3', 'game-4', 'game-5'] as const

/** Static generation for all 5 known game slugs. */
export function generateStaticParams() {
  return VALID_SLUGS.map((slug) => ({ slug }))
}

/** Per-game metadata. */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const game = en.game.games[slug as keyof typeof en.game.games]
  
  return {
    title: game?.title || slug,
    description: (game as any)?.description || '',
  }
}

/**
 * Game page — Server Component.
 * - Validates slug, returning 404 for unknown values.
 * - Passes only the serializable `slug` string to the Client Component.
 */
export default async function GamePage({ params }: Props) {
  const { slug } = await params

  if (!VALID_SLUGS.includes(slug as (typeof VALID_SLUGS)[number])) {
    notFound()
  }

  return <GameScreen slug={slug} />
}
