import React, {useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import useAuth from "../../hooks/useAuth";
import Dropdown from '../reusables/Dropdown/Dropdown';
import './Herolist.css'
import Lists from './lists/Lists'
import Populate_list from './functions/Populate_list';

const Herolist = () =>{
    var a = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
    const [publishers, setPublishers] = useState([])
    const { auth } = useAuth();
    const navigate = useNavigate()
    useEffect(()=>{
        fetch("/user/validateToken",{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                "authorization": auth[2]
            }
        }).then(response=>{
            if(response.ok){
                return navigate('/SuperheroList/SLIST')
            }
        })

        // fetch("http://localhost:8000/api/superhero_data/hero_names",{
        //     method:"GET",
        //     headers:{
        //         "Content-Type":"application/json",
        //     }
        // }).then(response=>{return response.json()}).then((data)=>set_hero_names(data))

        fetch("/api/superhero_data/hero_names",{
            method:"GET",
            headers:{"Content-Type":"application/json"},
            credentials: 'include',
        }).then(response =>{
            if(response.ok){
                return response.json()
            }
        }).then(data=>{            
            Populate_list(data)
        }).catch(err=>console.log(err))

        fetch('/superherosLists/publishers',{
            method:"GET",
            headers:{"Content-Type":"application/json"},
            credentials: 'include',
        }).then(response=>{            
            return response.json()
        }).then(data=>{            
            setPublishers(data)}).catch(err=>console.log(err))
    },[])
    

    return(
        <div className='list_background'>
            <div className="search_container">
                <input id="user_input" placeholder="Search"/>
                <input id="amount" placeholder="Amount of Results"/>
                <select name="options" id="options" className="option_dropdown">
                    <option value="Name">Name</option>
                    <option value="Id">Id</option>
                    <option value="Race">Race</option>
                    <option value="Publisher">Publisher</option>
                    <option value="Ability">Ability</option>
                </select>
                <button id="search_btn">Search</button>

            </div>
            
            <div className="main_list_container" id="main_list_container">
                <ul className="main_list" id="main_list">
                    {
                        a.map((letter) => {
                            return(
                                <figure className='list_figure' >
                                    <figcaption>{letter}</figcaption>
                                    <ul id={letter}>

                                    </ul>
                                </figure>
                            )
                        })
                    }
                </ul>
            </div>
            <div>
                <div>Publishers:</div>
                <ul className='publisher_list' id="publisher_list">
                    {console.log(publishers)}
                    {
                        
                        publishers.map((i)=>{
                            return(
                                <li>
                                    {i.publisher}
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export default Herolist