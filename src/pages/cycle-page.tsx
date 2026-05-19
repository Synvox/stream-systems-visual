import { VisualCycle } from '../components/visual-cycle'
import { readCycleInterval, useNavigationSearch } from '../hooks/use-navigation-search'

/** Full-screen random visual rotation — primary OBS entry point. */
export function CyclePage() {
  const search = useNavigationSearch()
  const intervalSec = readCycleInterval(search)

  return <VisualCycle intervalSec={intervalSec} randomOrder />
}
