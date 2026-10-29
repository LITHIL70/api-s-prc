import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"

export default function UserUpdate(){

    let {id} =useParams()
    let navigate = useNavigate()

    let url = "http://localhost:3000/users/"

    let[name, setName]=useState("")
    let[age, setAge]=useState("")

    async function getUser() {
        let response = await fetch(url + id)

        response = await response.json()

        setName(response.name)
        setAge(response.age)

    }

    useEffect(()=>{
        getUser()
    },[])

    async function UpdateUser(){

        if(!age.trim("") || !name.trim("")){
            return;
        }
            

        try{
            await axios.put(url + id,{name, age})
            alert(" data updated")
            navigate("/users")

        }catch(error){
            alert(error)
        }

        // let response = await fetch(url + id, {
        //     method:"PUT",
        //     body:JSON.stringify({name,age})
        // });

        // response = await response.json()

        // if(response){
        //     alert("User data updated")
        //     navigate("/users")
        // }else{
        //     alert("something went wrong")
        // }
    }

    return(
        <>
        <div className=" relative m-4 ">
            <div className="border-2 m-4 ">
                <label className=" align-middle ">Enter Name*:</label>
                <input className="outline-amber-500 border m-4 align-middle" type="text" value={name} onChange={(event)=> setName(event.target.value)} placeholder="Enter new nmae......"></input><br></br>
                <label className=" align-middle"  >Enter Age*:</label>
                <input required className="outline-amber-500 border m-7 align-middle" type="text" value={age} onChange={(event)=> setAge(event.target.value)} placeholder="Enter Age..."></input>
                <button onClick={UpdateUser} className=" border w-30 bg-green-600 m-3  " >Update</button>
            </div>
        </div>
        </>
    )
}