import { useSearchParams } from "react-router-dom";
import { GETData } from "../data/GETGame";
import { useState, useEffect } from "react";
import { fetchConfig } from "../utils/fetchConfig";
import PageSelector from "../components/PageSelector";

export default function GameInfo(){
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const route = `/steam/${id}`

    const [game, setGame] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const cachedData = JSON.parse(localStorage.getItem("games"));
        const game = cachedData.find(game => game.steam_appid === Number(id));
        if (game) {
            game.about_the_game = removeHTMLTagsAndDecode(game.about_the_game);
            setGame(game);
            setLoading(false);
            return
        }
        async function fetchData() {
            try{
                const url = await fetchConfig() + route
                const game = await GETData(url);
                game.about_the_game = removeHTMLTagsAndDecode(game.about_the_game);
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

    useEffect(() => {
        localStorage.setItem("curGame", JSON.stringify(game))
    }, [game])  
    
    return(
        <div className="text-white ">
            < PageSelector currentPage = "gameInfo"/>
            {loading && <p>Loading...</p>}
            {error && <p>Oops, something went wrong!</p>}
            {game.steam_appid && page(game)}
        </div>
    )
}

function removeHTMLTagsAndDecode(html) {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = html;
    return tempElement.textContent || tempElement.innerText;
}

function page(game){
    let price = "";
    const gameGenres = game.genres.slice(0,5);
    try{ price = game.price_overview.final_formatted;}
    catch { price = "Free";}
    return (
        <div>
        <div className="grid grid-cols-1 gap-x-10 gap-y-10 lg:grid-cols-2 mx-28 mb-4">
            <div className="">
                <img
                    src={game.header_image}
                    alt={"game image"}
                    className="object-cover object-center rounded-md"
                />
            </div>
            <div className="max-w-[460px] space-y-4">
                <div className="border rounded-md py-2 bg-[#8A6C24]">
                    <h2 className="text-xl font-semibold mx-2">{game.name}</h2>
                </div>
                <div className="text-[9px] grid md:grid-cols-2 border rounded-md py-2 bg-slate-800 text-center">
                    <p className="mx-2">Developer: {game.developers[0]}</p>
                    <p className="mx-2">Publisher: {game.publishers[0]}</p>
                </div>
                <div className="text-[9px] grid md:grid-cols-2 border rounded-md py-2 bg-slate-800 text-center">
                    <p className="mx-2">Release Date: {game.release_date.date}</p>
                    <p className="mx-2">Price: {price}</p>
                </div>
                <div className={"text-[9px] grid md:grid-cols-2 lg:grid-cols-".concat(gameGenres.length)}>
                    {gameGenres.map((category) => (categoryWidget(category.description)))}
                </div>
            </div>
        </div>
        <div className="text-[11px] border rounded-md py-2 bg-slate-800 mx-28 mb-20">
            <p className="mx-2">{game.about_the_game}</p>
        </div>
    </div>
    )
}

function categoryWidget(name){
    return (
        <div className="text-[9px] border rounded-md py-2 bg-slate-800 text-center">
            <p>{name}</p>
        </div>
    )
}