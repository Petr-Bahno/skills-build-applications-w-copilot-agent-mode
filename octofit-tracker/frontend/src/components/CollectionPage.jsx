import { useEffect, useState } from 'react'

export default function CollectionPage({ title, load, children }) {
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    load({ signal: controller.signal })
      .then(setRecords)
      .catch((requestError) => {
        if (requestError.name !== 'AbortError') {
          setError(requestError.message)
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      })

    return () => controller.abort()
  }, [load])

  return (
    <main className="container py-5">
      <div className="mb-4">
        <p className="text-uppercase fw-semibold small text-success mb-2">OctoFit Tracker</p>
        <h1 className="display-6 fw-bold">{title}</h1>
      </div>
      {loading && <p role="status">Loading {title.toLowerCase()}…</p>}
      {error && (
        <div className="alert alert-danger" role="alert">
          Could not load {title.toLowerCase()}: {error}
        </div>
      )}
      {!loading && !error && records.length === 0 && (
        <p className="text-secondary">No {title.toLowerCase()} to show yet.</p>
      )}
      {!loading && !error && records.length > 0 && (
        <div className="row g-3">
          {records.map((record, index) => (
            <div className="col-md-6 col-xl-4" key={record._id ?? record.id ?? index}>
              {children(record)}
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
