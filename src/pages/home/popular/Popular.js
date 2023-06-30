import React, { useState } from 'react'
import SwitchTabs from '../../../components/switchtabs/SwitchTabs'
import UseFetch from '../../../useFetch/UseFetch';
import Carousel from '../../../components/car0usel/Carousel';


const Popular = () => {
  const [endpoints, setEndpoints] = useState("movie")

  const {data, loading} = UseFetch(`/${endpoints}/popular`)
  const ontabchanging = (tab)=>{
    setEndpoints(tab === "Movies" ? "movie" : "tv" )
  }
  return (
    <div className='carouselSection'>
      <div className='wrappers'>
        <span className='carouseltitle'>whats Popular</span>
        <SwitchTabs data={["Movies","TV Shows"]} ontabchanging={ontabchanging}/>
       
      </div>
      <Carousel data={data?.results} loading={loading} endpoints={endpoints}/>
    </div>
  )
}

export default Popular
