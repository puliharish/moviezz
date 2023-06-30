import React, { useState } from 'react'
import './switchtab.css'

const SwitchTabs = ({data,ontabchanging}) => {
    const [selecttab,setSectedtab] = useState(0)
    const[left,setLeft] = useState(0)

    const activeTab = (tab, index) =>{
        setLeft(index * 100 )
        setTimeout(()=>{
         setSectedtab(index)
        },300);
        ontabchanging(tab,index)

    }
  return (
    <div className='switchingTabs'>
        <div className='tabItems'>
        {
            data.map((tab,index)=>(
                <span key={index} className={`tabItem ${selecttab === index ? "active" : ""}`}
                onClick={()=>activeTab(tab, index)}
                >
                    {tab}
                </span>
            ))
        }
        <span className='movingBg' style={{left: left}}></span>
        </div>
      
    </div>
  )
}

export default SwitchTabs
