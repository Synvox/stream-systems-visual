import { createCanvasVisualPage } from '../components/canvas-visual-page'
import { readEmberParams } from '../config/ember-params'
import { createEmber, drawEmber, resizeEmber, stepEmber } from '../visualizations/ember/ember'

export const EmberVisualPage = createCanvasVisualPage({
  routeId: 'ember',
  readParams: readEmberParams,
  datasetVisual: 'ember',
  create: createEmber,
  resize: resizeEmber,
  step: stepEmber,
  draw: drawEmber,
})
