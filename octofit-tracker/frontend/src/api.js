const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export async function fetchCollection(endpoint, { signal } = {}) {
  const response = await fetch(`${apiBaseUrl}${endpoint}`, { signal })
  if (!response.ok) {
    throw new Error(`Request for ${endpoint} failed with status ${response.status}`)
  }

  const payload = await response.json()
  if (Array.isArray(payload)) {
    return payload
  }

  if (payload && typeof payload === 'object') {
    const collection =
      payload.results ??
      payload.items ??
      payload.data?.results ??
      payload.data?.items ??
      payload.data
    if (Array.isArray(collection)) {
      return collection
    }
  }

  throw new Error(`Unexpected response format for ${endpoint}`)
}
