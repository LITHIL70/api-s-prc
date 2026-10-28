import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function UserAdd(){

    let url="http://localhost:3000/users"

    let navigate = useNavigate()

    let[name,setName]=useState()
    let[age,setAge]=useState()

    async function addUser() {
        let response = await fetch(url,{
            method:"POST",
            body:JSON.stringify({name, age})
        });

        response = await response.json()

        if(response){
            alert("user added")
            navigate("/users")
        }else{
            alert("users not added")
        }

    }
    return(
        <>
        <div>
            <h1>ADD USERS</h1>

            <input className="m-2" type="text" placeholder="ENTER NAME" onChange={(event)=>setName(event.target.value)}/><br></br>
            <input className="m-2" type="text" placeholder="ENTER AGE"  onChange={(event)=>setAge(event.target.value)}/><br></br>

            <button className="m-4 bg-amber-950" onClick={addUser()}>Conform</button>
            
        </div>
        </>
    )
}