import {useState, useEffect} from 'react'

const useFetch = (url) => {
    const [data, setData] = useState({})

    useEffect(()=>{
        fetch(url,{
            method:"GET",
            headers: {"Content-Type":"application/json", },
            credentials: 'include',
        }).then(response=>{
            if(response.ok){
                return response
            }
        }).then(data=> setData(data)).catch((err)=> console.log(err))
    }, [url])

    return [data]

}

export default useFetch