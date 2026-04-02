/**
 * English (EN) content dictionary — Phase 1.
 * Structure is intentionally flat to make PT-BR addition easy in Phase 3.
 * Keys mirror component usage names for easy lookup.
 */
export const en = {
  // ── Site-wide ──────────────────────────────────────────────────────────
  siteTitle: 'Beautiful Game History',
  siteDescription: 'An interactive history of the most revolutionary video games.',

  // ── Navigation buttons ──────────────────────────────────────────────────
  nav: {
    back: 'BACK',
    next: 'NEXT',
  },

  // ── Start Screen ────────────────────────────────────────────────────────
  start: {
    intro: 'INTRO',
    games: 'GAMES',
    credits: 'CREDITS',
    game1: 'GAME 1',
    game2: 'GAME 2',
    game3: 'GAME 3',
    game4: 'GAME 4',
    game5: 'GAME 5',
  },

  // ── Intro Screen ────────────────────────────────────────────────────────
  intro: {
    pageTitle: 'Introduction',
    seeGames: 'SEE GAMES',
    countdownMessage: (seconds: number) => `${seconds}s remaining…`,
  },

  // ── Game Screens ─────────────────────────────────────────────────────────
  game: {
    logoAlt: (slug: string) => `${slug} logo placeholder`,
    controllerAlt: (slug: string) => `${slug} controller placeholder`,
    placeholderText: [
      'This is the story of a revolutionary video game that changed the industry forever.',
      'The title introduced mechanics and ideas that defined an entire generation of players.',
      'Its influence can still be felt in modern releases, decades after its original launch.',
      'Developers around the world cite it as a primary source of inspiration.',
      'Players who experienced it first-hand remember exactly where they were.',
    ],
  },

  // ── Credits Screen ───────────────────────────────────────────────────────
  credits: {
    pageTitle: 'Credits',
    teamImageAlt: 'Development team photo placeholder',
    placeholderText: [
      'Beautiful Game History was created by a team of three passionate developers.',
      'The project is a love letter to the games that shaped our childhood and our profession.',
      'Thank you for playing.',
    ],
  },

  // ── Error / Not Found ────────────────────────────────────────────────────
  errors: {
    notFoundTitle: 'Page Not Found',
    notFoundBody: 'The page you are looking for does not exist.',
    notFoundHome: 'Return to Start',
    errorTitle: 'Something went wrong',
    errorBody: 'An unexpected error occurred.',
    errorRetry: 'Try again',
  },
} as const

export type Dictionary = typeof en
