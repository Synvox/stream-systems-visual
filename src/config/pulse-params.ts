import { createVisualParamsReader, paramsFromPartial } from './create-visual-params'

export { paramsFromPartial }
export const readPulseParams = createVisualParamsReader({ seed: 41, density: 0.5, speed: 1 })
