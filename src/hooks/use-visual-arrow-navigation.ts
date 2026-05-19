import { useEffect } from 'react'
import { useVisualRuntime } from '../context/visual-runtime-context'
import { useNavigationPath } from './use-navigation-path'
import { navigateTo } from '../navigation/navigation-api'
import { visualizationRouteConfigs } from '../routes/route-config'

function routeIndex(pathname: string) {
  const normalized = pathname.replace(/\/+$/, '') || '/'
  return visualizationRouteConfigs.findIndex(r => r.path === normalized)
}

/**
 * Arrow keys move between visuals in route-config order.
 * Right/Down → next, Left/Up → previous. Preserves the current query string.
 */
export function useVisualArrowNavigation() {
  const { pathname } = useNavigationPath()
  const { suppressNavigation } = useVisualRuntime()

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (suppressNavigation) return
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return

      const delta =
        e.key === 'ArrowRight' || e.key === 'ArrowDown'
          ? 1
          : e.key === 'ArrowLeft' || e.key === 'ArrowUp'
            ? -1
            : 0
      if (delta === 0) return

      const idx = routeIndex(pathname)
      if (idx < 0) return

      e.preventDefault()
      const count = visualizationRouteConfigs.length
      const next = visualizationRouteConfigs[(idx + delta + count) % count]
      void navigateTo(next.path, window.location.search)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [pathname, suppressNavigation])
}

export function VisualArrowNavigation() {
  useVisualArrowNavigation()
  return null
}
