import { useSearchParams } from "react-router-dom";
import { GETData } from "../data/GETGame";
import { useState, useEffect } from "react";


export default function News(){
    const [searchParams] = useSearchParams();
    const query = searchParams.get("query");
    const url = `http://localhost:8000/news/${query}`

    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try{
                const results = await GETData(url);
                console.log(results)
                setResults(results);
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