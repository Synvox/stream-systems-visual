import { useEffect, useState } from 'react'
import { cyclePath } from '../routes/route-config'
import { searchFromNavigation } from '../navigation/navigation-api'

export function useNavigationSearch() {
  const [search, setSearch] = useState(() => searchFromNavigation())

  useEffect(() => {
    function sync() {
      setSearch(searchFromNavigation())
    }
    const navigation = window.navigation
    if (!navigation) return
    navigation.addEventListener('currententrychange', sync)
    return () => navigation.removeEventListener('currententrychange', sync)
  }, [])

  return search
}

/** Seconds between visual changes (OBS: `?interval=10`). */
export function readCycleInterval(search: string) {
  const q = new URLSearchParams(search)
  const raw = q.get('interval') ?? q.get('seconds')
  const n = Number(raw)
  if (!Number.isFinite(n) || n <= 0) return 10
  return Math.min(120, Math.max(3, n))
}

export function readCycleOptions(search: string, pathname: string) {
  const active =
    pathname === cyclePath || new URLSearchParams(search).get('cycle') === '1'
  return { active, intervalSec: readCycleInterval(search) }
}
