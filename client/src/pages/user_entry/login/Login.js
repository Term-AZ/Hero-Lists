import React from 'react'
import './Login.css'
import { useState } from 'react'

const Login = () =>{
    const [inputs, setInputs] = useState({})

    const handleChange = (event) =>{
        const name = event.target.name
        const value = event.target.value
        setInputs(values => ({...values, [name]:value}))
    }

    const handleSubmit = (event)=>{
        console.log("in here")
    }

    return(
        <div className='auth_background'>
            <div className='auth_scrolling_image'>
                <div className='auth_info_container'>
                    <form onSubmit={handleSubmit}>
                        <label>Email</label>
                        <input 
                            type="text" 
                            name="email" 
                            values={inputs.email || ""} 
                            onChange={handleChange}
                        />
                        <input 
                            type="password" 
                            name="password" 
                            values={inputs.password || ""} 
                            onChange={handleChange}
                        />

                        <input type='submit'></input>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login