import React from 'react'
import './NavBar.css'
import { NavLink } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'

const NavBar = () => {
    const {auth, setAuth} = useAuth()
    return(
        <div className='nav_background'>
            <div className='nav_container'>
                <ul className='navbar_list'>
                    <li className='navbar_list_items'>
                        <NavLink style={{"text-decoration": "none"}} className="nav_link" to="/SuperheroList">Home</NavLink>
                    </li>
                    <li className='navbar_list_items'>
                        <NavLink style={{"text-decoration": "none"}} className="nav_link" to="/SuperheroList/list">Superhero-List</NavLink>
                    </li>
                    {
                        auth[2]==undefined ?  
                            <li className='navbar_list_items'>
                                <NavLink style={{"text-decoration": "none"}} className="nav_link" to="/SuperheroList/login">Login</NavLink>
                            </li> 
                            :
                            <li className='navbar_list_items'>
                                <NavLink style={{"text-decoration": "none"}} className="nav_link" to="/SuperheroList/login" onClick={()=> setAuth([])}>Signout</NavLink>
                            </li>
                    }
                </ul>
            </div>
        </div>
    )
}

export default NavBar