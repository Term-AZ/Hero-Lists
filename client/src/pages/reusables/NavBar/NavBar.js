import React from 'react'
import './NavBar.css'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
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
                    <li className='navbar_list_items'>
                        <NavLink style={{"text-decoration": "none"}} className="nav_link" to="/SuperheroList/login">Login</NavLink>
                    </li>
                    <li className='navbar_list_items'>
                        <NavLink style={{"text-decoration": "none"}} className="nav_link" to="/SuperheroList/SLIST">Test</NavLink>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default NavBar