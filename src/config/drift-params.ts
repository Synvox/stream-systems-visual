import { createVisualParamsReader, paramsFromPartial } from './create-visual-params'

export { paramsFromPartial }
export const readDriftParams = createVisualParamsReader({ seed: 67, density: 0.5, speed: 1 })
