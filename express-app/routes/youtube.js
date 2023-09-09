const express = require('express');
const axios = require('axios');
const router = express.Router();

/* GET home page. */
router.get('/:query', async function(req, res, next) {
    const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
    const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${req.params.query}&key=${YOUTUBE_API_KEY}`;

    try{
        const vidList = await axios.get(url);

        res.json(vidList.data.items);

    } catch (error) {
        console.log(error)
    }
});

module.exports = router;
