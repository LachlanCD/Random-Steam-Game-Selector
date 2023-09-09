const express = require('express');
const axios = require('axios');
const router = express.Router();

/* GET news data from query. */
router.get('/:query', async function(req, res, next) {
    const NEWS_API_KEY = process.env.NEWS_API_KEY;
    const url = `https://newsapi.org/v2/everything?q=${req.params.query}&sortBy=popularity&pageSize=100&apiKey=${NEWS_API_KEY}`;

    try{
        // retrieve data
        const vidList = await axios.get(url);
        const data = vidList.data.articles

        // check if the retrieved data is valid
        const filteredData = data.filter((item) => item.content !== "[Removed]")


        // return first 25 valid entries
        res.json(filteredData.slice(0, 25));

    } catch (err) {
        err = {
            status: err.response.status,
            message: err.response.data.message,
        }
        next(err)
    }
});

module.exports = router;
