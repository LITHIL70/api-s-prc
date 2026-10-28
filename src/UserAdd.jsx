import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const url = 'http://localhost:3000/users'

export default function UserAdd() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  async function addUser(event) {
    event.preventDefault()
    setError('')

    if (!name.trim() || age === '' || Number(age) < 0) {
      setError('Enter a name and a valid age.')
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), age: Number(age) }),
      })
      if (!response.ok) throw new Error(`Request failed (${response.status})`)
      alert('User added successfully')
      navigate('/users')
    } catch (err) {
      setError(`Could not add user. Make sure your API is running at ${url}. ${err.message}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-md p-6">
      <h1 className="mb-4 text-2xl font-bold">Add User</h1>
      <form onSubmit={addUser}>
        <label className="mb-1 block" htmlFor="name">Name</label>
        <input id="name" className="mb-3 w-full rounded border p-2" type="text" placeholder="Enter name" value={name} onChange={(event) => setName(event.target.value)} required />
        <label className="mb-1 block" htmlFor="age">Age</label>
        <input id="age" className="mb-4 w-full rounded border p-2" type="number" min="0" placeholder="Enter age" value={age} onChange={(event) => setAge(event.target.value)} required />
        <button className="rounded bg-amber-950 px-4 py-2 text-white disabled:opacity-50" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Confirm'}
        </button>
        {error && <p className="mt-3 text-red-600" role="alert">{error}</p>}
      </form>
    </div>
  )
}
