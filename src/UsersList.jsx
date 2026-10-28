import { useEffect, useState } from 'react'

const url = 'http://localhost:3000/users'

export default function UserList() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function getUsers() {
      try {
        const response = await fetch(url, { signal: controller.signal })
        if (!response.ok) throw new Error(`Request failed (${response.status})`)
        const data = await response.json()
        const list = Array.isArray(data) ? data : (data.users ?? data.data ?? [])
        setUsers(Array.isArray(list) ? list : [])
      } catch (err) {
        if (err.name !== 'AbortError') setError(`Could not load users. Make sure your API is running at ${url}. ${err.message}`)
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    getUsers()
    return () => controller.abort()
  }, [])

  return (
    <main className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Users</h1>
      {loading && <p>Loading users...</p>}
      {error && <p className="mb-3 text-red-600" role="alert">{error}</p>}
      {!loading && !error && users.length === 0 && <p>No users found.</p>}
      {users.length > 0 && (
        <table className="w-full max-w-xl border-collapse text-left">
          <thead><tr className="bg-amber-500"><th className="border p-2">Name</th><th className="border p-2">Age</th></tr></thead>
          <tbody>{users.map((user, index) => (
            <tr key={user.id ?? `${user.name}-${index}`}>
              <td className="border p-2">{user.name ?? '—'}</td>
              <td className="border p-2">{user.age ?? '—'}</td>
            </tr>
          ))}</tbody>
        </table>
      )}
    </main>
  )
}
