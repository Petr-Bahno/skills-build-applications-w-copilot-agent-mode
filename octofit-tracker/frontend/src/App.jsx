import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import logo from '../../../docs/octofitapp-small.png'
import './App.css'

const navigation = [
  { label: 'Activities', path: '/activities' },
  { label: 'Leaderboard', path: '/leaderboard' },
  { label: 'Teams', path: '/teams' },
  { label: 'Users', path: '/users' },
  { label: 'Workouts', path: '/workouts' },
]

function Dashboard() {
  return (
    <main className="container py-5">
      <p className="text-uppercase fw-semibold small text-success mb-2">Move together</p>
      <h1 className="display-5 fw-bold">Your fitness, in one place.</h1>
      <p className="lead text-secondary mb-4">
        Track activity, cheer on your team, and find your next workout.
      </p>
      <div className="row g-3">
        {navigation.map(({ label, path }) => (
          <div className="col-sm-6 col-lg-4" key={path}>
            <NavLink className="dashboard-link card card-body h-100 text-decoration-none" to={path}>
              <span className="h5 text-body mb-1">{label}</span>
              <span className="text-secondary">Explore {label.toLowerCase()}</span>
            </NavLink>
          </div>
        ))}
      </div>
    </main>
  )
}

function NotFound() {
  return (
    <main className="container py-5">
      <h1 className="h2">Page not found</h1>
      <NavLink to="/">Return to dashboard</NavLink>
    </main>
  )
}

export default function App() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-white border-bottom">
        <div className="container">
          <NavLink className="navbar-brand d-flex align-items-center gap-2 fw-semibold" to="/">
            <img className="brand-logo" src={logo} alt="" />
            OctoFit Tracker
          </NavLink>
          <div className="navbar-nav flex-row flex-wrap gap-2 gap-lg-3">
            {navigation.map(({ label, path }) => (
              <NavLink
                className={({ isActive }) => `nav-link${isActive ? ' active fw-semibold' : ''}`}
                key={path}
                to={path}
              >
                {label}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/users" element={<Users />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}
