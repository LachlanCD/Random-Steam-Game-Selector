const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

const express = require('express');
const axios = require('axios');
const router = express.Router();

/* GET home page. */
router.get('/:query', async function(req, res, next) {
    const options = createYTOptions(req.params.query);
    const url = `https://${options.hostname}${options.path}`;

    try{
        const vidList = await axios.get(url);
        console.log(vidList.data)

        res.json(vidList.data);

    } catch (error) {
        console.log(error)
    }
});

const youtube = {
    part: 'snippet',
    results: '25',
    api_key: "AIzaSyAJxzcsGj_2q3mtYT3I61W4EUy_vdlHER0",
};

function createYTOptions(query) {

    const options = {
        hostname: 'youtube.googleapis.com',
        port: 443,
        path: '/youtube/v3/search?',
        method: 'GET'
    }

    const str = 'part=' + youtube.part +
        '&maxResults=' + youtube.results +
        '&q=' + query+
        '&key=' + youtube.api_key;

    options.path += str;
    return options;
}

module.exports = router;
