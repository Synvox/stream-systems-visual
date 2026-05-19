import { createVisualParamsReader, paramsFromPartial } from './create-visual-params'

export { paramsFromPartial }
export const readWeaveParams = createVisualParamsReader({ seed: 37, density: 0.5, speed: 1 })
