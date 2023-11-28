import React, {useState, useEffect } from 'react'
import './Herolist.css'
import Lists from './lists/Lists'

const Herolist = () =>{
    var a = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
    const [hero_names, set_hero_names] = useState([])

    useEffect(()=>{
        fetch("http://localhost:8000/superheroLists/heros/data/",{
            method:"GET",
            headers:{"Content-Type":"application/json"},
            credentials: 'include',
        }).then(response =>{
            if(response.ok){
                return response.json()
            }
        }).then(data=>{
            for(var hero of data){
                console.log(hero.hero_name[0])
                var heroList = document.getElementById(hero.hero_name[0].toUpperCase())
                var li = document.createElement("li")
                li.className = "hero_entry"
                li.appendChild(document.createTextNode(hero.hero_name))
                li.id = hero.hero_name
                heroList.appendChild(li)
            }
        }).catch(err=>console.log(err))
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
                    
                </ul>
            </div>
        </div>
    )
}

export default Herolist