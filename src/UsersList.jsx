import { useState } from "react"

export default function UserList(){

    let url = "http://localhost:3000/users"
    
      let[users, setUsers]=useState([])
    
      async function getUsers(){
    
        let  response = await fetch(url)
    
        response = await response.json()
    
        console.log(response)
    
        setUsers(response.users)
    
    
      }
    
      useEffect(()=>{
        getUsers()
      },[])
    

    return(
        <>
        
        <div>
        <h1>Getting users through API'S</h1>

        <ul>
          <li>Name</li>
          <li>Age</li>
        </ul>

       { 
        users.map((user)=>(
          <ul>
          <li>{user.name}</li>
          <li>{user.age}</li><br/>
        </ul>
        ))
        }
      </div>

        </>
    )
}