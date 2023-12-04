import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import '../user_lists/Userlists.css'
import './Listdata.css'
import useAuth from '../../hooks/useAuth'

const Listdata = () => {
    const params = useParams()
    const id = params.id
    const {auth} = useAuth()
    const [listData, setListData] = useState([])
    const [listReviews, setListReviews] = useState([])
    const [createReview, setCreateReview] = useState(false)
    const [input, setInput] = useState({})
    useEffect(()=>{
        fetch('/lists/get/fulldata/'+id+'',{
            method:"GET",
        }).then(response => {if(response.ok)return response.json()}).then(data=>setListData(data))
        getReviews()
    },[])


    const handleSubmit = (event) =>{
        event.preventDefault()
        fetch('/lists/post/review/'+id+'',{
            method:"POST",
            headers:{"Content-Type":"application/json","authorization": auth[2]},
            credentials: 'include',
            body: JSON.stringify(input)
        }).then(getReviews())
    }

    const handleChange = (event) =>{
        const name = event.target.name
        const value = event.target.value
        setInput(values => ({...values, [name]:value}))
    }

    const getReviews = () =>{
        fetch('/lists/get/reviews/'+id+'',{
            method:"GET",
        }).then(response=>{if(response.ok){
            return response.json()
        }}).then(data=>setListReviews(data))
    }

    const flagDMCA = (id) =>{
        document.getElementById(`${id}`).disabled = true;
        fetch('/lists/review/flag/'+id+'',{
            method:"GET",
            headers:{"Content-Type":"application/json","authorization": auth[2]},
            credentials: 'include',

        })
    }


  return (
    <div className='list_background'>
        <div className='mainpage_scrolling_image'>
            <div className='listpage_info_container_l'>
                <table>
                    <tr>
                        <th>
                           Id 
                        </th>
                        <th>
                           Name 
                        </th>
                        <th>
                           Gender 
                        </th>
                        <th>
                           Eye Color
                        </th>
                        <th>
                           Hair Color
                        </th>
                        <th>
                           Height
                        </th>
                        <th>
                           Publisher
                        </th>
                        <th>
                           Skin_Color
                        </th>
                        <th>
                           Alignment
                        </th>
                        <th>
                           Hero_Weight
                        </th>
                        <th>
                           Race
                        </th>
                    </tr>
                    {
                        listData.map((i)=>{
                            return(
                                <tr>
                                    <td>
                                        {i.id}
                                    </td>
                                    <td>
                                        {i.hero_name}
                                    </td>
                                    <td>
                                        {i.gender}
                                    </td>
                                    <td>
                                        {i.eye_color}
                                    </td>
                                    <td>
                                        {i.hair_color}
                                    </td>
                                    <td>
                                        {i.height}
                                    </td>
                                    <td>
                                        {i.publisher}
                                    </td>
                                    <td>
                                        {i.skin_color}
                                    </td>
                                    <td>
                                        {i.alignment}
                                    </td>
                                    <td>
                                        {i.hero_weight}
                                    </td>
                                    <td>
                                        {i.race}
                                    </td>
                                </tr>
                            )
                        })
                    }
                </table>
                {
                    auth[2] ? 

                    !createReview?
                        <button onClick={()=>setCreateReview(true)}>Create Review</button>
                    :
                    <form onSubmit={handleSubmit}>
                        <label className='s'>
                            Create Review:
                        </label>
                        <textarea id='reviewInput' name="review" values={input.review || ""} onChange={handleChange}>

                        </textarea>
                        <input type='submit'></input>

                    </form>
                    :
                    <div></div>
                }
                <h2>
                    Reviews:
                </h2>
                {listReviews.map((i)=>{
                    return(
                        <div className='review_block'> 
                            <h2 >Name: {i.nickname}</h2>
                            <h3>Date: {i.date_created.split("T")[0]}</h3>
                            <p>{i.review}</p>
                            {console.log(i.dmca)}
                            {auth[2] ? i.dmca ? <button disabled>Flag DMCA</button> : <button id={i.id} onClick={()=>{flagDMCA(i.id)}}>Flag DMCA</button> : <div/>}
                        </div>
                    )
                })}
            </div>
        </div>
    </div>
  )
}

export default Listdata
