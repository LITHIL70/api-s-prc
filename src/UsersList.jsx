import { useEffect, useState } from 'react'

export default function UserList() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)

  const url = 'http://localhost:3000/users'

  async function getUsers() {
    const response = await fetch(url)
    const data = await response.json()

    setUsers(data)
    setLoading(false)
  }

  useEffect(() => {
    setLoading(true)
    getUsers()
  }, [])

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10 sm:px-6">
      <section className="mx-auto max-w-4xl">
        <header className="mb-8 rounded-2xl bg-gradient-to-r from-blue-700 to-indigo-600 px-6 py-8 text-white shadow-lg sm:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">Dashboard</p>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Users List</h1>
          <p className="mt-2 text-blue-100">Users fetched from your API</p>
        </header>

        {loading ? (
          <div className="rounded-xl bg-white p-10 text-center shadow-sm ring-1 ring-slate-200">
            <div className="mx-auto mb-4 h-9 w-9 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
            <p className="font-medium text-slate-600">Loading users...</p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-slate-200">
            <div className="border-b border-slate-200 px-6 py-4">
              <h2 className="text-lg font-semibold text-slate-800">All Users</h2>
              <p className="mt-1 text-sm text-slate-500">Total users: {users.length}</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-800 text-xs uppercase tracking-wider text-white">
                    <th className="px-6 py-4 font-semibold">Name</th>
                    <th className="px-6 py-4 font-semibold">Age</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {users.map((user, index) => (
                    <tr key={user.id ?? index} className="transition hover:bg-blue-50">
                      <td className="px-6 py-4 font-medium text-slate-800">{user.name}</td>
                      <td className="px-6 py-4 text-slate-600">{user.age}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {users.length === 0 && (
              <p className="px-6 py-8 text-center text-slate-500">No users found.</p>
            )}
          </div>
        )}
      </section>
    </main>
  )
}
