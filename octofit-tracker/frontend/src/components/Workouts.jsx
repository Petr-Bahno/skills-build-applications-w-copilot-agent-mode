import CollectionPage from './CollectionPage.jsx'
import { fetchCollection as fetch } from '../api.js'

const fetchWorkouts = ({ signal }) => fetch('/api/workouts/', { signal })

export default function Workouts() {
  return (
    <CollectionPage title="Workouts" load={fetchWorkouts}>
      {(workout) => (
        <article className="card h-100">
          <div className="card-body">
            <h2 className="h5">{workout.title ?? 'Workout'}</h2>
            <p className="text-secondary">{workout.description ?? 'Suggested workout'}</p>
            <p className="mb-0 text-capitalize">
              {workout.activityType ?? 'fitness'} · {workout.durationMinutes ?? 'Flexible'} minutes ·{' '}
              {workout.difficulty ?? 'all levels'}
            </p>
          </div>
        </article>
      )}
    </CollectionPage>
  )
}
