import { createVisualParamsReader, paramsFromPartial } from './create-visual-params'

export { paramsFromPartial }
export const readVoidParams = createVisualParamsReader({ seed: 29, density: 0.5, speed: 1 })
