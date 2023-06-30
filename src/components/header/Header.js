import React, { useEffect, useState } from 'react'
import './header.css'
import { useLocation, useNavigate } from 'react-router-dom';
import logo from "../../assets/movix-logo.svg";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";


const Header = () => {
  const [show, setShow] = useState("top");
  const[searchquery,setSearchquery] = useState("");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query , setQuery] = useState("");
  const [showSearch , setShowSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();


  useEffect(()=>{
    window.scrollTo(0,0);
  },[Location])

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
        window.removeEventListener("scroll", controlNavbar);
    };
}, [lastScrollY]);
  const controlNavbar = () => {
    if (window.scrollY > 200) {
        if (window.scrollY > lastScrollY && !mobileMenu) {
            setShow("hide");
        } else {
            setShow("show");
        }
    } else {
        setShow("top");
    }
    setLastScrollY(window.scrollY);
};
  if( searchquery.length>0){
    navigate(`/search/${searchquery}`)
    setTimeout(()=>{
      setShowSearch(false)
    },100)
 }
 
 const navugationhandler = (type) =>{
    if(type === "tv"){
       navigate("/explore/tv")
    }else{
      navigate("/explore/movie")
    }
    setMobileMenu(false)
    
 }
  
  const openSearch =  () =>{
    setMobileMenu(false)
    setShowSearch(true)
  }
  const openMobileMenu =  () =>{
    setMobileMenu(true)
    setShowSearch(false)
  }
  const searchQueryHandler = (e) => {

    if (e.key === "Enter" && query.length > 0 ) {
     
        navigate(`/search/${query}`);
        setTimeout(() => {
            setShowSearch(false);
        }, 1000);
    }
};

   return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <div className=' content_wrapper '>
        <div className='logo'>
          <img src={logo} alt='' onClick={()=> navigate('/')}/>
        </div>
        <ul className={mobileMenu ? "menutimeshide" : "menuItems"}>
          <li className={mobileMenu ? "menuitemhide" : "menuItem"} onClick={()=>navugationhandler('tv')}>Tv Showes</li>
          <li className={mobileMenu ? "menuitemhide" : "menuItem"} onClick={()=>navugationhandler('movie')}>movies</li>
          <li className={mobileMenu ? "menuitemhide" : "menuItem"} >
            <HiOutlineSearch onClick={openSearch} className='searchIcon'/>
          </li>
        </ul>
        <div className= "mobileMenuItems">
        <HiOutlineSearch onClick={openSearch}/>
        {mobileMenu ? <VscChromeClose onClick={()=>setMobileMenu(false)}/> : <SlMenu onClick={openMobileMenu}/>}
        
       
        </div>
      </div>
      {showSearch && <div className='searchbar'>
        <div className=' content_wrapper '>
         <div className='searchInput'>
                <input type='text' placeholder='Search Movie / Series'
                
                onChange={(e)=>setQuery(e.target.value)}
                
                onKeyUp={searchQueryHandler}
                />
              <VscChromeClose onClick={()=>setShowSearch(false)}/>
            </div>
        </div>
      </div>}
    </header>
  )
   }

export default Header
