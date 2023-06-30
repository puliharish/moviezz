import React from "react";


import UseFetch from "../../../useFetch/UseFetch";
import Carousel from "../../../components/car0usel/Carousel";


const Recomded = ({ mediaType, id }) => {
    const { data, loading, error } = UseFetch(
        `/${mediaType}/${id}/recommendations`
    );

    return (
        <Carousel
            title="Recommendations"
            data={data?.results}
            loading={loading}
            endpoint={mediaType}
        />
    );
};

export default Recomded;