import React from 'react'
import './Lists.css'
import { ChangeEvent, useEffect, useState } from 'react'
import useAuth from '../../../hooks/useAuth';

const Lists = () => {
    const {auth} = useAuth()
    const [userLists, setUserLists] = useState([])
    const [newList, setNewList] = useState({})
    const [listDescription, newListDescription] = useState({description:""})
    const [refresh, setRefresh] = useState()
    const [refreshList, setRefreshList] = useState()
    const [listData, setListData] = useState([])
    const [listState, setListState] = useState('0')
    
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
            body: JSON.stringify({listname:newList['name'], listdescription: listDescription['description']})
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
        listChange()
    }

    const deleteHero=()=>{
        var e = document.getElementById("saved_list_options");
        var id = e.options[e.selectedIndex].id;
        fetch('/list/'+id+'/'+document.getElementById('addhero').value,{
            method:"DELETE",
            headers:{"Content-Type":"application/json", "authorization": auth[2]},
        })
        listChange()
    }

    const listChange = () =>{
        
        var e = document.getElementById("saved_list_options");
        var id = e.options[e.selectedIndex].id;
        var des = e.options[e.selectedIndex].description
        document.getElementById('list_title').innerHTML = e.options[e.selectedIndex].innerHTML
        document.getElementById('new_list_description').innerHTML = des
        if(e.options[e.selectedIndex].id=="base_choice"){
            setListData([])
            return
        }
        fetch('/list/get/'+id+'',{
            method:"GET",
            headers:{"Content-Type":"application/json", "authorization": auth[2]},
        }).then(response=>{return response.json()}).then(data=>setListData(data))
    }

    const changeListState = () =>{
        var e = document.getElementById("saved_list_options");
        var id = e.options[e.selectedIndex].id;
        var state =  e.options[e.selectedIndex].name
    }

    if(auth[2]!=undefined){
        return(
            <div>
                <div >
                    <input id="new_list_name" placeholder="Enter New List Name" name='name' onChange={(handleChange)}values={newList||""}/>
                    <input id="new_list_description" placeholder="Enter New List Description" name='description' onChange={(handleChangeDescription)}values={listDescription||""}/>
                    <button id="create_list_btn" onClick={submitList}>Create List</button>
                    {listState=='0' ? 
                        <button id="create_list_btn" onClick={changeListState}>Make public</button>
                        :
                        <button id="create_list_btn" onClick={changeListState}>Make private</button>
                    }
                </div>
                <select name="options" id="saved_list_options" className="option_dropdown"onChange={listChange}>
                        <option value="Name" id="base_choice">Select List</option>
                        {userLists.map((i)=>{
                            return(
                                <option id={i.id} name={i.public} description={i.description} selectValue={i.list_name}>{i.list_name}</option>
                            )
                        })}
                </select>
                <button id="delete_list_btn" onClick={deleteList}>Delete List</button>
                <h1 id="list_title"></h1>
                <p id='list_description'></p>
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
                <button onClick={deleteHero} >Delete</button>
                
            </div>
    )
    }else{
        return(<div></div>)
    }
}

export default Lists