import { visualizationRouteConfigs, cyclePath } from '../routes/route-config'

export function HomePage() {
  return (
    <div className="home">
      <a href={`${cyclePath}?interval=10`} className="home__cycle">
        Cycle visuals
      </a>
      <ul className="home__list">
        {visualizationRouteConfigs.map((route, index) => (
          <li key={route.id}>
            <a
              href={route.path}
              className="home__tile"
              aria-label={route.ariaLabel}
            >
              <span className="home__tile-mark" data-index={index % 6} />
              <span className="home__tile-label">{route.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
