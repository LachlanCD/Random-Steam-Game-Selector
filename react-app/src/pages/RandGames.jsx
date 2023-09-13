import { GETData } from "../data/GETData";
import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import { fetchConfig } from "../utils/fetchConfig";

// page to display the random games
export default function RandGames() {
    // assign default variables
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [buttonText, setButtonText] = useState("Get your games");

    // check if there are games stored in local storage and utilise them if there are
    useEffect(() => {
        const cachedData = localStorage.getItem("games");
        if(cachedData){
            setGames(JSON.parse(cachedData));
            setButtonText("Refresh")
        } 
    }, []);

    const route = "/steam"

    // when the button is clicked reset the currently stored games and retrieve 3 more from the express API 
    const handleClick = async () => {
        setButtonText("Refresh")
        setGames([])
        setLoading(true);
        setError(false);
        try{
            const url = await fetchConfig() + route
            const games = await GETData(url);
            setGames(games);
            localStorage.setItem("games", JSON.stringify(games)); // set the games in local storage 
        } catch (error) {
            setError(true);
            console.log(error);
        }
        setLoading(false);
    }

    return(
        <div className="text-white">
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 xl:grid-cols-3 xl:gap-x-20">
                {/* generate the game cards */}
                {games && games.map((game) => ( <Card key={game.steam_appid} game={game} />))} 
            </div>
            {loading && <p className="text-center">Loading...</p>}
            {error && <p className="text-center">Oops, something went wrong!</p>}
            <div className="py-20 text-center">
                <button
                className="bg-sky-900 hover:bg-sky-700 hover:scale-110 text-white font-bold py-2 px-4 rounded-full border border-black"
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