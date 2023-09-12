import { useSearchParams } from "react-router-dom";
import { GETData } from "../data/GETGame";
import { useState, useEffect } from "react";
import { fetchConfig } from "../utils/fetchConfig";


export default function News(){
    const [searchParams] = useSearchParams();
    const query = searchParams.get("query");
    const route = `/news/${query}`

    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);


    useEffect(() => {
        async function fetchData() {
            try{
                const url = await fetchConfig() + route
                const results = await GETData(url);
                const refinedResults = refineResults(results);
                setResults(refinedResults);
            } catch (error) {
                setError(true);
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    return(
        <div className="text-white">
            <p>news</p>
            {loading && <p>Loading...</p>}
            {error && <p>Oops, something went wrong!</p>}
            {results && results.map((result) => (<div>{result.title}</div>))}
        </div>
    )
}

function refineResults(results){
    return results.map((result) => ({
        title: result.title,
        author: result.author,
        description: result.description,
        publishedAt: result.publishedAt,
        image: result.urlToImage,
        url: result.url
    }))
}