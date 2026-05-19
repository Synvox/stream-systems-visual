import { createCanvasVisualPage } from '../components/canvas-visual-page'
import { readPulseParams } from '../config/pulse-params'
import { createPulse, drawPulse, resizePulse, stepPulse } from '../visualizations/pulse/pulse'

export const PulseVisualPage = createCanvasVisualPage({
  routeId: 'pulse',
  readParams: readPulseParams,
  datasetVisual: 'pulse',
  create: createPulse,
  resize: resizePulse,
  step: stepPulse,
  draw: drawPulse,
})
