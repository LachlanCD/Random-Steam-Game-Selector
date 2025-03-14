import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";

// returns the navigation options for switching between game info, videos and news articles
export default function PageSelector(currentPage) {

    const [game, setGame] = useState({});
    const linkToGame = `/gameInfo/?id=${game.steam_appid}`;
    const linkToVideos = `/youtube/?query=${game.name}`;
    const linkToNews = `/news/?query=${game.name}`;
    const selectedBg = "bg-[#082f49]";
    const unselectedBg = "bg-[#23406e]";
    const buttonStyle = "rounded-full border-2 border-black text-white w-32 h-12 text-center hover:scale-110 ";
    
    // use effect to retrieve the current game from local storage rather than re-querying each time
    useEffect(() => {
        const cachedData = localStorage.getItem("curGame");
        if(cachedData){
            setGame(JSON.parse(cachedData));
        } 
    }, [localStorage.getItem("curGame")]);

    return (
        <div>
        <div className="sm:grid-cols-1 md:grid-cols-3 gap-x-20 gap-y-2 flex items-center justify-center absolute top-24 left-20 right-20 ">
            <button className={buttonStyle.concat((currentPage.currentPage === 'gameInfo') ? selectedBg : unselectedBg)}>
                <Link to={linkToGame}> GameInfo </Link>
            </button>
            <button className={buttonStyle.concat((currentPage.currentPage === 'videos') ? selectedBg : unselectedBg)}>
                <Link to={linkToVideos}> Videos </Link>
            </button>
            <button className={buttonStyle.concat((currentPage.currentPage === 'news') ? selectedBg : unselectedBg)}>
                <Link to={linkToNews}> News </Link>
            </button>
        </div>
        <div className="mb-20"></div>
        </div>
    );
};
