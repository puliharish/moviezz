
import './Carousel.css'

import React, { useRef } from "react";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";



import PosterFallback from "../../assets/no-poster.png";

import Circlerating from '../circlerating/Circlerating';
import Genres from '../genres/Genres';





const skeitem = () =>{
    return(
        <div className='skeletonitem'>
            <div className='posterblock skeleton'></div>
            <div className='textblock'>
            <div className='title skeleton'></div> 
            <div className='date skeleton'></div> 
            </div>
        </div>
    )
}



const Carousel = ({ data, loading ,endpoints,title}) => {
    const { url } = useSelector((state)=>state.home)
    const navigate = useNavigate();
    const carrouselcontainer = useRef();
    const navigation = (dir) =>{
      const container = carrouselcontainer.current;
      const scrollamount = dir === "left" ? container.scrollLeft - (container.offsetWidth + 20) : container.scrollLeft + (container.offsetWidth + 20);
      container.scrollTo({
        left: scrollamount,
        behavior: "smooth",
      })
    }
  return (
    <div className='carosuel' >
      {title && <div className='carouselTitle'>{title}</div>}
      <div className='wrappers'>
      
      <BsFillArrowLeftCircleFill
                    className="carouselLeftNav arrow"
                    onClick={() => navigation("left")}
     />
     <BsFillArrowRightCircleFill
                    className="carouselRighttNav arrow"
                    onClick={() => navigation("right")}
     />
     { 
       !loading ? (
        <div className='carouseItems' ref={carrouselcontainer}>
           { data?.map((item)=>{
            const posterurl = item.poster_path ? url.poster + item.poster_path :  PosterFallback;
            return (
                <div className='carouselitem' key={item.id} onClick={()=>navigate(`/${item.media_type || endpoints}/${item.id}`)}>
                    <div className='posterBlock'>
                    <img src={posterurl}/>
                    <Circlerating rating={item.vote_average.toFixed(1)}/>
                    <Genres data={item.genre_ids.slice(0,2)}/>
                    </div>
                    <div className='textBlock'>
                        <span className='title'>
                        {item.title || item.name}
                        </span>
                        <span className='date'>
                        {dayjs(item.release_Date).format("MMM D, YYYY")}
                        </span>
                    </div>
                </div>
            )
           })}
        </div>
       ):(
        <div className='loadingSkeleton'>
           {skeitem()}
           {skeitem()}
           {skeitem()}
           {skeitem()}
           {skeitem()}
        </div>
       )
      }
      </div>
    </div>
  )
}

export default Carousel
