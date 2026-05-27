import { createContext, useContext, type ReactNode } from 'react'

export type VisualRuntimeValue = {
  suppressNavigation: boolean
  /** Route config id when mounted inside VisualCycle (pathname stays `/cycle`). */
  activeRouteId?: string
}

const VisualRuntimeContext = createContext<VisualRuntimeValue>({
  suppressNavigation: false,
})

export function VisualRuntimeProvider({
  suppressNavigation,
  activeRouteId,
  children,
}: {
  suppressNavigation: boolean
  activeRouteId?: string
  children: ReactNode
}) {
  return (
    <VisualRuntimeContext.Provider value={{ suppressNavigation, activeRouteId }}>
      {children}
    </VisualRuntimeContext.Provider>
  )
}

export function useVisualRuntime() {
  return useContext(VisualRuntimeContext)
}
