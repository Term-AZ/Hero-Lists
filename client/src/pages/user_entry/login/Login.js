import React from 'react'
import './Login.css'
import { useState, useEffect } from 'react'
import { NavLink , useNavigate} from 'react-router-dom'
import useAuth from '../../../hooks/useAuth';


const Login = () =>{
    const [inputs, setInputs] = useState({})
    const [header, setHeader] = useState()
    const navigate = useNavigate()
    const error_log = document.getElementById('error_log')
    const { setAuth, persist, setPersist } = useAuth();
    const handleChange = (event) =>{
        const name = event.target.name
        const value = event.target.value
        setInputs(values => ({...values, [name]:value}))
    }

    useEffect(() => {
        localStorage.setItem("persist", persist);
    }, [persist])

    const togglePersist = () => {
        setPersist(prev => !prev);
    }

    const handleSubmit = (event)=>{
        event.preventDefault();
        
        fetch('/user/login',{
            method: "POST",
            headers:{"Content-Type":"application/json", },
            body: JSON.stringify(inputs)
        }).then(response =>{
    
            if(response.ok){
                return response.json()
            }
        }).then(data=> {
            const em = data?.email
            console.log(data.email)
            const roles = data?.admin
            const token = data?.authorization
            setAuth([em,roles,token ])
            setInputs({})
            setHeader()

            if(roles=="Admin"){
                return navigate("/SuperheroList/Admin")
            }
            navigate("/SuperheroList/list")
        }).catch((err)=> error_log.innerText = "Email or password do not match")
        
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
                        <p className = 'error_log' id="error_log"></p>
                        {/* <div className="persistCheck">
                        <input
                            type="checkbox"
                            id="persist"
                            onChange={togglePersist}
                            checked={persist}
                        />
                        <label htmlFor="persist">Trust This Device</label>
                        </div> */}

                        <NavLink style={{"text-decoration": "none"}} className="login_nav_link" to="/SuperheroList/register">Don't have an account? Create one here!</NavLink>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login