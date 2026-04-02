import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

/**
 * Phase 1 font: Inter via next/font/google.
 * Phase 2: swap for retro gaming font (Press_Start_2P or similar).
 * The `variable` option exposes the font as a CSS custom property
 * for use in Tailwind and globals.css.
 */
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
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
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  )
}
