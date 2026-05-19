import { createCanvasVisualPage } from '../components/canvas-visual-page'
import { readVoidParams } from '../config/void-params'
import { createVoid, drawVoid, resizeVoid, stepVoid } from '../visualizations/void/void'

export const VoidVisualPage = createCanvasVisualPage({
  routeId: 'void',
  readParams: readVoidParams,
  datasetVisual: 'void',
  create: createVoid,
  resize: resizeVoid,
  step: stepVoid,
  draw: drawVoid,
})
