import { Link, Route, Routes } from 'react-router-dom'

function Dashboard() {
  return (
    <main className="container py-5">
      <p className="text-uppercase fw-semibold small text-success mb-2">OctoFit Tracker</p>
      <h1 className="display-5 fw-semibold">Dashboard</h1>
      <p className="lead text-secondary">Your training overview</p>
    </main>
  )
}

function NotFound() {
  return (
    <main className="container py-5">
      <h1 className="h2">Page not found</h1>
      <Link to="/">Return to dashboard</Link>
    </main>
  )
}

function App() {
  return (
    <>
      <nav className="navbar bg-white border-bottom">
        <div className="container">
          <Link className="navbar-brand fw-semibold" to="/">
            OctoFit Tracker
          </Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
