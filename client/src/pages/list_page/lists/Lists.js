import React from 'react'
import './Lists.css'
import { ChangeEvent, useEffect, useState } from 'react'
import useAuth from '../../../hooks/useAuth';

const Lists = () => {
    const {auth} = useAuth()
    const [userLists, setUserLists] = useState([])
    const [newList, setNewList] = useState({})
    const [listDescription, newListDescription] = useState({})
    const [refresh, setRefresh] = useState()
    const [refreshList, setRefreshList] = useState()
    const [listData, setListData] = useState([])

    
    useEffect(()=>{
        if(auth[2]!=undefined){

        
            fetch('/get/lists',{
                methpd:"GET",
                headers:{"Content-Type":"application/json", "authorization": auth[2]},
            }).then(response=>{
                if(response.ok){
                    return response.json()
                }
                }).then((d)=>setUserLists(d))}
    }, [refresh])

    useEffect(()=>{
        if(auth[2]!=undefined){



        }
    })

    const handleChange = (event) =>{
        const name = event.target.name
        const value = event.target.value
        setNewList(values => ({...values, [name]:value}))
    }

    const handleChangeDescription = (event) =>{
        const name = event.target.name
        const value = event.target.value
        setNewList(values => ({...values, [name]:value}))
    }

    const submitList = () =>{
        console.log(newList)
        fetch('/create/list',{
            method:"POST",
            headers:{"Content-Type":"application/json", "authorization": auth[2]},
            body: JSON.stringify({listname:newList['name'], listdescription: listDescription})
        }).then(response => {return response.json()}).then((d)=> {setRefresh(d); console.log(d)})
    } 

    const deleteList = () =>{
        var e = document.getElementById("saved_list_options");
        var id = e.options[e.selectedIndex].id;
        fetch('/list/delete/'+id+'',{
            method:"DELETE",
            headers:{"Content-Type":"application/json", "authorization": auth[2]}
        }).then(response => {return response.json()}).then((d)=> {setRefresh(d); console.log(d)})
    }

    const addHero= ()=>{
        var e = document.getElementById("saved_list_options");
        var id = e.options[e.selectedIndex].id;
        console.log(id)
        fetch('/list/addhero',{
            method:"POST",
            headers:{"Content-Type":"application/json", "authorization": auth[2]},
            body: JSON.stringify({listid: id, heroid:document.getElementById('addhero').value})
        })
    }

    const listChange = () =>{
        
        var e = document.getElementById("saved_list_options");
        var id = e.options[e.selectedIndex].id;
        document.getElementById('list_title').innerHTML = e.options[e.selectedIndex].innerHTML
        fetch('/list/get/'+id+'',{
            method:"GET",
            headers:{"Content-Type":"application/json", "authorization": auth[2]},
        }).then(response=>{return response.json()}).then(data=>setListData(data))
    }

    if(auth[2]!=undefined){
        return(
            
            <div>
                <div >
                <input id="new_list_name" placeholder="Enter New List Name" name='name' onChange={(handleChange)}values={newList||""}/>
                    <button id="create_list_btn" onClick={submitList}>Create List</button>
                    <button id="delete_list_btn" onClick={deleteList}>Delete List</button>
                </div>
                <select name="options" id="saved_list_options" className="option_dropdown"onChange={listChange}>
                        <option value="Name">Select List</option>
                        {userLists.map((i)=>{
                            return(
                                <option id={i.id} name={i.public} selectValue={i.list_name}>{i.list_name}</option>
                            )
                        })}
                </select>
                <h1 id="list_title"></h1>
                <select name="sort_list" id="sort_list" className="option_dropdown" >
                    <option value="Name">Name Asc</option>
                    <option value="Id">Name Dec</option>
                    <option value="Race">Race Asc</option>
                    <option value="Race">Race Dec</option>
                    <option value="Publisher">Publisher Asc</option>
                    <option value="Publisher">Publisher Dec</option>
                </select>
                <div className="list_view">
                    <div className="data_view">
                        <ul className="data_list" id="data_list">
                            {
                                listData.map((i)=>{
                                    console.log(i)
                                    return(
                                        <li hero_id={i.id} onClick={()=>document.getElementById(i.id).focus()}>{i.hero_name}</li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
                <input id='addhero'placeholder='Add/Delete hero by id'></input>
                <button onClick={addHero}>Add</button>
                <button  >Delete</button>
            </div>
    )
    }else{
        return(<div></div>)
    }
}

export default Lists