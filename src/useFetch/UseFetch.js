import React, { useEffect, useState } from 'react'
import { fetchDataFromApi } from '../utils/api';

const UseFetch = (url) => {
    const[data,setData] = useState(null);
    const[loading,setLoading] = useState(null);
    const[error,setError] = useState(null);

    useEffect(()=>{
        setLoading('loading...');
        setData(null);
        setError(null);

        fetchDataFromApi(url).then((response)=>{setLoading(false);
        setData(response)})
        .catch((error)=>{setLoading(false);
            setError(error)});
    },[url])
  return {data,loading,error}
}

export default UseFetch
