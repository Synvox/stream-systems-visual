import { createCanvasVisualPage } from '../components/canvas-visual-page'
import { readAuroraParams } from '../config/aurora-params'
import { createAurora, drawAurora, resizeAurora, stepAurora } from '../visualizations/aurora/aurora'

export const AuroraVisualPage = createCanvasVisualPage({
  routeId: 'aurora',
  readParams: readAuroraParams,
  datasetVisual: 'aurora',
  create: createAurora,
  resize: resizeAurora,
  step: stepAurora,
  draw: drawAurora,
})
