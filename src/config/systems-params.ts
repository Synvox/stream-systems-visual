import { readParamsFromSearch, type VisualParams } from './params'

function randomSeed() {
  return Math.floor(Math.random() * 2147483646) + 1
}

export function readSystemsParams(search: string): VisualParams {
  const q = new URLSearchParams(search)
  const params = readParamsFromSearch(search)
  if (!q.has('seed')) params.seed = randomSeed()
  return params
}

/** Omit seed from the URL unless the layout was opened or pinned with ?seed=. */
export function writeSystemsParamsToSearch(
  params: VisualParams,
  pathname: string,
  includeSeed: boolean,
) {
  const q = new URLSearchParams()
  if (includeSeed) q.set('seed', String(params.seed))
  q.set('density', String(params.density))
  q.set('speed', String(params.speed))
  if (params.title) q.set('title', params.title)
  if (params.subtitle) q.set('subtitle', params.subtitle)
  if (params.startingSoon) q.set('startingSoon', params.startingSoon)
  const query = q.toString()
  return query ? `${pathname}?${query}` : pathname
}
