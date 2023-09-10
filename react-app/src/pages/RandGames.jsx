import { GETData } from "../data/GETGame";
import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import { fetchConfig } from "../utils/fetchConfig";

export default function RandGames() {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [buttonText, setButtonText] = useState("Get your games");

    useEffect(() => {
        const cachedData = localStorage.getItem("games");
        if(cachedData){
            setGames(JSON.parse(cachedData));
            setButtonText("Refresh")
        } 
    }, []);

    const route = "/steam"

    const handleClick = async () => {
        setButtonText("Refresh")
        setGames([])
        setLoading(true);
        setError(false);
        try{
            const url = await fetchConfig() + route
            const games = await GETData(url);
            setGames(games);
            localStorage.setItem("games", JSON.stringify(games))
        } catch (error) {
            setError(true);
            console.log(error);
        }
        setLoading(false);
    }

    return(
        <div className="text-white">
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 xl:grid-cols-3 xl:gap-x-20">
                {games && games.map((game) => ( <Card key={game.steam_appid} game={game} />))}
            </div>
            {loading && <p>Loading...</p>}
            {error && <p>Oops, something went wrong!</p>}
            <div className="py-20 text-center">
                <button
                className="bg-sky-900 hover:bg-sky-700 hover:scale-110 text-white font-bold py-2 px-4 rounded"
                disabled={loading}
                onClick={handleClick}
                >
                {buttonText}
                </button>
                <div className="mt-2" />
                <div className="mt-2" />
            </div>
        </div>
)};