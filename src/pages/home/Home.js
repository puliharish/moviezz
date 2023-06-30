import React from 'react'
import './home.css'
import HearoBanner from './hearbanner/HearoBanner'
import Trending from './trending/Trending'
import Popular from './popular/Popular'
import Toprated from './toprated/Toprated'

const Home = () => {
  return (
    <div className='homepage'>
      <HearoBanner/>
      <Trending/>
      <Popular/>
      <Toprated/>
     
    </div>
  )
}

export default Home
