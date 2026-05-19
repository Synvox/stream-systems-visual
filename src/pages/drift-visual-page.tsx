import { createCanvasVisualPage } from '../components/canvas-visual-page'
import { readDriftParams } from '../config/drift-params'
import { createDrift, drawDrift, resizeDrift, stepDrift } from '../visualizations/drift/drift'

export const DriftVisualPage = createCanvasVisualPage({
  routeId: 'drift',
  readParams: readDriftParams,
  datasetVisual: 'drift',
  create: createDrift,
  resize: resizeDrift,
  step: stepDrift,
  draw: drawDrift,
})
