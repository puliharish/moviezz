 import React, { useEffect, useState } from 'react'
import './serach.css'
import { useParams } from 'react-router-dom';
import { fetchDataFromApi } from '../../utils/api';
import Spinner from '../../components/spinner/Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';
import MovieCard from '../../components/moviecard/MovieCard';


const SearchResult = () => {
  const [data, setData] = useState(null);
    const [pageNum, setPageNum] = useState(1);
    const [loading, setLoading] = useState(false);
    const { query } = useParams();

    const fetchInitialData = () => {
        setLoading(true);
        fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
            (res) => {
                setData(res);
                setPageNum((prev) => prev + 1);
                setLoading(false);
            }
        );
    };

    const fetchNextPageData = () => {
        fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
            (res) => {
                if (data?.results) {
                    setData({
                        ...data,
                        results: [...data?.results, ...res.results],
                    });
                } else {
                    setData(res);
                }
                setPageNum((prev) => prev + 1);
            }
        );
    };

    useEffect(() => {
        setPageNum(1);
        fetchInitialData();
    }, [query]);

    return (
        <div className="searchResultsPageSS">
            {loading && <Spinner initial={true} />}
            {!loading && (
                <div className='contentwrapperSS'>
                    {data?.results?.length > 0 ? (
                        <>
                            <div className="pageTitleSS">
                                {`Search ${
                                    data?.total_results > 1
                                        ? "results"
                                        : "result"
                                } of '${query}'`}
                            </div>
                            <InfiniteScroll
                                className="contentSS"
                                dataLength={data?.results?.length || []}
                                next={fetchNextPageData}
                                hasMore={pageNum <= data?.total_pages}
                                loader={<Spinner />}
                            >
                                {data?.results.map((item, index) => {
                                    if (item.media_type === "person") return;
                                    return (
                                        <MovieCard
                                            key={index}
                                            data={item}
                                            fromSearch={true}
                                        />
                                    );
                                })}
                            </InfiniteScroll>
                        </>
                    ) : (
                        <span className="resultNotFoundSS">
                            Sorry, Results not found!
                        </span>
                    )}
                </div>
            )}
        </div>
    );
   
}

export default SearchResult
 