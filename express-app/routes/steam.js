const express = require('express');
const axios = require('axios');
const router = express.Router();

const listurl = "http://api.steampowered.com/ISteamApps/GetAppList/v2/";
const storeurl = "https://store.steampowered.com/api/appdetails?appids=";


/* GET home page. */
router.get('/search/', async function(req, res, next) {
    try{
        const gameList = await axios.get(listurl);
        const processedGameList = processGameList(gameList.data.applist.apps);

        const randGames = await getGames(processedGameList);

        res.json(randGames);

    } catch (error) {
        console.log(error)
    }
    
    
});

// Remove filler entries from steam API
function processGameList(gameList){

    for (let i=0; i<35; i++){
        gameList.shift();
    }

    return gameList
}

// Get the games from the game list
async function getGames(gameList) {

    let randGames = [];
    let prevGames = [];

    try {
        while(randGames.length < 3){

            const index = Math.floor(Math.random() * gameList.length);
            if(prevGames.includes(index)) continue;
            const appid = gameList[index].appid;

            const gameData = await getGameData(appid);
            if(gameData === undefined) continue;

            randGames.push(gameData);
            prevGames.push(index);
        }

    } catch (error) {
        throw error
    }

    return randGames;
}
  
// Get the game data with the appid
async function getGameData(appid) {
    try {
        const gameData = await axios.get(storeurl + appid);
        const gameDataRefined = gameData.data[String(appid)]

        if (gameDataRefined.success === false) return;

        console.log(gameDataRefined.data.type)
        if (gameDataRefined.data.type !== "game") return;
        if (gameDataRefined.data.short_description === '') return;

        return gameDataRefined.data;
    } catch (error) {
        throw error;
    }
}

module.exports = router;
