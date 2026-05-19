import { createVisualParamsReader, paramsFromPartial } from './create-visual-params'

export { paramsFromPartial }
export const readMeshParams = createVisualParamsReader({ seed: 19, density: 0.5, speed: 1 })
