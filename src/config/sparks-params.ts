import { createVisualParamsReader, paramsFromPartial } from './create-visual-params'

export { paramsFromPartial }
export const readSparksParams = createVisualParamsReader({ seed: 61, density: 0.5, speed: 1 })
