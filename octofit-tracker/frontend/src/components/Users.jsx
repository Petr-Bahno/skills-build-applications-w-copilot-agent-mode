import CollectionPage from './CollectionPage.jsx'
import { fetchCollection as fetch } from '../api.js'

const fetchUsers = ({ signal }) => fetch('/api/users/', { signal })

export default function Users() {
  return (
    <CollectionPage title="Users" load={fetchUsers}>
      {(user) => (
        <article className="card h-100">
          <div className="card-body">
            <h2 className="h5">{user.name ?? user.username ?? 'OctoFit member'}</h2>
            <p className="text-secondary mb-1">{user.email ?? 'Email not provided'}</p>
            <p className="mb-0">
              {user.team?.name ? `${user.team.name} · ` : ''}
              {user.points ?? 0} points
            </p>
          </div>
        </article>
      )}
    </CollectionPage>
  )
}
