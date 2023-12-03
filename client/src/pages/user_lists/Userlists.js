import React, { useEffect, useState } from 'react'
import './Userlists.css'
import useAuth from '../../hooks/useAuth'


const Userlists = () => {
    const {auth} = useAuth()
    const [lists, setLists] = useState([]) 

    useEffect(()=>{
        if(auth[2]){
            fetch('/lists/account',{
                method:"GET",
                headers:{"Content-Type":"application/json","authorization": auth[2]},
                credentials: 'include',
            }).then(response => {return response.json()}).then(data=>setLists(data))
        }else{
            fetch('/lists/free',{
                method:"GET",
                headers:{"Content-Type":"application/json"},
                credentials: 'include',
            }).then(response => {return response.json()}).then(data=>setLists(data))
        }
    },[])

    return(
        <div className='list_background'>
            <div className='mainpage_scrolling_image'>
                <div className='listpage_info_container'>
                    <h1>User made lists</h1>
                    <table>
                        <tr>
                            <th>
                                List Id
                            </th>
                            <th>
                                List Name
                            </th>
                            <th>
                                List Description
                            </th>
                            <th>
                                Number of heros
                            </th>
                            <th>
                                Rating
                            </th>
                        </tr>
                        {
                            lists.map((i)=>{
                                return(
                                    <tr>
                                        <td>
                                            {i.list_id}
                                        </td>
                                        <td>
                                            {i.list_name}
                                        </td>
                                        <td>
                                            {i.description}
                                        </td>
                                        <td>
                                            {i.c}
                                        </td>
                                        <td>
                                            {i.rating}
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Userlists

