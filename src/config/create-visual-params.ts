import { paramsFromPartial, readParamsFromSearch, type VisualParams } from './params'

export function createVisualParamsReader(defaults: {
  seed: number
  density: number
  speed: number
}) {
  return function readVisualParams(search: string): VisualParams {
    const q = new URLSearchParams(search)
    const params = readParamsFromSearch(search)
    if (!q.has('density')) params.density = defaults.density
    if (!q.has('speed')) params.speed = defaults.speed
    if (!q.has('seed')) params.seed = defaults.seed
    return params
  }
}

export { paramsFromPartial }
