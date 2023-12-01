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
    const [userSearch, setUserSearch] = useState({user_input:"", user_input_race:"",user_input_publisher:"",user_input_ability:"",search_amount:""})
    const [searchAmount, setSearchAmount] = useState({})
    const [searchResults, setSearchResults] = useState([])
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
        // console.log(searchAmount)
        try{
            Number(searchAmount['search_amount'])
        }catch{
            return
        }
        if((userSearch.user_input =="" && userSearch.user_input_race=="" && userSearch.user_input_publisher=="" && userSearch.user_input_ability=="")&& userSearch.search_amount==""){
            return
        }
        console.log()
        var e = document.getElementById("options");
        var text = e.options[e.selectedIndex].text;
        fetch('/superheros/search',{
            method:"POST",
            headers:{"Content-Type":"application/json",},
            body: JSON.stringify(userSearch)
        }).then(response=>{return response.json()}).then(data=>{setSearchResults(data)})



        // fetch('/superheros/search/'+userSearch['user_input']+'/'+userSearch['user_input_race']+'/'+userSearch['user_input_publisher']+'/'+userSearch['user_input_ability']+'/'+userSearch['search_amount'],{
        //     method: "GET",
        //     headers:{"Content-Type":"application/json"},
        // }).then(response => {return response.json()}).then(data=>Populate_list(data)).catch((err)=>console.log(err))
    }

    return(
        <div className='list_background'>
            <div className="search_container">
                <input id="user_input" name={"user_input"}placeholder="Search Name" onChange={handleSearchUpdate} values={userSearch}/>
                <input id="user_input1" name={"user_input_race"}placeholder="Search Race " onChange={handleSearchUpdate} values={userSearch}/>
                <input id="user_input2" name={"user_input_publisher"}placeholder="Search Publisher" onChange={handleSearchUpdate} values={userSearch}/>
                <input id="user_input3" name={"user_input_ability"}placeholder="Search Ability" onChange={handleSearchUpdate} values={userSearch}/>

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
            <ul className='search_list'>
                {console.log(searchResults)}
                {searchResults.map((i)=>{
                    return(
                    <li onClick={()=>{document.getElementById(i.id).scrollIntoView(); document.getElementById(i.id).click()}}>
                        {i.hero_name}
                    </li>)
                })}
            </ul>

            <Lists/> 
            
            <div className="main_list_container" id="main_list_container">
                <ul className="main_list" id="main_list">
                    {
                        a.map((letter) => {
                            return(
                                <figure className='list_figure' >
                                    <figcaption>{letter}</figcaption>
                                    <ul id={letter} className='hero_sublist'>

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