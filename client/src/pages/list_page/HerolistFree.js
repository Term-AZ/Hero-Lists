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
    const [userSearch, setUserSearch] = useState({})
    const [searchAmount, setSearchAmount] = useState({})
    const { auth } = useAuth();
    const navigate = useNavigate()

    useEffect(()=>{
        // fetch("/user/validateToken",{
        //     method:"GET",
        //     headers:{
        //         "Content-Type":"application/json",
        //         "authorization": auth[2]
        //     }
        // }).then(response=>{
        //     if(response.ok){
        //         return navigate('/SuperheroList/SLIST')
        //     }
        // })

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
    
    const handleSearchUpdate = (event) =>{
        const name = event.target.name
        const value = event.target.value
        setUserSearch(values => ({...values, [name]:value}))
    }
    const handleSearchAmountUpdate = (event) =>{
        const name = event.target.name
        const value = event.target.value
        setSearchAmount(values => ({...values, [name]:value}))
    }

    const searchHeros = () => {
        console.log(userSearch)
        console.log(searchAmount)
        try{
            Number(searchAmount['search_amount'])
        }catch{
            return
        }
        var e = document.getElementById("options");
        var text = e.options[e.selectedIndex].text;
        fetch('/superheros/search/'+text+'/'+userSearch['user_input']+'/'+searchAmount['search_amount']+'',{
            method: "GET",
            headers:{"Content-Type":"application/json"},
        }).then(response => {return response.json()}).then(data=>Populate_list(data)).catch((err)=>console.log(err))
    }

    return(
        <div className='list_background'>
            <div className="search_container">
                <input id="user_input" name={"user_input"}placeholder="Search Name" onChange={handleSearchUpdate} values={userSearch}/>
                <input id="user_input" name={"user_input_race"}placeholder="Search Race " onChange={handleSearchUpdate} values={userSearch}/>
                <input id="user_input" name={"user_input_publisher"}placeholder="Search Publisher" onChange={handleSearchUpdate} values={userSearch}/>
                <input id="user_input" name={"user_input_ability"}placeholder="Search Ability" onChange={handleSearchUpdate} values={userSearch}/>

                <input id="amount" name={"search_amount"} placeholder="Amount of Results" onChange={handleSearchUpdate} values={searchAmount}/>
                <select name="options" id="options" className="option_dropdown">
                    <option value="Name">Name</option>
                    <option value="Id">Id</option>
                    <option value="Race">Race</option>
                    <option value="Publisher">Publisher</option>
                    <option value="Ability">Ability</option>
                </select>
                <button id="search_btn" onClick={searchHeros}>Search</button>

            </div>
            
            <Lists/> 
            
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