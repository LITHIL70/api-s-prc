import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export default function UserAdd(){

    let url="http://localhost:3000/users"

    let navigate = useNavigate()

    let[name,setName]=useState("")
    let[age,setAge]=useState("")

    async function addUser() {

        // The conditional check: Stops execution if name or age is empty
        if ( !name.trim() || !age.trim()) {
            alert("Please fill in both Name and Age fields.");
            return; // Exits the function immediately, preventing the API call
        }
            try{
                await axios.post(url, {name,age})
                alert("user added")
                navigate("/users")
            }catch(error){
                alert(error)
            }

        // let response = await fetch(url,{
        //     method:"POST",
        //     body:JSON.stringify({name, age})
        // });

        // response = await response.json()

        // if(response){
        //     alert("user added")
        //     navigate("/users")
        // }else{
        //     alert("users not added")
        // }

    }
    return(
        <>
        <div className="border justify-center align-middle m-4">
            <h1 className=" justify-center m-2 bg-center align-middle ">ADD USERS</h1>

            <div className="relative m-2">
            <input className="  peer required:not-checked:  m-2 outline-1 p-0.5 " type="text" placeholder="ENTER NAME" required onChange={(event)=>setName(event.target.value)}/><br></br>

            </div>

            <div className="m-2">
                <input className=" m-2 outline-1 p-0.5" type="text" placeholder="ENTER AGE"  required onChange={(event)=>setAge(event.target.value)}/><br></br>

            </div>
            <button className="m-4 w-30 bg-red-600" onClick={addUser}>Conform</button>
            
        </div>
        </>
    )
}