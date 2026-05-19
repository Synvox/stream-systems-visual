import { paramsFromPartial, readParamsFromSearch, type VisualParams } from './params'

export { paramsFromPartial }

const auroraDefaults = {
  density: 0.5,
  speed: 1,
}

function randomSeed() {
  return Math.floor(Math.random() * 2147483646) + 1
}

export function readAuroraParams(search: string): VisualParams {
  const q = new URLSearchParams(search)
  const params = readParamsFromSearch(search)
  if (!q.has('density')) params.density = auroraDefaults.density
  if (!q.has('speed')) params.speed = auroraDefaults.speed
  if (!q.has('seed')) params.seed = randomSeed()
  return params
}
