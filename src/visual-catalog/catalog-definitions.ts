import type { CatalogEngine, CatalogEntry } from './types'

const ENGINE_ARIA: Record<CatalogEngine, string> = {
  particles: 'flowing particle field',
  rings: 'expanding pulse rings',
  orbs: 'soft drifting light orbs',
  grid: 'interference grid waves',
  lines: 'woven sine line field',
  veils: 'vertical aurora veils',
  contours: 'drifting contour lines',
  stars: 'twinkling starfield',
  mesh: 'drifting connected mesh',
  spiral: 'rotating spiral particles',
  lissajous: 'harmonic curve tracer',
  pendulum: 'synchronized pendulum wave',
  hex: 'pulsing hexagonal grid',
  vortex: 'swirling particle vortex',
  bubbles: 'rising translucent bubbles',
  rain: 'diagonal rain streaks',
  fireflies: 'blinking firefly swarm',
  waves: 'layered horizontal wave bands',
  orbit: 'orbital body trails',
}

/** One entry per engine — skips families already covered by hand-tuned visuals. */
const CATALOG_SEEDS: {
  engine: CatalogEngine
  variant: number
  label: string
  palette: number
}[] = [
  { engine: 'spiral', variant: 2, label: 'Spiral Bloom', palette: 2 },
  { engine: 'lissajous', variant: 2, label: 'Figure Eight', palette: 4 },
  { engine: 'pendulum', variant: 0, label: 'Wave Sync', palette: 5 },
  { engine: 'hex', variant: 0, label: 'Hex Pulse', palette: 6 },
  { engine: 'vortex', variant: 2, label: 'Whirlpool', palette: 7 },
  { engine: 'bubbles', variant: 0, label: 'Bubble Rise', palette: 8 },
  { engine: 'rain', variant: 1, label: 'Storm Slant', palette: 9 },
  { engine: 'fireflies', variant: 0, label: 'Firefly Field', palette: 0 },
  { engine: 'orbit', variant: 0, label: 'Planet Dance', palette: 1 },
]

function slug(label: string) {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function buildCatalog(): CatalogEntry[] {
  return CATALOG_SEEDS.map(seed => {
    const id = slug(seed.label)
    return {
      id,
      path: `/v/${id}`,
      label: seed.label,
      ariaLabel: `${seed.label} — ${ENGINE_ARIA[seed.engine]}`,
      engine: seed.engine,
      variant: seed.variant,
      palette: seed.palette,
    }
  })
}

export const catalogDefinitions: CatalogEntry[] = buildCatalog()

export const catalogById = new Map(catalogDefinitions.map(e => [e.id, e]))
export const catalogByPath = new Map(catalogDefinitions.map(e => [e.path, e]))
