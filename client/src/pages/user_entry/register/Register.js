import React from 'react'
import '../login/Login.css'
import {useState} from 'react'
import {NavLink, useNavigate} from 'react-router-dom'

const Register = () =>{
    const [inputs, setInputs] = useState({})
    const navigate = useNavigate()
    const error_log = document.getElementById('error_log')
    const handleChange = (event) =>{
        const name = event.target.name
        const value = event.target.value
        setInputs(values => ({...values, [name]:value}))
    }

    const handleSubmit = (event)=>{
        event.preventDefault();
        if(inputs.password == inputs.confirm_password){
            fetch('http://localhost:8000/user/register',{
                method: "POST",
                headers:{"Content-Type":"application/json", },
                body: JSON.stringify(inputs)
            }).then(response =>{
                if(response.ok){
                    navigate("/SuperheroList/login")
                }else{
                    return response.json()
                }
            }).then(data=> {

                error_log.innerText = data?.msg ? data.msg : ""
                console.log(data)
            })
        }else{
            error_log.innerText = "Passwords do not match!"
            console.log(inputs.password + "   " +inputs.confirm_password)
            return
        }
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
                        <label>Confirm Password</label>
                        <input  className='text_input'
                            type="password" 
                            name="confirm_password" 
                            values={inputs.confirm_password || ""} 
                            onChange={handleChange}
                        />

                        <input className='submit' type='submit' value='Create Account'></input>
                        <p className = 'error_log' id="error_log"></p>
                        <NavLink style={{"text-decoration": "none"}} className="login_nav_link" to="/SuperheroList/login">Already have an account? Login here!</NavLink>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register