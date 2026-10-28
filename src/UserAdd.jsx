import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function UserAdd() {
  const url = "http://localhost:3000/users/"
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [age, setAge] = useState("")

  async function addUser() {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ name, age }),
    })

    const data = await response.json()

    if (data) {
      alert("user added")
      navigate("/users")
    } else {
      alert("user not added")
    }
  }

  return (
    <main className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-slate-100 px-4 py-10">
      <section className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl ring-1 ring-slate-200">
        <h1 className="mb-2 text-center text-3xl font-bold text-slate-800">ADD USERS</h1>
        <p className="mb-8 text-center text-sm text-slate-500">Enter the user details below</p>

        <div className="space-y-5">
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-semibold text-slate-700">Name</label>
            <input
              id="name"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>

          <div>
            <label htmlFor="age" className="mb-2 block text-sm font-semibold text-slate-700">Age</label>
            <input
              id="age"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              type="text"
              placeholder="Enter Age"
              value={age}
              onChange={(event) => setAge(event.target.value)}
            />
          </div>

          <button
            className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white shadow-md transition hover:bg-blue-700 active:scale-[0.99] focus:outline-none focus:ring-4 focus:ring-blue-200"
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
