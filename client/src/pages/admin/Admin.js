import React, { useEffect, useState } from 'react'
import './Admin.css'
import '../user_lists/Userlists.css'
import useAuth from '../../hooks/useAuth'
const Admin = () => {
    const [dmcaComments, setDMCAComments] = useState([])
    const [users, setUsers] = useState([])
    const {auth} = useAuth()
    useEffect((i)=>{
        fetch('/superherolist/users',{
            method:"GET",
            headers:{"Content-Type":"application/json", "authorization": auth[2]},
            credentials: 'include'
        }).then(response=>{if(response.ok)return response.json()}).then(data=>setUsers(data))
    
        getComments()
    },[])

    const setAdmin = () =>{
        var e = document.getElementById("user_list");
        var id = e.options[e.selectedIndex].id;
        fetch('/superherolist/user/setadmin/'+id+'',{
            method:"GET",
            headers:{"Content-Type":"application/json", "authorization": auth[2]},
            credentials: 'include'
        })
    }
    const setHidden = (id)=>{
        fetch('/lists/set/hidden/'+id+'',{
            method:"GET",
            headers:{"Content-Type":"application/json", "authorization": auth[2]},
            credentials: 'include'
        }).then(getComments())
  
    }

    const getComments = () =>{
        fetch('/lists/get/dmcalist',{
            method:"GET",
            headers:{"Content-Type":"application/json", "authorization": auth[2]},
            credentials: 'include'
        }).then(response=>{if(response.ok)return response.json()}).then(data=>setDMCAComments(data))
    }

    return(
        <div className='list_background'>
            <div className='mainpage_scrolling_image'>
                <div className='listpage_info_container'>
                    <h2>Users</h2>
                    <div>
                        <select className='user_select'>
                            <option id='user_list'>Select User</option>
                            {
                                users.map((i)=>{
                                    return(
                                        <option id={i.id}>{i.email}:  {i.nickname}</option>
                                    )
                                })
                            }
                        </select>
                        <button onClick={setAdmin}>Set Admin</button>
                    </div>
                    <div className='dmca_comments_container'>
                            {
                                dmcaComments.map((i)=>{
                                    return(
                                    <div className='review_block_dmca'> 
                                        <h2>Name: {i.nickname}</h2>
                                        <h3>Date: {i.date_created.split("T")[0]}</h3>
                                        <p>{i.review}</p>
                                        <button onClick={()=>setHidden(i.id)}>Hide Comment From Public</button>
                                    </div>
                                    )
                                })
                            }
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Admin