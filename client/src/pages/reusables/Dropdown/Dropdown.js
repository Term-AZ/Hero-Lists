import React from 'react'
import './Dropdown.css'
import { useEffect, useState } from 'react'

const Dropdown = (props) =>{
    const [data, setData] = useState({})

    useEffect((i) => {
        fetch('/api/superhero_data/"'+props.id+'"',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"}
        }).then(response => {return response.json()}).then(
            (d)=> {
                setData(d)
            }
        )
    },[])
    
    return(
       <div id='drop_down'>
            <div>
                <ul>
                    {Object.keys(data).map((i)=>{

                    })}
                </ul>
            </div>
       </div> 
    )

}

export default Dropdown