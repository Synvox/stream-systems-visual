import {
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from 'react'
import { VisualRuntimeProvider } from '../context/visual-runtime-context'
import { visualizationPagesById } from '../routes'
import { visualizationRouteConfigs } from '../routes/route-config'

const CROSSFADE_MS = 3200

type LayerPhase = 'shown' | 'outgoing' | 'incoming'

type ActiveLayer = {
  visualIndex: number
  phase: LayerPhase
}

type SlotId = 'a' | 'b'

function pickRandomIndex(current: number, length: number) {
  if (length <= 1) return 0
  let next = current
  while (next === current) {
    next = Math.floor(Math.random() * length)
  }
  return next
}

function phaseClass(phase: LayerPhase) {
  if (phase === 'shown') return 'visual-cycle__layer visual-cycle__layer--shown'
  if (phase === 'outgoing') return 'visual-cycle__layer visual-cycle__layer--outgoing'
  return 'visual-cycle__layer visual-cycle__layer--incoming'
}

function VisualLayer({ visualIndex }: { visualIndex: number }) {
  const config = visualizationRouteConfigs[visualIndex]
  const Page = visualizationPagesById[config.id as keyof typeof visualizationPagesById]

  return (
    <VisualRuntimeProvider suppressNavigation>
      <Suspense fallback={null}>
        <Page />
      </Suspense>
    </VisualRuntimeProvider>
  )
}

function CycleSlot({
  slotId,
  layer,
}: {
  slotId: SlotId
  layer: ActiveLayer | null
}) {
  if (!layer) return null

  return (
    <div
      data-slot={slotId}
      className={phaseClass(layer.phase)}
      aria-hidden={layer.phase !== 'shown'}
    >
      <VisualLayer visualIndex={layer.visualIndex} />
    </div>
  )
}

export function VisualCycle({
  intervalSec,
  randomOrder = false,
}: {
  intervalSec: number
  randomOrder?: boolean
}) {
  const count = visualizationRouteConfigs.length
  const [slots, setSlots] = useState<{ a: ActiveLayer | null, b: ActiveLayer | null }>(() => ({
    a: {
      visualIndex: randomOrder ? Math.floor(Math.random() * count) : 0,
      phase: 'shown',
    },
    b: null,
  }))
  const frontSlotRef = useRef<SlotId>('a')
  const transitioningRef = useRef(false)

  const advance = useCallback(() => {
    if (transitioningRef.current) return
    transitioningRef.current = true

    const front = frontSlotRef.current
    const back: SlotId = front === 'a' ? 'b' : 'a'

    setSlots(prev => {
      const frontLayer = prev[front]
      if (!frontLayer) return prev

      const nextIndex = randomOrder
        ? pickRandomIndex(frontLayer.visualIndex, count)
        : (frontLayer.visualIndex + 1) % count

      window.setTimeout(() => {
        setSlots({
          a: back === 'a' ? { visualIndex: nextIndex, phase: 'shown' } : null,
          b: back === 'b' ? { visualIndex: nextIndex, phase: 'shown' } : null,
        })
        frontSlotRef.current = back
        transitioningRef.current = false
      }, CROSSFADE_MS)

      return {
        a:
          front === 'a'
            ? { ...frontLayer, phase: 'outgoing' }
            : { visualIndex: nextIndex, phase: 'incoming' },
        b:
          front === 'b'
            ? { ...frontLayer, phase: 'outgoing' }
            : { visualIndex: nextIndex, phase: 'incoming' },
      }
    })
  }, [count, randomOrder])

  useEffect(() => {
    const ms = intervalSec * 1000
    const id = window.setInterval(advance, ms)
    return () => window.clearInterval(id)
  }, [advance, intervalSec])

  return (
    <div
      className="visual-cycle"
      style={
        { '--visual-crossfade-duration': `${CROSSFADE_MS}ms` } as CSSProperties
      }
    >
      <CycleSlot slotId="a" layer={slots.a} />
      <CycleSlot slotId="b" layer={slots.b} />
    </div>
  )
}
