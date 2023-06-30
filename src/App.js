
import { useEffect } from 'react';
import './App.css';
import { fetchDataFromApi } from './utils/api';
import { useDispatch, useSelector } from 'react-redux';
import { getApiConfiguration,getGenres } from './store/HomeSlice';
import Home from './pages/home/Home';
import Detail from './pages/details/Detail';
import SerachResult from './pages/serachresult/SearchResult';
import Explore from './pages/explore/Expolre';
import Error from './pages/404/Error';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';



function App() {
  const dispatch = useDispatch()
  const {url} = useSelector((state)=>state.home)

 
  useEffect(()=>{
    
    fetchconfig();
    genresCall()
  },[])

  const fetchconfig  = () =>{
    fetchDataFromApi('/configuration').then((res)=>{
      
      const url = {
        backdrop:res.images.secure_base_url + "original",
        poster:res.images.secure_base_url + "original",
        profile:res.images.secure_base_url + "original",
      }
      
      dispatch(getApiConfiguration(url))
    })
 
  }
  const genresCall = async () => {
    let promises = [];
    let endPoints = ["tv", "movie"];
    let allGenres = {};

    endPoints.forEach((url) => {
        promises.push(fetchDataFromApi(`/genre/${url}/list`));
    });

    const data = await Promise.all(promises);
    
    data.map(({ genres }) => {
        return genres.map((item) => (allGenres[item.id] = item));
    });
    dispatch(getGenres(allGenres)); 
   
};
  return (
    <div className="App">
      <BrowserRouter>
       <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/:mediaType/:id' element={<Detail/>}/>
        {<Route path='/explore/:mediaType' element={<Explore/>}/>}
        <Route path='/search/:query' element={<SerachResult/>}/>
        <Route path='*' element={<Error/>}/>
      </Routes>
     { <Footer/>}
      </BrowserRouter>
      
    </div>
  );
}

export default App;
