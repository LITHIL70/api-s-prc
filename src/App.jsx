import UserAdd from './UserAdd'
import UserList from './UsersList'
import { NavLink, Routes, Route, Navigate } from 'react-router-dom'
import UserUpdate from './UserUpdate'

function App() {
  return (
    <>
      <nav className="flex w-full justify-around bg-amber-500 p-4">
        <NavLink to="/users">USERS</NavLink>
        <NavLink to="/adduser">ADD USER</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/users" replace />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/adduser" element={<UserAdd />} />
        <Route path="/edit/:id" element={< UserUpdate/>} />
      </Routes>
    </>
  )
}

export default App
