import { useSearchParams } from "react-router-dom";
import { GETData } from "../data/GETGame";
import { useState, useEffect } from "react";

export default function GameInfo(){
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const url = `http://localhost:8000/stea/${id}`

    const [game, setGame] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try{
                const game = await GETData(url);
                setGame(game);
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
            <p>fuck</p>
            {loading && <p>Loading...</p>}
            {error && <p>Oops, something went wrong!</p>}
            {game && <p>{game.name}</p>}
        </div>
    )
}