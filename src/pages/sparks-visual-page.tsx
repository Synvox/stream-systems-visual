import { createCanvasVisualPage } from '../components/canvas-visual-page'
import { readSparksParams } from '../config/sparks-params'
import { createSparks, drawSparks, resizeSparks, stepSparks } from '../visualizations/sparks/sparks'

export const SparksVisualPage = createCanvasVisualPage({
  routeId: 'sparks',
  readParams: readSparksParams,
  datasetVisual: 'sparks',
  create: createSparks,
  resize: resizeSparks,
  step: stepSparks,
  draw: drawSparks,
})
