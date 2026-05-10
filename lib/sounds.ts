/**
 * sounds.ts — Module-level audio singleton.
 *
 * Audio objects live outside React's lifecycle so they are NEVER destroyed
 * by page navigation. Calling playHover() / playConfirm() from any client
 * component is safe regardless of which route is active.
 *
 * Rules followed:
 * - Guard with `typeof window !== 'undefined'` so the module can be imported
 *   in server contexts without crashing (Next.js SSR / RSC evaluation).
 * - `Audio` is lazy-initialised on first call, not at module load time.
 */

let hoverAudio: HTMLAudioElement | null = null
let confirmAudio: HTMLAudioElement | null = null

function getHoverAudio(): HTMLAudioElement | null {
  if (typeof window === 'undefined') return null
  if (!hoverAudio) {
    hoverAudio = new Audio('/sounds/jump.wav')
    hoverAudio.volume = 0.5
  }
  return hoverAudio
}

function getConfirmAudio(): HTMLAudioElement | null {
  if (typeof window === 'undefined') return null
  if (!confirmAudio) {
    confirmAudio = new Audio('/sounds/confirm.wav')
    confirmAudio.volume = 0.7
  }
  return confirmAudio
}

/**
 * Play the hover sound.
 * Restarts from the beginning each time so rapid hover events always produce
 * a fresh click. Never throws — audio errors are silently swallowed.
 */
export function playHover(): void {
  const audio = getHoverAudio()
  if (!audio) return
  try {
    audio.currentTime = 0
    audio.play().catch(() => {
      // Autoplay policy may block first interaction — ignore silently.
    })
  } catch {
    // Ignore any synchronous errors (e.g. unsupported codec).
  }
}

/**
 * Play the confirm / click sound.
 * Navigation does NOT wait for this — call it fire-and-forget.
 */
export function playConfirm(): void {
  const audio = getConfirmAudio()
  if (!audio) return
  try {
    audio.currentTime = 0
    audio.play().catch(() => {
      // Autoplay policy may block first interaction — ignore silently.
    })
  } catch {
    // Ignore any synchronous errors.
  }
}
