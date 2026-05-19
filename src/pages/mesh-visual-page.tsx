import { createCanvasVisualPage } from '../components/canvas-visual-page'
import { readMeshParams } from '../config/mesh-params'
import { createMesh, drawMesh, resizeMesh, stepMesh } from '../visualizations/mesh/mesh'

export const MeshVisualPage = createCanvasVisualPage({
  routeId: 'mesh',
  readParams: readMeshParams,
  datasetVisual: 'mesh',
  create: createMesh,
  resize: resizeMesh,
  step: stepMesh,
  draw: drawMesh,
})
