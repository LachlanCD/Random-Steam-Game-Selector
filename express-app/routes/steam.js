const express = require('express');
const axios = require('axios');
const router = express.Router();

const listurl = "http://api.steampowered.com/ISteamApps/GetAppList/v2/";
const storeurl = "https://store.steampowered.com/api/appdetails?appids=";


/* GET three unique games from steam. */
router.get('/', async function(req, res, next) {
    try{
        const gameList = await axios.get(listurl);
        const processedGameList = processGameList(gameList.data.applist.apps);

        let randGames = [];
        let prevGames = [];

        // retrieve the three games from steam
        await getGames(processedGameList, randGames, prevGames);

        // return the three games
        res.json(randGames);
    } catch (err) {
        next(err);
    }    
});

/* GET an individual game from steam. */
router.get('/:id', async function(req, res, next){
    try {
        // retrieve data on app id
        const id = req.params.id
        const gameData = await getGameData(id)

        // check if the game is valid throw error if not
        if(!checkGame(gameData)) throw {status: 400, message: "ID does not correspond to a game or does not exist."}

        // return game data
        res.json(gameData.data);
    } catch (err) {
        next(err);
    }
});

// Remove filler entries from steam API
function processGameList(gameList){
    for (let i=0; i<35; i++){
        gameList.shift();
    }
    return gameList;
}

// Get the games from the game list
async function getGames(gameList, randGames, prevGames) {

    try {
        // get random app id
        const index = Math.floor(Math.random() * gameList.length);
        const appid = gameList[index].appid;

        // retrieve data on app id
        const gameData = await getGameData(appid);

        // check if the game is valid and add to gameData if it is
        if (checkGame(gameData)) randGames.push(gameData.data);
        
        // add the index to the previously found games
        prevGames.push(index);

    } catch (err) {
        throw err;
    }

    // return if there are 3 games
    if (randGames.length === 3) return randGames; 
    // recursively call if not   
    await getGames(gameList, randGames, prevGames);
}
  
// Get the game data with the appid
async function getGameData(appid) {
    try {
        const gameData = await axios.get(storeurl + appid);
        const gameDataRefined = gameData.data[String(appid)]
        return gameDataRefined;
    } catch (err) {
        throw err;
    }
}

// check if the game is valid and a game
function checkGame(gameData) {
    if (gameData.success === false) return false;
    if (gameData.data.type !== "game") return false;
    if (gameData.data.short_description === '') return false;
    return true
}

module.exports = router;
