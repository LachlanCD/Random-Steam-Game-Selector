import { useSearchParams } from "react-router-dom";
import { GETData } from "../data/GETData";
import { useState, useEffect } from "react";
import { fetchConfig } from "../utils/fetchConfig";
import {removeHTMLTagsAndDecode} from "../utils/formatting";
import VideoCard from "../components/VideoCard";
import PageSelector from "../components/PageSelector";
import { fixDate } from "../utils/formatting";

// generate the page for youtube results
export default function Youtube(){
    // set the url request for the API
    const [searchParams] = useSearchParams();
    const query = searchParams.get("query").concat(" steam game");
    const route = `/youtube/${query}`

    // set default variables
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [empty, setEmpty] = useState(false);

    // retrieve the information from the API 
    useEffect(() => {
        async function fetchData() {
            try{
                const url = await fetchConfig() + route
                const results = await GETData(url);
                const refinedResults = refineResults(results);
                setResults(refinedResults); // change the returned JSON object to be the values specified
                results.length > 1 ? setEmpty(false) : setEmpty(true); // if the results are empty display error message
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
            <PageSelector currentPage = "videos"/>
            {loading && <p className="text-center pb-40">Loading...</p>}
            {error && <p className="text-center pb-40">Oops, something went wrong!</p>}
            {empty && <p className="pb-40">We were'nt able to find any recent articles on this topic</p>}
            {results && results.map((result, index) => (<VideoCard key={index} content={result}/>))}
        </div>
    )
}

// chagne the JSON object to work with the videocard component
function refineResults(results){
    return results.map((result) => ({
        title: removeHTMLTagsAndDecode(result.snippet.title),
        author: removeHTMLTagsAndDecode(result.snippet.channelTitle),
        description: removeHTMLTagsAndDecode(result.snippet.description),
        publishedAt: fixDate(result.snippet.publishedAt),
        image: result.snippet.thumbnails.medium.url,
        url: "https://www.youtube.com/watch?v=".concat(result.id.videoId)
    }))
}