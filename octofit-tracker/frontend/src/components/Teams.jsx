import CollectionPage from './CollectionPage.jsx'
import { fetchCollection as fetch } from '../api.js'

const fetchTeams = ({ signal }) => fetch('/api/teams/', { signal })

export default function Teams() {
  return (
    <CollectionPage title="Teams" load={fetchTeams}>
      {(team) => (
        <article className="card h-100">
          <div className="card-body">
            <h2 className="h5">{team.name ?? 'OctoFit team'}</h2>
            <p className="text-secondary">
              {team.members?.length ?? 0} members · {team.points ?? 0} points
            </p>
            {team.members?.length > 0 && (
              <ul className="list-inline mb-0">
                {team.members.map((member, index) => (
                  <li className="list-inline-item badge text-bg-light" key={member._id ?? member.id ?? index}>
                    {member.name ?? member.username ?? 'Member'}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </article>
      )}
    </CollectionPage>
  )
}
