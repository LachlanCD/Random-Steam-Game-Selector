import { useSearchParams } from "react-router-dom";
import { GETData } from "../data/GETData";
import { useState, useEffect } from "react";
import { fetchConfig } from "../utils/fetchConfig";
import PageSelector from "../components/PageSelector";
import { removeHTMLTagsAndDecode } from "../utils/formatting";

// page that returns the info on the selected game
export default function GameInfo(){
    // set the current route for querying the api
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const route = `/steam/${id}`

    // set the game
    const [game, setGame] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    // use effect for retrieving the game 
    useEffect(() => {
        // if the game is in local storage return it
        const cachedData = JSON.parse(localStorage.getItem("games"));
        const game = cachedData.find(game => game.steam_appid === Number(id));
        if (game) {
            // the steam API formats their descriptions as HTML so this has to be fixed and the characters need to be converted
            game.about_the_game = removeHTMLTagsAndDecode(game.about_the_game);
            setGame(game);
            setLoading(false);
            return
        }
        // if the game couldnt be found in local storage, retrieve it from the steam API
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

    // update the current game in local storage
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

// formatting of the game information on the page
function page(game){
    // format price and genres as if price is free it the attribute wont be listed
    let price = "";
    const gameGenres = game.genres.slice(0,4);
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
                <div className="space-y-2">
                    <div className="text-[9px] grid lg:grid-cols-2 border rounded-full py-2 bg-slate-800 text-center">
                        <p className="mx-2">Developer: {game.developers[0]}</p>
                        <p className="mx-2">Publisher: {game.publishers[0]}</p>
                    </div>
                    <div className="text-[9px] grid lg:grid-cols-2 border rounded-full py-2 bg-slate-800 text-center">
                        <p className="mx-2">Release Date: {game.release_date.date}</p>
                        <p className="mx-2">Price: {price}</p>
                    </div>
                    <div className="">
                        <div className={"grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 justify-items-center"}>
                            {gameGenres.map((category) => (categoryWidget(category)))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="text-[11px] border rounded-md py-2 bg-slate-800 mx-28 mb-20">
            <p className="mx-2">{game.about_the_game}</p>
        </div>
    </div>
    )
}

// formatting of the game categories
function categoryWidget(category){
    return (
        <div key={category.id} className="text-[9px] border h-[30px] w-[100px] rounded-full py-2 bg-slate-800 text-center">
            <p>{category.description}</p>
        </div>
    )
}