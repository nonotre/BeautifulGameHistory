/**
 * navigationStore — in-memory route history stack.
 * Never persisted to localStorage / sessionStorage.
 *
 * Usage in Client Components:
 *   const pushRoute = useNavigationStore((s) => s.pushRoute)
 *   const popRoute  = useNavigationStore((s) => s.popRoute)
 */
import { create } from 'zustand'

interface NavigationState {
  /** LIFO stack of routes visited. */
  history: string[]
  /** Most recently pushed route (derived from history tail). */
  currentRoute: string
  /** Flag: when true, StartScreen auto-opens the games submenu. */
  showGamesSubmenu: boolean
  /** Push the current route onto the stack before navigating away. */
  pushRoute: (route: string) => void
  /** Pop the top of the stack, returning the destination route. Returns null when stack is empty. */
  popRoute: () => string | null
  /** Activate the games submenu on the Start Screen. */
  openGamesSubmenu: () => void
  /** Deactivate the games submenu flag (called once consumed). */
  closeGamesSubmenu: () => void
}

export const useNavigationStore = create<NavigationState>()((set, get) => ({
  history: [],
  currentRoute: '/',
  showGamesSubmenu: false,

  pushRoute(route) {
    set((state) => ({
      history: [...state.history, route],
      currentRoute: route,
    }))
  },

  popRoute() {
    const { history } = get()
    if (history.length === 0) return null
    const next = [...history]
    const destination = next.pop() ?? null
    set({ history: next, currentRoute: destination ?? '/' })
    return destination
  },

  openGamesSubmenu() {
    set({ showGamesSubmenu: true })
  },

  closeGamesSubmenu() {
    set({ showGamesSubmenu: false })
  },
}))
