import { GETData } from "../data/GETGame";
import React, { useState } from "react";
import Card from "../components/Card";
import { fetchConfig } from "../utils/fetchConfig";

export default function RandGames({ setBackground }) {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const route = "/steam"

    const handleClick = async () => {
        setGames([])
        setLoading(true);
        setError(false);
        try{
            const url = await fetchConfig() + route
            const games = await GETData(url);
            setGames(games);
        } catch (error) {
            setError(true);
            console.log(error);
        }
        setLoading(false);
    }

    return(
        <div className="text-white">
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 xl:grid-cols-3 xl:gap-x-20">
                {games && games.map((game) => ( <Card key={game.steam_appid} game={game} setBackground={setBackground}/>))}
            </div>
            {loading && <p>Loading...</p>}
            {error && <p>Oops, something went wrong!</p>}
            <div className="py-20 text-center">
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
        </div>
)};