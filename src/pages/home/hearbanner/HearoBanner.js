import React, { useEffect, useState } from 'react'
import './hearbanner.css'
import {  useNavigate } from 'react-router-dom';
import UseFetch from '../../../useFetch/UseFetch';
import { useSelector } from 'react-redux';





const HearoBanner = () => {
    const[backdopimg,setBackdropimg] = useState("");
    const[searchquery,setSearchquery] = useState("");
    const navigate = useNavigate()
    const {data, loading} = UseFetch('/movie/upcoming')
    const {url} = useSelector((state)=>state.home)
    const Searchqueryhandler = (event)=>{
     if( searchquery.length > 0 && event.key == "Enter"){
        navigate(`/search/${searchquery}`)
     }
    }
    const Searchqueryhandlers = (event)=>{
      if( searchquery.length > 0 ){
         navigate(`/search/${searchquery}`)
      }
     }
   useEffect(()=>{
    const bg  =url.backdrop + data?.results[Math.floor(Math.random()*20)]?.backdrop_path
    setBackdropimg(bg)
   },[data])

  return (
    <div className='heroBanner'>
      {!loading && <div className='backdrop-img'>
        <img src={backdopimg}/>
      </div>}
      <div className='opacity_layer'></div>
      <div className='wrapper'>
        <div className='heroBannerContent'>
            <span className='titless'>
                WELCOME 
            </span>
            <span className='subTitle'>
                just explore millions of movies and series
            </span>
            <div className='searchInput'>
                <input  type='text' placeholder='Search Movie / Series'
                
                onChange={(e)=>setSearchquery(e.target.value)}
                onKeyUp={Searchqueryhandler}
                />
                <button onClick={Searchqueryhandlers}>Search</button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default HearoBanner
