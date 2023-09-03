// api key 792e9726768442e2abdd34239b0337be

const express = require('express');
const axios = require('axios');
const router = express.Router();

/* GET home page. */
router.get('/:query', async function(req, res, next) {
    const NEWS_API_KEY = process.env.NEWS_API_KEY;
    const url = `https://newsapi.org/v2/everything?q=${req.params.query}&sortBy=popularity&pageSize=100&apiKey=${NEWS_API_KEY}`;

    try{
        const vidList = await axios.get(url);
        const data = vidList.data.articles
        const filteredData = data.filter((item) => item.content !== "[Removed]")
        res.json(filteredData);

    } catch (error) {
        console.log(error)
    }
});

module.exports = router;
