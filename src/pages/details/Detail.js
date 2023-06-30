import React from 'react'
import './detail.css'

import { useParams } from 'react-router-dom';
import UseFetch from '../../useFetch/UseFetch';
import DetailsBanner from './detailsbanner/DetailsBanner';
import Cast from './cast/Cast';
import Recomded from './carouselss/Recomded';
import Similar from './carouselss/Similar';

const Detail = () => {
  const {mediaType,id} = useParams()
  const {data, loading} = UseFetch(`/${mediaType}/${id}/videos`);
  const {data: credits, loading: creditsLoading} = UseFetch(`/${mediaType}/${id}/credits`);

  
  return (
    <div>
     <DetailsBanner video={data?.results?.[0]} crew={credits?.crew}/>
     <Cast data={credits?.cast} loading={creditsLoading}/>
     <Recomded  mediaType={mediaType} id={id}/>
     <Similar  mediaType={mediaType} id={id}/>
   
    </div>
  )
}

export default Detail
