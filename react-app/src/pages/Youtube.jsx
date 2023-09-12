import { useSearchParams } from "react-router-dom";
import { GETData } from "../data/GETGame";
import { useState, useEffect } from "react";
import { fetchConfig } from "../utils/fetchConfig";


export default function Youtube(){
    const [searchParams] = useSearchParams();
    const query = searchParams.get("query");
    const route = `/youtube/${query}`

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

    console.log(results)

    return(
        <div className="text-white">
            <p>youtube</p>
            {loading && <p>Loading...</p>}
            {error && <p>Oops, something went wrong!</p>}
            {results && results.map((result) => (<div>{result.title}</div>))}
        </div>
    )
}

function refineResults(results){
    return results.map((result) => ({
        title: result.snippet.title,
        author: result.snippet.cannelTitle,
        description: result.snippet.description,
        publishedAt: result.snippet.publishedAt,
        image: result.snippet.thumbnails.high.url,
        url: "https://www.youtube.com/watch?v=".concat(result.id.videoId)
    }))
}