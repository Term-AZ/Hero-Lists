import React from 'react'
import './Login.css'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'

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
                        <input className='text_input'
                            type="text" 
                            name="email" 
                            values={inputs.email || ""} 
                            onChange={handleChange}
                        />
                        <label>Password</label>
                        <input  className='text_input'
                            type="password" 
                            name="password" 
                            values={inputs.password || ""} 
                            onChange={handleChange}
                        />

                        <input className='submit' type='submit' value='Login'></input>

                        <NavLink style={{"text-decoration": "none"}} className="login_nav_link" to="/SuperheroList/register">Don't have an account? Create one here!</NavLink>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login