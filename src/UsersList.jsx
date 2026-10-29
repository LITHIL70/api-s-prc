
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function UserList() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)

  let url = 'http://localhost:3000/users/'

  let navigate=useNavigate()

  async function getUsers() {
    try{
      let response = await axios.get(url)
      setUsers(response.data)
    setLoading(false)

    }catch(error){
      alert(error)
    }
    // const response = await fetch(url)
    // const data = await response.json()

    // setUsers(data)
    // setLoading(false)
  }

  useEffect(() => {
    setLoading(true)
    getUsers()
  }, [])

  async function deletUser(id) {
    // console.log("clicked " + id)

    try{
      await axios.delete(url + id)
      alert(" data deleted sucessfully")
      getUsers()

    }catch(error){
      alert(error)
    }

    // const response = await fetch(url + id, {
    //   method: "DELETE",
    // })

    // if (response.ok) {
    //   alert("user deleted")
    //   getUsers()
    // } else {
    //   alert("something went wrong..")
    // }
  }

    function editUser(id){
      navigate("/edit/"+id)
    }

  return (
    <>
      <div>
        <h1 className='text-3xl font-bold'>
          getting users through API
        </h1>
        <br></br>

        <ul className='flex w-full border-2 justify-around'>
          <li>Name</li>
          <li>Age</li>
          <li>Action</li>
        </ul>

        {
          !loading ? users.map((user) => (
            <ul
              key={user.id}
              className='flex w-full border justify-around'
            >
              <li>{user.name}</li>
              <li>{user.age}</li>
              <li>
                <button
                  onClick={() => deletUser(user.id)}
                  className='border p-2 m-2 bg-red-500'
                >
                  Delet
                </button>
              </li>
              <li><button onClick={()=>editUser(user.id)} className="border bg-green-500 m-2 p-2">Edit</button></li><br />
            </ul>
          )) :
            <h1>Loading....</h1>
        }
      </div>
    </>
  )
}
