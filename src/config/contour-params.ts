import { createVisualParamsReader, paramsFromPartial } from './create-visual-params'

export { paramsFromPartial }
export const readContourParams = createVisualParamsReader({ seed: 71, density: 0.5, speed: 1 })
