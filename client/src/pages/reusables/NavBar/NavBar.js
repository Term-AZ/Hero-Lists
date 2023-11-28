import React from 'react'
import './NavBar.css'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
    return(
        <div className='nav_background'>
            <div className='nav_container'>
                <ul className='navbar_list'>
                    <li className='navbar_list_items'>
                        <NavLink style={{"text-decoration": "none"}} className="nav_link" to="/superheroLists/landing">Home</NavLink>
                    </li>
                    <li className='navbar_list_items'>
                        <NavLink style={{"text-decoration": "none"}} className="nav_link" to="/superheroLists/list">Superhero List</NavLink>
                    </li>
                    <li className='navbar_list_items'>
                        <NavLink style={{"text-decoration": "none"}} className="nav_link" to="/superheroLists/login">Login</NavLink>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default NavBar