import React from 'react'
import './video.css'
import ReactPlayer from 'react-player/youtube'

const Videopup = ({ show, setShow, videoId, setVideoId }) => {
    const hidePup = () => {
       setShow(false)
       setVideoId(null)
    }
  return (
    <div className={`Videopup ${show ? "visible" : ""}`}>
        <div className={show ? "opacitylayerss" : "opacitylayer"} onClick={hidePup}></div>
        <div className={show ? "videoplayerss" : "videoplayer"}>
            <span className='closebtn' onClick={hidePup}>Close</span>
            <ReactPlayer
           
            width='400px'
            height='300px'
            url={`https://www.youtube.com/watch?v=${videoId}`}
            controls
           
             />
        </div>
    </div>
  )
}

export default Videopup
