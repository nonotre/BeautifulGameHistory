import type { Metadata } from 'next'
import { Silkscreen, VT323, Geist } from 'next/font/google'
import './globals.css'
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

/**
 * Phase 2 fonts (retro gaming theme):
 * - Silkscreen  → navigations, buttons, headings  (--font-heading)
 * - VT323       → paragraphs and body copy         (--font-body)
 *
 * Both are loaded via next/font/google (self-hosted, zero layout shift).
 * The `variable` option exposes each font as a CSS custom property so
 * globals.css can reference them without touching component code.
 */
const silkscreen = Silkscreen({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-heading',
})

const vt323 = VT323({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-body',
})

export const metadata: Metadata = {
  title: {
    default: 'Beautiful Game History',
    template: '%s | Beautiful Game History',
  },
  description: 'An interactive history of the most revolutionary video games.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={cn(silkscreen.variable, vt323.variable, "font-sans", geist.variable, "dark")}>
      <body>{children}</body>
    </html>
  )
}
