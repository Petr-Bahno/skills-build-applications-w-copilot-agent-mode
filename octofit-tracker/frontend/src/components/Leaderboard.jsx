import CollectionPage from './CollectionPage.jsx'
import { fetchCollection as fetch } from '../api.js'

const fetchLeaderboard = ({ signal }) => fetch('/api/leaderboard/', { signal })

export default function Leaderboard() {
  return (
    <CollectionPage title="Leaderboard" load={fetchLeaderboard}>
      {(entry) => (
        <article className="card h-100">
          <div className="card-body d-flex align-items-center gap-3">
            <span className="leaderboard-rank rounded-circle d-inline-flex align-items-center justify-content-center fw-bold">
              {entry.rank ?? '—'}
            </span>
            <div>
              <h2 className="h5 mb-1">
                {entry.user?.name ?? entry.user?.username ?? entry.team?.name ?? 'OctoFit member'}
              </h2>
              <p className="text-secondary mb-0">
                {entry.points ?? 0} points · {entry.period ?? 'all-time'}
              </p>
            </div>
          </div>
        </article>
      )}
    </CollectionPage>
  )
}
