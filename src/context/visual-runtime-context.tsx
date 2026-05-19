import { createContext, useContext, type ReactNode } from 'react'

export type VisualRuntimeValue = {
  suppressNavigation: boolean
}

const VisualRuntimeContext = createContext<VisualRuntimeValue>({
  suppressNavigation: false,
})

export function VisualRuntimeProvider({
  suppressNavigation,
  children,
}: {
  suppressNavigation: boolean
  children: ReactNode
}) {
  return (
    <VisualRuntimeContext.Provider value={{ suppressNavigation }}>
      {children}
    </VisualRuntimeContext.Provider>
  )
}

export function useVisualRuntime() {
  return useContext(VisualRuntimeContext)
}
