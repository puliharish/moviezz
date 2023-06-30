import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const TMDB_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMzM2YmQ2MGMyZDAwZGIzZDIyOWRjY2M1NDBlZWExYyIsInN1YiI6IjY0NTQ5ZjI3ZDhmNDRlMGRiMDcyNDVjNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SBjoD0BFUMhsWqoy6PcfXWfTyPdItQLcwtrVKprewfw";

const headers = {
    Authorization: "bearer " + 
    TMDB_TOKEN,
};

export const fetchDataFromApi = async(url,params)=>{
    try{
       const {data} = await axios.get(BASE_URL + url, {
        headers,
        params
       })
       return data;
    } catch (err){
       console.log(err)
       return err;
    }
}