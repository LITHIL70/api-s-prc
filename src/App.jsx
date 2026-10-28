import { useEffect, useState } from 'react'
import UserAdd from './UserAdd'
import UserList from './UsersList'
import { NavLink,Routes, Route } from 'react-router-dom'

function App() {


 

  return (
    <>
      
      <ul className='flex w-full bg-amber-500 justify-around'>
        <NavLink to="/users"><li>USER's</li></NavLink>
        <NavLink to="/addUser"><li>ADD USER'S</li></NavLink>
      </ul>

      <Routes>
        <Route path='/users' element={< UserList/>}/>
        <Route path='/adduser' element={< UserAdd/>}/>
      </Routes>
    </>
  )
}

export default App
