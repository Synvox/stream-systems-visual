import { createCanvasVisualPage } from '../components/canvas-visual-page'
import { readCascadeParams } from '../config/cascade-params'
import { createCascade, drawCascade, resizeCascade, stepCascade } from '../visualizations/cascade/cascade'

export const CascadeVisualPage = createCanvasVisualPage({
  routeId: 'cascade',
  readParams: readCascadeParams,
  datasetVisual: 'cascade',
  create: createCascade,
  resize: resizeCascade,
  step: stepCascade,
  draw: drawCascade,
})
