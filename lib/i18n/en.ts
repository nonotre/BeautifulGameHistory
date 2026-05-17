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
    options: 'OPTIONS',
    game1: 'PONG (1972)',
    game2: 'PAC-MAN (1980)',
    game3: 'TETRIS (1984)',
    game4: 'MARIO (1985)',
    game5: 'MARIO 64 (1996)',
  },

  // ── Options Screen ──────────────────────────────────────────────────────
  options: {
    labelPt: 'PORTUGUÊS',
    labelEn: 'ENGLISH',
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
    // Info card labels
    cardLabelYear:     'YEAR',
    cardLabelSales:    'SALES',
    cardLabelCreators: 'CREATORS',

    // Per-game record
    games: {
      pong: {
        title: 'Pong (1972)',
        description: 'An analysis of the classic Pong (1972), covering everything from its behind-the-scenes hardware engineering development to its immeasurable commercial and cultural impact. The work consolidates the transition of electronic games from isolated academic experiments to the first major mass entertainment phenomenon worldwide.',
        manufacturer: 'Atari Inc.',
        year: '1972 (Arcade) / 1975 (Dedicated Home Console)',
        salesVolume: 'Reached over 8,000 arcade machines in 1974 and approximately 150,000 units of Home Pong in just one season (1975).',
        creators: 'Developed by engineer Allan Alcorn, under the direction of Atari Inc. founders Nolan Bushnell and Ted Dabney.',
        yearHighlight: '1972',
        yearDescription: 'Arcade release. Home console in 1975.',
        salesHighlight: '+8,000',
        salesDescription: 'Arcade machines until 1974. 150k units of Home Pong in 1975.',
        creatorsHighlight: 'Allan Alcorn',
        creatorsDescription: 'And Atari direction, Nolan Bushnell and Ted Dabney.',
        content: [
          '### History and Behind the Scenes of Development',
          'The evolution of video games has its roots in laboratory experiments from the 1950s and 1960s, notably Tennis for Two (1958), for its pioneering use of visual interfaces on oscilloscopes, and Spacewar! (1962), for its logical complexity in academic computing environments such as MIT. However, despite the technical pioneering of these milestones, Pong (1972) is adopted as the fundamental starting point of this analysis, given its academic transcendence towards the gaming market.',
          'The project that brought Pong to life was not born with the ambition to dominate the market, but rather as a "warm-up" exercise assigned to engineer Allan Alcorn by the founders of the newly born Atari, Nolan Bushnell and Ted Dabney. Inspired by the Magnavox Odyssey system\'s table tennis, Alcorn used his knowledge of logic circuits to create something innovative, even without prior experience in the gaming field.',
          'The team\'s genius became apparent during the first field test, conducted at Andy Capp\'s Tavern, using a modified TV in a wooden cabinet: in just ten days, the machine simply stopped working because its coin mechanism was completely jammed with quarters. Unable to secure traditional financing—since banks associated the idea with frowned-upon gambling and pinball machines—Bushnell maneuvered the market, rejecting partnership offers from competitors and leading Atari to manufacture the arcade cabinet itself, cementing its place in the industry.',
          '### How the Game Works',
          'On screen, Pong is a minimalist, two-dimensional table tennis simulator. The player controls a "paddle" (a vertical bar on the left side of the screen) by moving it up and down to try and hit a square ball, while competing against another player or the machine itself on the right side.',
          'The great merit of the gameplay lies in its embedded technical depth: the paddle is divided into eight invisible segments. If the ball hits the center of the bar, it returns at an exact 90-degree angle; if it hits the outer edges, the return angle decreases, demanding reflexes and geometric strategy. To increase the challenge, the ball\'s speed progressively accelerates with each hit, resetting only when someone lets the sphere pass. The goal is to score more points than your opponent by making them fail to return the ball.',
          '### Historical, Commercial, and Social Impact',
          'Pong\'s arrival on the streets in 1972 caused an unprecedented disruption in the digital entertainment world, ushering in the true "arcade phenomenon." Each machine generated a staggering daily profit of up to US$ 40—four times the average of other coin-operated equipment of the era.',
          'This astronomical success inevitably attracted competitors who flooded the market with unlicensed clones (referred to by Bushnell as "jackals"). In 1975, Atari broke another massive cultural barrier by releasing Home Pong in partnership with the Sears department store, bringing the arcade experience directly into family living rooms and quickly selling out 150,000 units. This move proved to the world that video games were a highly profitable business, ensuring not only Atari\'s survival but also motivating Japanese giants like Nintendo and Konami, as well as tech companies like Coleco, to invest in the sector. As a testament to its weight in society, Pong is immortalized in the permanent collection of the Smithsonian Institution for its cultural significance.',
          '### Impact on Computing and Technological Advancements',
          'Perhaps the most fascinating fact about the 1972 Pong is its engineering: unlike what we understand as a video game today, the original game had no CPU (processor), no RAM, and did not run a single line of software code. It was a brilliant Finite-State Machine system running entirely physically on dedicated hardware. The game board used Discrete Logic (TTL), relying on about 66 chips, counters, and soldered logic gates.',
          'The processing of collisions, acceleration, and the ball\'s angles were based purely on timers and electrical currents passing through the circuits (analog physics). Furthermore, there was no video memory (framebuffer); the screen image was generated by modulating the voltage signal directly with the CRT television\'s electron beam in real-time. Even the iconic "beeps" the game emitted were not audio files, but rather noises extracted directly from the electrical frequencies of the machine\'s video sync generator.'
        ]
      },
      // Placeholders for remaining games to avoid TS errors
      'pac-man': {
        title: 'Pac-Man (1980)',
        description: 'An overview of the creation, innovative mechanics, and cultural and technological impact of Pac-Man, the classic maze game that broke paradigms and revolutionized the interactive entertainment industry in the 1980s.',
        console: 'Arcade',
        year: '1980',
        salesVolume: 'Over 400,000 arcade cabinets sold worldwide (making it one of the highest-grossing games in history)',
        creators: 'Toru Iwatani',
        yearHighlight: '1980',
        yearDescription: 'Released in arcades by Namco.',
        salesHighlight: '+400k',
        salesDescription: 'Arcade cabinets sold worldwide.',
        creatorsHighlight: 'Toru Iwatani',
        creatorsDescription: 'Developed at Namco.',
        content: [
          '### History and Behind the Scenes',
          'In the late 1970s, the arcade market was heavily focused on the male audience and saturated with violent space shooter games, such as *Space Invaders*. Seeking to expand this market and attract the female audience, Toru Iwatani decided to create a friendly and harmless experience. The inspiration for the main character\'s iconic design came from the image of a pizza missing a slice and the Japanese ideogram for "mouth" (*kuchi*). Originally, the project was named *Puck-Man*, a play on *paku-paku* (the Japanese onomatopoeia for the sound of chewing). However, upon being exported to the United States, the name was strategically changed to *Pac-Man* to prevent vandals from altering the letter "P" to an "F" on the machines.',
          '### How the Game Works',
          '*Pac-Man* is a dynamic maze game where the player controls the protagonist with the simple goal of eating all the pills scattered across the screen while fleeing from four colorful ghosts. The gameplay design was intended to be challenging, but not frustrating: according to Iwatani himself, being constantly pursued would generate too much stress. To solve this, the game was programmed so that the enemies would attack in "waves." The ghosts surround the player and, from time to time, retreat and disperse, offering a more natural pacing to the game and providing breathing room before the next assault.',
          '### Historical and Societal Impact',
          'The title transcended arcades and made a profound impact on pop culture, becoming the first major "mascot" in video game history. Its pleasing aesthetics and lack of violence not only achieved the goal of attracting the female audience but also popularized electronic games for the whole family, generating an unprecedented wave of merchandising. Furthermore, *Pac-Man* pioneered the introduction of "intermissions"—short animated cutscenes shown between stages. This innovation marked one of the earliest examples of visual storytelling in video games, a concept of reward and character humanization that would become an absolute standard in the entertainment industry.',
          '### Technological and Computing Advances',
          'From a technological standpoint, running on an 8-bit Zilog Z80 processor, the game was a milestone in the efficient use of hardware and artificial intelligence. To deal with the limited memory of the time without losing visual vibrancy, Iwatani used a clever sprite system with reduced sub-palettes (about 4 colors per object), ensuring that each element was easily distinguishable on screen. The greatest revolution, however, was its deterministic, rule-based AI. Instead of moving randomly, each of the four ghosts runs a specific algorithm that dictates its "personality": the Red one pursues directly, the Pink one tries to anticipate and cut off the path, the Cyan one acts in a combined manner, and the Orange one alternates aggressiveness with evasive patrolling. This engineering created the illusion of intelligent and complex behavior, redefining how enemies would be programmed from then on.'
        ]
      },
      tetris: {
        title: 'Tetris (1984)',
        description: 'A synthesis of the creation, the complex copyright battle, the mechanics, and the profound technological and cultural impacts of Tetris, the game of Soviet origin that revolutionized the entertainment and computing industries.',
        console: 'Initially developed on the Electronika 60; massively popularized on the Game Boy and NES.',
        year: '1984',
        salesVolume: 'Over 520 million copies worldwide (including physical media and mobile downloads).',
        creators: 'Alexey Pajitnov',
        yearHighlight: '1984',
        yearDescription: 'Created on Electronika 60. Popularized via Game Boy and NES.',
        salesHighlight: '+520M',
        salesDescription: 'Copies, including physical media and mobile downloads.',
        creatorsHighlight: 'Alexey Pajitnov',
        creatorsDescription: 'Originally at the Soviet Academy of Sciences.',
        content: [
          '### History and Behind the Scenes',
          'Created in 1984 by Soviet engineer Alexey Pajitnov on the Electronika 60 computer, Tetris was born from its creator\'s fascination with mathematical puzzles, specifically pentominoes. By adapting the concept into blocks of four squares, the game quickly spread like a silent fever throughout the Soviet Union. The transition to the global market, however, triggered one of the most complex legal and licensing battles in video game history. The conflict involved businessman Robert Stein, the British company Mirrorsoft, Nintendo, and the Soviet state agency Elorg, operating under the strictness of communist bureaucracy in the midst of the Cold War. Through audacious negotiations led by Nikolai Belikov and Henk Rogers, Nintendo secured the rights, paving the way for its resounding success on the Game Boy handheld console. Pajitnov, who emigrated to the United States in 1991, only managed to regain control over the copyrights of his work in 1996, when he founded The Tetris Company.',
          '### The Game and Its Mechanics',
          'Tetris is a game of logical reasoning and quick reflexes focused on continuous spatial organization. The player must manipulate geometric pieces in free fall, known as Tetriminos, within a vertical rectangular matrix. Each of these pieces is made up of four joined blocks, taking on seven fundamental shapes (known by the letters I, J, L, O, S, T, and Z). The central objective is to move and rotate the pieces as they fall to form solid horizontal lines without leaving empty spaces. When a line is completed, it is eliminated from the matrix, granting points to the player and opening up space at the top. As the game progresses, the falling speed of the pieces gradually increases, raising the difficulty and requiring split-second decision-making to prevent the tower of blocks from reaching the upper limit of the screen, which ends the match.',
          '### Historical Impact on Video Games and Society',
          'Far beyond a simple pastime, Tetris broke geopolitical and demographic barriers. Released during years of tension, the title served as a form of cultural diplomacy, becoming the first Soviet software to be mass-consumed in the West, humanizing the country\'s image through entertainment. In the gaming industry, it pioneered what we now know as "casual games," introducing adults, women, and the elderly to the digital world due to its intuitive learning curve. Its success also gave rise to the "Tetris Effect," a phenomenon in which players report seeing the game\'s geometric patterns in everyday life or during sleep, becoming an object of study in neuroscience. Furthermore, the game\'s capacity for abstract organization and visual immersion has proven to have real therapeutic applications, being studied and used in the preventive treatment of Post-Traumatic Stress Disorder (PTSD) by blocking the fixation of intrusive mental images.',
          '### Impacts on Computing and Technological Advancements',
          'In the technological realm, Tetris acted as a practical laboratory for the refinement of hardware and software logic. The game popularized grid-based collision detection systems, distancing itself from the traditional pixel-based collisions of its time. In its conception, it demanded extreme precision by operating with instant piece locking, without any "lock delay", creating a punitive and direct interaction between command and graphical response. Furthermore, it utilized a random number generation grounded in pure mathematical probability, resulting in unforgiving statistical sequences that would later force the industry to rethink game balancing. As a hardware milestone, the title was the "killer app" that proved the commercial viability of liquid crystal displays (LCDs), forcing the industry to optimize refresh rates to mitigate visual trails (ghosting) and consolidating techniques such as indexed palettes and fill patterns (dithering) to circumvent color and bit-depth limitations in primitive systems.'
        ]
      },
      'mario-85': {
        title: 'Mario (1985)',
        description: 'A revolutionary platform game that introduced continuous side-scrolling and inertia-based physics, being primarily responsible for rescuing the video game industry from the 1983 crash and introducing interactive digital entertainment into millions of homes around the world.',
        console: 'Famicom / Nintendo Entertainment System (NES)',
        year: '1985',
        salesVolume: 'Over 40 million copies',
        creators: 'Shigeru Miyamoto and Takashi Tezuka',
        yearHighlight: '1985',
        yearDescription: 'Released for Famicom (Japan) and NES (North America).',
        salesHighlight: '+40M',
        salesDescription: 'Copies sold, one of the best-selling of all time.',
        creatorsHighlight: 'Miyamoto & Tezuka',
        creatorsDescription: 'Directed by Shigeru Miyamoto and Takashi Tezuka, at Nintendo.',
        content: [
          '### The History and Behind the Scenes',
          'The development of Super Mario Bros. took place in a challenging scenario for the digital entertainment industry, right after the great video game crash of 1983, which strongly contracted the North American market. Directed by Shigeru Miyamoto and Takashi Tezuka, the title was conceived to be the pinnacle of the team\'s experiences developing previous games like Excitebike and Kung Fu. Miyamoto envisioned a more colorful and grandiose project. Initially, the concept was not a conventional platform game, but rather an "athletic game" inspired by the *undōkai* — Japanese school sports events focused on circuits, jumps, and obstacles. To star in this adventure, Nintendo brought back the carpenter "Jumpman", who had already found success in Donkey Kong and the Mario Bros. arcade game.',
          '### The Game and its Dynamics',
          'Super Mario Bros. features a journey through 32 side-scrolling levels across the Mushroom Kingdom, where the player controls Mario (or his brother Luigi) with the goal of rescuing Princess Toadstool from King Koopa. The main mechanic is based on jumping, which serves both to overcome moving platforms and bottomless pits, and to defeat enemies like Goombas and Koopas. The gameplay is enhanced by collecting items that alter the character\'s attributes, such as the Super Mushroom, the Fire Flower, and the invincibility Star. The level design shines especially in how it teaches the mechanics: the famous World 1-1 acts as an organic tutorial, allowing the player to understand the software\'s logic, dangers, and rewards through their own experimentation and exploration.',
          '### Historical and Sociocultural Impact',
          'The impact of Super Mario Bros. transcends the impressive 40 million copies sold; it is credited as the main catalyst for the recovery of the Western console market. Alongside the NES, the game redefined the standard of quality and complexity that consumers could expect from home entertainment. Its success was so significant that, in the 1990s, Mario achieved the status of a pop icon, becoming more recognized by North American children than Mickey Mouse. On a societal level, the game and its console served as the first contact for countless families with interactive computing devices, helping to break down barriers of familiarity with technology and paving the way for the widespread adoption of personal computers.',
          '### Technological and Computational Advancements',
          'The title is a historical landmark in software optimization and computer engineering under extreme constraints. Running on the NES\'s 8-bit Ricoh 2A03 processor, the entire game was compressed into just 40 KB (32 KB for the code and 8 KB for the graphics), requiring it to be written entirely in Assembly language to ensure that the inertia physics, the enemy artificial intelligence, and Koji Kondo\'s iconic soundtrack ran simultaneously and without lag. To circumvent memory limitations and the cap of displaying about 25 simultaneous colors from a palette of 52, the developers employed brilliant techniques for reusing memory assets, such as using the exact same graphic sprite for the clouds and the bushes, differentiating them only by color. Furthermore, the adopted architecture made room for the use of expansion chips in the cartridges ("mappers"), allowing future titles to perform tasks that theoretically exceeded the console\'s native processing capabilities.'
        ]
      },
      'mario-64': {
        title: 'Mario 64 (1996)',
        description: 'A detailed analysis of Super Mario 64, detailing its development process, its fundamental gameplay mechanics, and the profound impact the work had on the video game industry, society, and the advancement of real-time computer graphics.',
        console: 'Nintendo 64',
        year: '1996',
        salesVolume: 'Approximately 11.91 million original units.',
        creators: 'Shigeru Miyamoto (Developed by Nintendo Entertainment Analysis & Development - EAD)',
        yearHighlight: '1996',
        yearDescription: 'Released for the Nintendo 64.',
        salesHighlight: '~12M',
        salesDescription: 'Cartridge units sold for the Nintendo 64.',
        creatorsHighlight: 'Shigeru Miyamoto',
        creatorsDescription: 'Nintendo Entertainment Analysis & Development (EAD).',
        content: [
          '### History and Backstage',
          'The idea of bringing Nintendo\'s mascot into the third dimension began to be conceived by producer and director Shigeru Miyamoto back in 1993, during the development of Star Fox. The Super Mario 64 project took about three years to be completed by the Nintendo EAD team, with one year dedicated exclusively to design and two years to programming and direct work. During this period, the team spent months perfecting Mario\'s movements in an empty virtual room before building any levels, focusing purely on the fun of movement; one of the first physics and animation tests involved catching a yellow rabbit, which was later included in the game as the character MIPS. Using the high-performance Nichimen N-World graphics software and featuring Koji Kondo\'s immersive soundtrack, the title was released as the flagship launch game for the Nintendo 64, alongside Pilotwings 64.',
          '### The Game and its Mechanics',
          'By abandoning the linear structure of two-dimensional obstacle courses, Super Mario 64 introduced a vast open world with multiple environments interconnected by a "hub world", the iconic Princess Peach\'s Castle. The central premise of rescuing the princess from the villain Bowser remains, but progression occurs through the free exploration of magical paintings that act as portals to other levels, where the player must collect the Power Stars. The title stands out for a broad and unprecedented move set for the time, allowing Mario to jump against walls, perform triple jumps, crawl, and dive. Furthermore, the game features dynamic sound design, where Koji Kondo\'s music adapts perfectly to the player\'s environment seamlessly, such as when transitioning from the surface to underwater.',
          '### Historical Impact on Video Games and Society',
          'Super Mario 64 is frequently considered the title that codified the rules of 3D games, directly influencing not only platform games but the entertainment industry as a whole. Before its release, the public was accustomed to restricted two-dimensional interfaces and navigation; by teaching millions of people to navigate freely in a three-dimensional space, controlling camera and depth, the game changed the digital spatial cognition of a generation. It consolidated the video game as an immersive experience based on exploration and multiple non-linear paths, establishing a standard of expectation that unfolded into modern 3D software, interactive maps, digital cinema, and, later, the virtual reality interfaces that society consumes today.',
          '### Impact on Computing and Technological Advancements',
          'Technologically, the game represented a milestone in the practical application of real-time computer graphics, made possible by Nintendo\'s partnership with Silicon Graphics (SGI) to create a 64-bit architecture in domestic hardware. This overcame the limitations of 32-bit competitors, processing complex polygons, vibrant colors without texture jitter, and using an efficient Z-buffer to calculate depth, preventing distant objects from being rendered incorrectly over closer ones. To optimize processing and maintain a stable frame rate, the game applied Level of Detail (LOD) concepts, simplifying polygonal models as they moved further from the camera. The greatest physical and interface revolution, however, was the analog stick with 360-degree pressure sensitivity combined with a dynamic virtual camera system (Lakitu). This combination robustly demonstrated how to apply vectors and spatial transformations to handle simplified physics and collisions in continuous environments.'
        ]
      },
    }
  },

  // ── Credits Screen ───────────────────────────────────────────────────────
  credits: {
    pageTitle: 'Credits',
    teamImageAlt: 'Development team photo placeholder',
    memberPhotoAlt: (name: string) => `Photo of ${name}`,
    // Team carousel roles — one string per member
    team: {
      deizielle: 'research, writing, content, image & video',
      joao:      'art direction, ux/ui, design, front end, video editing',
      pedro:     'script, recording & presentation',
    },
    aboutHeading: 'About the project',
    aboutText: [
      'This project was developed in collaboration with the Computer Museum of ICMC/USP (https://mc.icmc.usp.br/), with the purpose of bringing the general public closer to the fascinating universe of technology. Through an interactive website, we invite the community to explore the history of video games through five major milestones: Pong, Pac-Man, Tetris, Super Mario Bros. (1985), and Super Mario 64. Each of these titles was selected to illustrate the true technological and computing revolutions of their respective eras, showing how hardware and software challenges were overcome to bring these classics to life.',
      'The central objective of this initiative was to extend knowledge about computing and society beyond the university walls, translating complex concepts into a visual and interactive language that anyone could freely consume. By highlighting the deep cultural and social impact that these games had on the world, we seek to democratize access to science and inspire new generations. We thank the ICMC Museum and the entire team involved in the creation of this space for digital discovery and learning.'
    ],
    linksHeading: 'References',
    links: [
      {
        game: 'Pong',
        items: [
          { href: 'https://www.pong-story.com/arcade.htm', label: 'https://www.pong-story.com/arcade.htm' },
          { href: 'https://youtu.be/6QYNlPLzj90?si=CbMrhNg62xd-fOQW', label: 'https://youtu.be/6QYNlPLzj90?si=CbMrhNg62xd-fOQW' },
          { href: 'https://assets.mitmuseum.mit.edu/iiifimg3/69578643/full/!800,800/0/default.jpg?response-content-disposition=attachment%3B%20filename%3D69578643.jpg', label: 'https://assets.mitmuseum.mit.edu/iiifimg3/69578643/full/!800,800/0/default.jpg' },
          { href: 'https://youtu.be/fiShX2pTz9A?si=3AZbPRLeGHiGzwp0', label: 'https://youtu.be/fiShX2pTz9A?si=3AZbPRLeGHiGzwp0' },
          { href: 'https://upload.wikimedia.org/wikipedia/commons/3/32/Signed_Pong_Cabinet.jpg', label: 'https://upload.wikimedia.org/wikipedia/commons/3/32/Signed_Pong_Cabinet.jpg' },
        ],
      },
      {
        game: 'Pac-Man',
        items: [
          { href: 'https://en-wikipedia-org.translate.goog/wiki/Pac-Man?_x_tr_sl=en&_x_tr_tl=pt&_x_tr_hl=pt&_x_tr_pto=tc', label: 'https://en-wikipedia-org.translate.goog/wiki/Pac-Man' },
          { href: 'https://pacman-fandom-com.translate.goog/wiki/Map_256_Glitch?_x_tr_sl=en&_x_tr_tl=pt&_x_tr_hl=pt&_x_tr_pto=tc', label: 'https://pacman-fandom-com.translate.goog/wiki/Map_256_Glitch' },
          { href: 'https://jovemnerd.com.br/noticias/games/pac-man-inteligencia-artificial-entenda', label: 'https://jovemnerd.com.br/noticias/games/pac-man-inteligencia-artificial-entenda' },
          { href: 'https://youtu.be/-CbyAk3Sn9I?si=7VU1DCFNqwsCD4rE', label: 'https://youtu.be/-CbyAk3Sn9I?si=7VU1DCFNqwsCD4rE' },
          { href: 'https://static.wikia.nocookie.net/villains/images/3/3b/Pacman_ghosts.png/revision/latest?cb=20251031210849', label: 'https://static.wikia.nocookie.net/villains/images/3/3b/Pacman_ghosts.png' },
          { href: 'https://static.wikia.nocookie.net/pacman/images/8/8d/Pacman-merch-top.jpg/revision/latest?cb=20240531165728', label: 'https://static.wikia.nocookie.net/pacman/images/8/8d/Pacman-merch-top.jpg' },
        ],
      },
      {
        game: 'Tetris',
        items: [
          { href: 'https://asmetro.org.br/portalsn/2023/05/01/tetris-a-dramatica-historia-de-como-o-maior-jogo-de-todos-os-tempos-foi-criado-e-deixou-a-uniao-sovietica/', label: 'https://asmetro.org.br/portalsn/2023/05/01/tetris-a-dramatica-historia…' },
          { href: 'https://tetris.com/news/the-history-of-tetris', label: 'https://tetris.com/news/the-history-of-tetris' },
          { href: 'https://pt.wikipedia.org/wiki/Tetris', label: 'https://pt.wikipedia.org/wiki/Tetris' },
          { href: 'https://www.historiadomundo.com.br/idade-contemporanea/origem-do-tetris.htm', label: 'https://www.historiadomundo.com.br/idade-contemporanea/origem-do-tetris.htm' },
          { href: 'https://www.bbc.com/portuguese/articles/cekdg02gxv0o', label: 'https://www.bbc.com/portuguese/articles/cekdg02gxv0o' },
          { href: 'https://www.psichi.org/blogpost/987366/511159/Stacking-Up-Thoughts-The-Tetris-Effect-and-Our-Brains', label: 'https://www.psichi.org/blogpost/987366/511159/Stacking-Up-Thoughts-The-Tetris-Effect-and-Our-Brains' },
          { href: 'https://aleadedu.medium.com/o-efeito-tetris-203b532cfe4b', label: 'https://aleadedu.medium.com/o-efeito-tetris-203b532cfe4b' },
          { href: 'https://youtube.com/shorts/z6nlLi1hQF0?si=zR4mDcZfNq20qkBe', label: 'https://youtube.com/shorts/z6nlLi1hQF0?si=zR4mDcZfNq20qkBe' },
          { href: 'https://www.reddit.com/media?url=https%3A%2F%2Fpreview.redd.it%2Falexey-pajitnov-inventor-of-tetris-1990-v0-icw43uknerk71.jpg%3Fwidth%3D640%26crop%3Dsmart%26auto%3Dwebp%26s%3D0f6ac303ba4b4fcf4d49448885e2790b9846aacc', label: 'https://www.reddit.com/media (Alexey Pajitnov photo)' },
          { href: 'https://youtube.com/shorts/K9uM4WSAxxA?si=XtRs6n1sUH3t_146', label: 'https://youtube.com/shorts/K9uM4WSAxxA?si=XtRs6n1sUH3t_146' },
        ],
      },
      {
        game: 'Super Mario Bros.',
        items: [
          { href: 'https://www.terra.com.br/gameon/plataformas-e-consoles/40-anos-de-super-mario-bros-o-jogo-que-salvou-a-industria-dos-videogames,3e0f147ae7443d20b68ddead62698d16jonxltqi.html', label: 'https://www.terra.com.br/gameon/… (40 anos de Super Mario Bros.)' },
          { href: 'https://pt.wikipedia.org/wiki/Crise_dos_jogos_eletr%C3%B4nicos_de_1983', label: 'https://pt.wikipedia.org/wiki/Crise_dos_jogos_eletrônicos_de_1983' },
          { href: 'https://pt.wikipedia.org/wiki/Jogo_eletr%C3%B4nico_de_rolagem_lateral', label: 'https://pt.wikipedia.org/wiki/Jogo_eletrônico_de_rolagem_lateral' },
          { href: 'https://br.ign.com/super-mario-bros/145986/feature/shigeru-miyamoto-conta-segredos-sobre-a-criacao-da-fase-1-1-de-super-mario-bros', label: 'https://br.ign.com/super-mario-bros/145986/feature/shigeru-miyamoto-conta-segredos…' },
          { href: 'https://youtu.be/EhLY-KgAhWY?si=3DhBJo6u-AQtocCO', label: 'https://youtu.be/EhLY-KgAhWY?si=3DhBJo6u-AQtocCO' },
          { href: 'https://static.wikia.nocookie.net/nintendo/images/5/58/Super_Mario_Bros.png/revision/latest?cb=20170730194148&path-prefix=pt-br', label: 'https://static.wikia.nocookie.net/nintendo/images/5/58/Super_Mario_Bros.png' },
          { href: 'https://youtu.be/oWyMk-2aH9E?si=BKrbSpvDL4Wcz-5O', label: 'https://youtu.be/oWyMk-2aH9E?si=BKrbSpvDL4Wcz-5O' },
          { href: 'https://youtu.be/-avspZlbOWU?si=4CM2bqEFwwm0cBs9', label: 'https://youtu.be/-avspZlbOWU?si=4CM2bqEFwwm0cBs9' },
          { href: 'https://hips.hearstapps.com/hmg-prod/images/80298bde-6d37-4145-8898-5f5aceed239d.jpeg?crop=0.889xw:1xh;0.056xw,0xh', label: 'https://hips.hearstapps.com/hmg-prod/images/80298bde…' },
        ],
      },
      {
        game: 'Super Mario 64',
        items: [
          { href: 'https://pt.wikipedia.org/wiki/Super_Mario_64', label: 'https://pt.wikipedia.org/wiki/Super_Mario_64' },
          { href: 'https://www.mariowiki.com/Super_Mario_64', label: 'https://www.mariowiki.com/Super_Mario_64' },
          { href: 'https://www.youtube.com/watch?v=kO7d9opl2u8', label: 'https://www.youtube.com/watch?v=kO7d9opl2u8' },
          { href: 'https://youtu.be/KVnhgyZN-wE?si=T2tbT4dzR6EqsMLc', label: 'https://youtu.be/KVnhgyZN-wE?si=T2tbT4dzR6EqsMLc' },
          { href: 'https://youtu.be/KVnhgyZN-wE?si=i8Ql-p7CH0ZpB5IK', label: 'https://youtu.be/KVnhgyZN-wE?si=i8Ql-p7CH0ZpB5IK' },
          { href: 'https://youtube.com/shorts/h1mdEOvZb80?si=3LUe79RLYIONwHfD', label: 'https://youtube.com/shorts/h1mdEOvZb80?si=3LUe79RLYIONwHfD' },
          { href: 'https://www.bojoga.com.br/files/2010/01/super-mario-64-screenshot-lakitu-cameraman-big.jpg', label: 'https://www.bojoga.com.br/files/2010/01/super-mario-64-screenshot-lakitu-cameraman-big.jpg' },
          { href: 'https://youtube.com/shorts/PriusTHmotA?si=N9tQbs-H5sprZhCJ', label: 'https://youtube.com/shorts/PriusTHmotA?si=N9tQbs-H5sprZhCJ' },
        ],
      },
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
