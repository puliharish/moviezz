import React from 'react'
import './cast.css'
import { useSelector } from 'react-redux'
import avatar from "../../../assets/avatar.png";


const Cast = ({ data, loading }) => {
const {url} = useSelector((state) => state.home);

const skeleton = () => {
    return (
        <div className="skItem">
                <div className="circle skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
    )
}

  return (
    <div className='castSection'>

        <div className='contentwrappers'>
            <div className='sectionheading'>
                Top Cast
            </div>
            {!loading ? (
                <div className='listitems'>
                    {
                        data?.map((item) =>{
                            let imgUrl = item.profile_path?url.profile + item.profile_path : avatar;
                            return(
                                <div key={item.id} className='listitem'>
                                    <div className='profileimg'>
                                        <img src={imgUrl}/>
                                    </div>
                                    <div className='names'>
                                    {item.name}
                                    </div>
                                    <div className='charecter'>
                                    {item.character}
                                    </div>
                                </div>
                            );
                        })}
                </div>
            ) : (
                <div className="castSkeleton">
                    {skeleton()}
                    {skeleton()}
                    {skeleton()}
                    {skeleton()}
                    {skeleton()}
                    {skeleton()}
                </div>
            ) }
        </div>

      
    </div>
  )
}

export default Cast
