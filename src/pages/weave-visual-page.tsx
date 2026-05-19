import { createCanvasVisualPage } from '../components/canvas-visual-page'
import { readWeaveParams } from '../config/weave-params'
import { createWeave, drawWeave, resizeWeave, stepWeave } from '../visualizations/weave/weave'

export const WeaveVisualPage = createCanvasVisualPage({
  routeId: 'weave',
  readParams: readWeaveParams,
  datasetVisual: 'weave',
  create: createWeave,
  resize: resizeWeave,
  step: stepWeave,
  draw: drawWeave,
})
