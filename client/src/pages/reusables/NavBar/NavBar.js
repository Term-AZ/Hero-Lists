import React from 'react'
import './NavBar.css'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
    return(
        <div className='nav_background'>
            <div className='nav_container'>
                <ul className='navbar_list'>
                    <li className='navbar_list_items'>
                        <NavLink className="nav_link" to="/superheroLists/landing">Home</NavLink>
                    </li>
                    <li className='navbar_list_items'>
                        <NavLink className="nav_link" to="/superheroLists/list">Superhero List</NavLink>
                    </li>
                    <li className='navbar_list_items'>
                        <button>
                            Sign in
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default NavBar