/**
 * useDictionary — returns the active language dictionary.
 *
 * Usage in any Client Component:
 *   const dict = useDictionary()
 *   dict.nav.back   // 'VOLTAR' when lang = 'pt', 'BACK' when lang = 'en'
 */
'use client'

import { useLanguageStore } from '@/store/languageStore'
import { en } from '@/lib/i18n/en'
import { pt } from '@/lib/i18n/pt'

export function useDictionary() {
  const lang = useLanguageStore((s) => s.lang)
  return lang === 'en' ? en : pt
}
