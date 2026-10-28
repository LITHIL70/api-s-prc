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
        if (err.name !== 'AbortError') {
          setError(`Could not load users. Make sure your API is running at ${url}. ${err.message}`)
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    getUsers()
    return () => controller.abort()
  }, [])

  return (
    <main className="min-h-[calc(100vh-64px)] bg-slate-100 px-4 py-10 sm:px-6">
      <section className="mx-auto max-w-4xl">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Dashboard</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Users List</h1>
            <p className="mt-2 text-slate-500">View the users returned by your API.</p>
          </div>
          <div className="inline-flex w-fit items-center rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm ring-1 ring-slate-200">
            {users.length} {users.length === 1 ? 'user' : 'users'}
          </div>
        </div>

        {loading && (
          <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-sm">
            <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
            Loading users...
          </div>
        )}

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-red-700 shadow-sm" role="alert">
            <p className="font-semibold">Unable to load users</p>
            <p className="mt-1 text-sm">{error}</p>
          </div>
        )}

        {!loading && !error && users.length === 0 && (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center shadow-sm">
            <h2 className="text-lg font-semibold text-slate-800">No users found</h2>
            <p className="mt-2 text-sm text-slate-500">When users are available from the API, they will appear here.</p>
          </div>
        )}

        {users.length > 0 && (
          <div className="overflow-hidden rounded-xl bg-white shadow-md ring-1 ring-slate-200">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[320px] border-collapse text-left">
                <thead>
                  <tr className="bg-slate-800 text-white">
                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider">Name</th>
                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider">Age</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {users.map((user, index) => (
                    <tr key={user.id ?? `${user.name}-${index}`} className="transition hover:bg-blue-50">
                      <td className="px-6 py-4 font-medium text-slate-800">{user.name ?? '—'}</td>
                      <td className="px-6 py-4 text-slate-600">{user.age ?? '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>
    </main>
  )
}
