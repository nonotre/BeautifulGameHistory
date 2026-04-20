/**
 * languageStore — persists the selected language across the session.
 * Default: 'pt' (Portuguese).
 *
 * Usage in Client Components:
 *   const lang     = useLanguageStore((s) => s.lang)
 *   const setLang  = useLanguageStore((s) => s.setLang)
 */
import { create } from 'zustand'

export type Lang = 'pt' | 'en'

interface LanguageState {
  lang: Lang
  setLang: (lang: Lang) => void
}

export const useLanguageStore = create<LanguageState>()((set) => ({
  lang: 'pt',
  setLang: (lang) => set({ lang }),
}))
