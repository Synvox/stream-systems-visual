import { createCanvasVisualPage } from '../components/canvas-visual-page'
import { readSonarParams } from '../config/sonar-params'
import { createSonar, drawSonar, resizeSonar, stepSonar } from '../visualizations/sonar/sonar'

export const SonarVisualPage = createCanvasVisualPage({
  routeId: 'sonar',
  readParams: readSonarParams,
  datasetVisual: 'sonar',
  create: createSonar,
  resize: resizeSonar,
  step: stepSonar,
  draw: drawSonar,
})
