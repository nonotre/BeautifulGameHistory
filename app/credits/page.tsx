import type { Metadata } from 'next'
import { CreditsScreen } from '@/components/CreditsScreen'
import { en } from '@/lib/i18n/en'

export const metadata: Metadata = {
  title: en.credits.pageTitle,
  description: en.siteDescription,
}

/**
 * Credits page — Server Component.
 */
export default function CreditsPage() {
  return <CreditsScreen />
}
