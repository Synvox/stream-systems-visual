import { createVisualParamsReader, paramsFromPartial } from './create-visual-params'

export { paramsFromPartial }
export const readCascadeParams = createVisualParamsReader({ seed: 13, density: 0.5, speed: 1 })
