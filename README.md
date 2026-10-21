# Beautiful Game History

An interactive website that tells the history of video games through five milestones: Pong, Pac-Man, Tetris, Super Mario Bros. (1985) and Super Mario 64. Each one marks a jump in hardware or software, and the site explains how those problems were solved.

Built with the Computer Museum of ICMC-USP (https://mc.icmc.usp.br/) to bring computing history to the general public, outside the university.

**Live site: [historyofvideogames.nonotre.com](https://historyofvideogames.nonotre.com)**

## How it works

- **Keyboard first.** Arrow keys or WASD scroll and move; Space or Enter act as the main button. The mouse works too.
- **Text that types itself.** Each game's story appears character by character as you scroll, like an old console screen.
- **One theme per game.** Colors come in two layers of tokens: a raw palette for each game, and semantic tokens that the components read. Switching games swaps the palette without touching the components. Each game also has its own cursor.
- **Back remembers where you came from.** The header's Back button returns to the exact screen you left, not just the previous page in the sequence.
- **Portuguese and English**, switchable at any time.

## Stack

Next.js (App Router), React, TypeScript, Tailwind CSS, Radix UI and Zustand for navigation and language state.

## Team

A three-person project at ICMC-USP.

- **Deizielle Klemp**: research, writing, content, image and video.
- **João Pedro Oliveira**: art direction, UX/UI design, front end and video editing.
- **Pedro Sarni**: script, recording, presentation, research and image.

## Running locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

Game names, logos and sounds belong to their owners and are used here for educational purposes.
