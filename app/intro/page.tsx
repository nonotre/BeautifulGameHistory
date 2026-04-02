import type { Metadata } from 'next'
import { IntroScreen } from '@/components/IntroScreen'
import { en } from '@/lib/i18n/en'

export const metadata: Metadata = {
  title: en.intro.pageTitle,
  description: en.siteDescription,
}

/**
 * Intro page — Server Component.
 * Client-side concerns (countdown, video events) live in IntroScreen.
 */
export default function IntroPage() {
  return <IntroScreen />
}
