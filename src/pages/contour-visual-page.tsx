import { createCanvasVisualPage } from '../components/canvas-visual-page'
import { readContourParams } from '../config/contour-params'
import { createContour, drawContour, resizeContour, stepContour } from '../visualizations/contour/contour'

export const ContourVisualPage = createCanvasVisualPage({
  routeId: 'contour',
  readParams: readContourParams,
  datasetVisual: 'contour',
  create: createContour,
  resize: resizeContour,
  step: stepContour,
  draw: drawContour,
})
