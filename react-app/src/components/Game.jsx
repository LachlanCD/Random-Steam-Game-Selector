import { GETGames } from "../data/GETGame";
import { useState } from "react";
import Card from "./Card";

export default function Games() {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const url = "http://localhost:8000/steam"

    const handleClick = async () => {
        setLoading(true);
        setError(false);
        try{
            const games = await GETGames(url);
            setGames(games);
        } catch (error) {
            setError(true);
            console.log(error);
        }
        setLoading(false);
    }

    return(
        <div className="bg-[#242424]">
            {games && <Card games={games} />}
            <div className="text-center">
                <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                disabled={loading}
                onClick={handleClick}
                >
                Get your games
                </button>
                <div className="mt-2" />
                <div className="mt-2" />
            </div>
            {loading && <p>Loading...</p>}
            {error && <p>Oops, something went wrong!</p>}
        </div>
    )

}