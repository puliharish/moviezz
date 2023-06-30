import React, { useState } from 'react'

import UseFetch from '../../../useFetch/UseFetch';
import { useParams } from 'react-router-dom';
import './detailbanner.css'
import { useSelector } from 'react-redux';
import PosterFallBack from '../../../assets/no-poster.png'
import dayjs from "dayjs";
import Genres from '../../../components/genres/Genres';
import Circlerate from './Circlerate';
import Videopup from '../../../components/videopup/Videopup';
import { AiOutlinePlayCircle } from "react-icons/ai";





const DetailsBanner = ({video,crew}) => {
    
    const [show , setShow] = useState(false);
    const [videoId,setVideoId] = useState(null);

    const {mediaType , id} = useParams()
    const {data , loading} = UseFetch(`/${mediaType}/${id}`)
     
    const {url} = useSelector((state)=>state.home)
    const tohourAndMinutes = (totalMinutes) =>{
        const hours = Math.floor(totalMinutes /60 );
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    }
    
    const genress = data?.genres?.map((g)=>g.id) 

    const director = crew?.filter((f)=> f.job === "Director");
    const writer = crew?.filter((f)=> f.job === "ScreenPlay" || f.job === "Story" || f.job === "Writer" )
    
  return (
    <div className='datailsbanner'>
        {
            !loading?
              (
                <>
                 {!!data && (
                    <React.Fragment>
                         <div className='backdrop-img'>
                         <img src={url.backdrop + data?.backdrop_path}/>
                        </div>
                        <div className='opacitylayer'></div>
                        <div className='wrap'>
                            <div className='content'>
                            <div className='lefts'>
                            {
                                data.poster_path ? (
                                    <img className='poster_img' src={
                                        url.backdrop + data.poster_path
                                    }/>

                                ):(
                                    <img className='poster_img' src={PosterFallBack}/>
                                )
                            }
                            </div>
                            <div className='rights'>
                                <div className='title'>
                                {
                                   `${data.name || data.title} (${dayjs(data?.release_date).format("YYYY")})` 
                   
                                }
                                </div>
                                <div className='subtitle'>
                                {data.tagline}
                                </div>
                               <Genres data={genress}/>
                               <div className='row'>
                                
                                   {/* <Circlerating rating={data.vote_average.toFixed(1)}/> */}
                                   {/* <Circlerating rating={data.vote_average.toFixed(1)}/> */}
                                   
                                   <Circlerate rating={data.vote_average/* .toFixed(1) */} />
                                  
                                   <div className="playbtn"
                                   onClick={()=>{
                                    setShow(true)
                                    setVideoId(video.key)
                                   }}
                                   >
                                   <AiOutlinePlayCircle />
                                   <span className='trailer'>
                                    watch trailer
                                   </span>
                                   </div>
                                   </div>
                                   <div className='overviewheading'>
                                    <div className='overtext'>
                                        OverView
                                    </div>
                                    <div className='discription'>
                                    {
                                        data.overview
                                    }
                                    </div>
                                   </div>
                                   <div className='information'>
                                   {data.status && (
                                    <div className='informationItem'>
                                        <span className='textbold'>
                                            status:{""}
                                        </span>
                                       
                                        <span className='texts'>
                                        {data.status}
                                        </span>
                                    </div>
                                   )}
                                   {data.release_date && (
                                    <div className='informationItem'>
                                        <span className='textbold'>
                                            release:{""}
                                        </span>
                                       
                                        <span className='texts'>
                                        {data.release_date}
                                        </span>
                                    </div>
                                   )}
                                   {data.runtime && (
                                    <div className='informationItem'>
                                        <span className='textbold'>
                                        Runtime:{""}
                                        </span>
                                       
                                        <span className='texts'>
                                        {tohourAndMinutes(data.runtime)}
                                        </span>
                                    </div>
                                   )}
                                   </div>
                                   {director && (
                                    <div className='information'>
                                        <div className='informationItem'>
                                        <span className='textbold'>
                                        Director:{""}
                                        </span>
                                        <span className='texts'>
                                        {
                                            director?.map((d,i)=>(
                                                <span key={i}>
                                                    {d.name}
                                                    {director?.length -1 !== i && ", "}

                                                </span>
                                            ))
                                        }
                                        </span>
                                        </div>
                                    </div>
                                   )}
                                   {writer && (
                                    <div className='information'>
                                        <div className='informationItem'>
                                        <span className='textbold'>
                                        Writer:{""}
                                        </span>
                                        <span className='texts'>
                                        {
                                            writer?.map((d,i)=>(
                                                <span key={i}>
                                                    {d.name}
                                                    {writer?.length-1 !== i && ", "}

                                                </span>
                                            ))
                                        }
                                        </span>
                                        </div>
                                    </div>
                                   )}
                                   {data?.created_by  && (
                                    <div className='information'>
                                        <div className='informationItem'>
                                        <span className='textbold'>
                                        Creator:{""}
                                        </span>
                                        <span className='texts'>
                                        {
                                            data?.created_by?.map((d,i)=>(
                                                <span key={i}>
                                                    {d.name}
                                                    {data?.created_by?.length-1 !== i && ", "}

                                                </span>
                                            ))
                                        }
                                        </span>
                                        </div>
                                    </div>
                                   )}
                            </div>
                         </div>
                         <Videopup
                         show={show}
                         setShow={setShow}
                         videoId={videoId}
                         setVideoId={setVideoId}
                         />
                        </div>
                    </React.Fragment>
                 )}
                </>
              
              )
            :(
                <div className='detailsbannerSkelton'>
                    <div className='wrappers'>
                        <div className='left skelton'></div>
                        <div className='right'>
                            <div className='row skelton'></div>
                            <div className='row skelton'></div>
                            <div className='row skelton'></div>
                            <div className='row skelton'></div>
                            <div className='row skelton'></div>
                            <div className='row skelton'></div>
                            <div className='row skelton'></div>
                        </div>
                    </div>
                </div>
            )
        }
      
    </div>
  )
}

export default DetailsBanner
