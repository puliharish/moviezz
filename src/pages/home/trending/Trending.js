import React, { useState } from 'react'
import SwitchTabs from '../../../components/switchtabs/SwitchTabs'
import UseFetch from '../../../useFetch/UseFetch';
import Carousel from '../../../components/car0usel/Carousel';


const Trending = () => {
  const [endpoints, setEndpoints] = useState("day")

  const {data, loading} = UseFetch(`/trending/all/${endpoints}`)
  const ontabchanging = (tab)=>{
    setEndpoints(tab === "Day" ? "day" : "week" )
  }
  return (
    <div className='carouselSection'>
      <div className='wrappers'>
        <span className='carouseltitle'>Trending</span>
        <SwitchTabs data={["Day","week"]} ontabchanging={ontabchanging}/>
       
      </div>
      <Carousel data={data?.results} loading={loading} />
    </div>
  )
}

export default Trending
