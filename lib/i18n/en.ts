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
    game1: 'PONG (1972)',
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
    logoAlt: (title: string) => `${title} logo`,
    controllerAlt: (title: string) => `${title} controller`,
    // Shared technical labels
    technicalInfo: 'Technical and Market Information',
    history: 'History and Behind the Scenes',
    howItWorks: 'How the Game Works',
    impact: 'Historical, Commercial, and Social Impact',
    techAdvancements: 'Impact on Computing and Technological Advancements',
    
    // Per-game record
    games: {
      pong: {
        title: 'Pong (1972)',
        description: 'An analysis of the classic Pong (1972), covering everything from its behind-the-scenes hardware engineering development to its immeasurable commercial and cultural impact. The work consolidates the transition of electronic games from isolated academic experiments to the first major mass entertainment phenomenon worldwide.',
        manufacturer: 'Atari Inc.',
        year: '1972 (Arcade) / 1975 (Dedicated Home Console)',
        salesVolume: 'Reached over 8,000 arcade machines in 1974 and approximately 150,000 units of Home Pong in just one season (1975).',
        creators: 'Developed by engineer Allan Alcorn, under the direction of Atari Inc. founders Nolan Bushnell and Ted Dabney.',
        content: [
          'History and Behind the Scenes of Development',
          'The project that brought Pong to life was not born with the ambition to dominate the market, but rather as a "warm-up" exercise assigned to engineer Allan Alcorn by the founders of the newly born Atari, Nolan Bushnell and Ted Dabney. Inspired by the Magnavox Odyssey system\'s table tennis, Alcorn used his knowledge of logic circuits to create something innovative, even without prior experience in the gaming field.',
          'The team\'s genius became apparent during the first field test, conducted at Andy Capp’s Tavern, using a modified TV in a wooden cabinet: in just ten days, the machine simply stopped working because its coin mechanism was completely jammed with quarters. Unable to secure traditional financing—since banks associated the idea with frowned-upon gambling and pinball machines—Bushnell maneuvered the market, rejecting partnership offers from competitors and leading Atari to manufacture the arcade cabinet itself, cementing its place in the industry.',
          'How the Game Works',
          'On screen, Pong is a minimalist, two-dimensional table tennis simulator. The player controls a "paddle" (a vertical bar on the left side of the screen) by moving it up and down to try and hit a square ball, while competing against another player or the machine itself on the right side.',
          'The great merit of the gameplay lies in its embedded technical depth: the paddle is divided into eight invisible segments. If the ball hits the center of the bar, it returns at an exact 90-degree angle; if it hits the outer edges, the return angle decreases, demanding reflexes and geometric strategy. To increase the challenge, the ball\'s speed progressively accelerates with each hit, resetting only when someone lets the sphere pass. The goal is to score more points than your opponent by making them fail to return the ball.',
          'Historical, Commercial, and Social Impact',
          'Pong\'s arrival on the streets in 1972 caused an unprecedented disruption in the digital entertainment world, ushering in the true "arcade phenomenon." Each machine generated a staggering daily profit of up to US$ 40—four times the average of other coin-operated equipment of the era.',
          'This astronomical success inevitably attracted competitors who flooded the market with unlicensed clones (referred to by Bushnell as "jackals"). In 1975, Atari broke another massive cultural barrier by releasing Home Pong in partnership with the Sears department store, bringing the arcade experience directly into family living rooms and quickly selling out 150,000 units. This move proved to the world that video games were a highly profitable business, ensuring not only Atari\'s survival but also motivating Japanese giants like Nintendo and Konami, as well as tech companies like Coleco, to invest in the sector. As a testament to its weight in society, Pong is immortalized in the permanent collection of the Smithsonian Institution for its cultural significance.',
          'Impact on Computing and Technological Advancements',
          'Perhaps the most fascinating fact about the 1972 Pong is its engineering: unlike what we understand as a video game today, the original game had no CPU (processor), no RAM, and did not run a single line of software code. It was a brilliant Finite-State Machine system running entirely physically on dedicated hardware. The game board used Discrete Logic (TTL), relying on about 66 chips, counters, and soldered logic gates.',
          'The processing of collisions, acceleration, and the ball\'s angles were based purely on timers and electrical currents passing through the circuits (analog physics). Furthermore, there was no video memory (framebuffer); the screen image was generated by modulating the voltage signal directly with the CRT television\'s electron beam in real-time. Even the iconic "beeps" the game emitted were not audio files, but rather noises extracted directly from the electrical frequencies of the machine\'s video sync generator.'
        ]
      },
      // Placeholders for remaining games to avoid TS errors
      'game-2': { 
        title: 'Game 2', 
        description: 'Placeholder description',
        manufacturer: 'Manufacturer',
        year: 'Year',
        salesVolume: 'Sales',
        creators: 'Creators',
        content: ['Placeholder content'] 
      },
      'game-3': { 
        title: 'Game 3', 
        description: 'Placeholder description',
        manufacturer: 'Manufacturer',
        year: 'Year',
        salesVolume: 'Sales',
        creators: 'Creators',
        content: ['Placeholder content'] 
      },
      'game-4': { 
        title: 'Game 4', 
        description: 'Placeholder description',
        manufacturer: 'Manufacturer',
        year: 'Year',
        salesVolume: 'Sales',
        creators: 'Creators',
        content: ['Placeholder content'] 
      },
      'game-5': { 
        title: 'Game-5', 
        description: 'Placeholder description',
        manufacturer: 'Manufacturer',
        year: 'Year',
        salesVolume: 'Sales',
        creators: 'Creators',
        content: ['Placeholder content'] 
      },
    }
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
