import CollectionPage from './CollectionPage.jsx'
import { fetchCollection as fetch } from '../api.js'

const fetchActivities = ({ signal }) => fetch('/api/activities/', { signal })

export default function Activities() {
  return (
    <CollectionPage title="Activities" load={fetchActivities}>
      {(activity) => (
        <article className="card h-100">
          <div className="card-body">
            <h2 className="h5 text-capitalize">{activity.activityType ?? 'Activity'}</h2>
            <p className="mb-1">
              {activity.user?.name ?? activity.user?.username ?? 'OctoFit member'}
            </p>
            <p className="text-secondary mb-1">
              {activity.durationMinutes} minutes
              {activity.distanceKm != null ? ` · ${activity.distanceKm} km` : ''}
            </p>
            <p className="small text-secondary mb-0">
              {activity.completedAt
                ? new Date(activity.completedAt).toLocaleDateString()
                : 'Date not provided'}
              {activity.points != null ? ` · ${activity.points} points` : ''}
            </p>
          </div>
        </article>
      )}
    </CollectionPage>
  )
}
