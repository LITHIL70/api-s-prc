import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function UserAdd() {
  const url = "http://localhost:3000/users/"
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [age, setAge] = useState("")

  async function addUser() {
    try {
      let response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, age }),
      })

      response = await response.json()

      if (response) {
        alert("user added")
        navigate("/users")
      } else {
        alert("user not added")
      }
    } catch (error) {
      alert("Could not add user. Check that the API server is running.")
      console.error(error)
    }
  }

  return (
    <main className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-slate-100 px-4 py-10">
      <section className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg ring-1 ring-slate-200">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-800">Add User</h1>
          <p className="mt-2 text-sm text-slate-500">Enter the user's details below.</p>
        </div>

        <div className="space-y-5">
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-semibold text-slate-700">Name</label>
            <input
              id="name"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>

          <div>
            <label htmlFor="age" className="mb-2 block text-sm font-semibold text-slate-700">Age</label>
            <input
              id="age"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              type="text"
              placeholder="Enter age"
              value={age}
              onChange={(event) => setAge(event.target.value)}
            />
          </div>

          <button
            className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            onClick={addUser}
            type="button"
          >
            Add User
          </button>
        </div>
      </section>
    </main>
  )
}
