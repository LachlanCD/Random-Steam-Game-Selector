// api key 792e9726768442e2abdd34239b0337be

const NEWS_API_KEY = process.env.NEWS_API_KEY;

const express = require('express');
const axios = require('axios');
const router = express.Router();

/* GET home page. */
router.get('/:query', async function(req, res, next) {
    const options = createNewsOptions(req.params.query);
    const url = `https://${options.hostname}${options.path}`;
    console.log(url)

    try{
        const vidList = await axios.get(url);

        res.json(vidList.data);

    } catch (error) {
        console.log(error)
    }
});

const news = {
    sortBy: 'popularity',
    pageSize: '100',
    api_key: "792e9726768442e2abdd34239b0337be",
};

function createNewsOptions(query) {

    const options = {
        hostname: 'newsapi.org',
        port: 443,
        path: '/v2/everything?',
        method: 'GET'
    }

    const str = 'q=' + query+
        '&sortBy=' + news.sortBy +
        '&pageSize=' + news.pageSize +
        '&apiKey=' + news.api_key;

    options.path += str;
    return options;
}

module.exports = router;
