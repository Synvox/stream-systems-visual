import { createVisualParamsReader, paramsFromPartial } from './create-visual-params'

export { paramsFromPartial }
export const readEmberParams = createVisualParamsReader({ seed: 11, density: 0.5, speed: 1 })
