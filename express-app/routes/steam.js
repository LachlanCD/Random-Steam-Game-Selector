const express = require('express');
const router = express.Router();
const http = require('http');

/* GET home page. */
router.get('/search/:tag', function(req, res, next) {
    const tag = req.params.tag
    const url = "http://api.steampowered.com/ISteamApps/GetAppList/v0002/?tag=" + tag

    console.log(url)
    
    const steamReq = http.request(url, (steamRes) => {
        let body = [];
        steamRes.on('data',function(chunk) {
            body.push(chunk);
        });
        steamRes.on('end', function() {
            res.writeHead(steamRes.statusCode,{'content-type':'text/html'});
            const bodyString = body.join('');
            const rsp = JSON.parse(bodyString).applist;
            for (let i=0; i<35;i++){
                rsp.apps.shift()
            }
            const s = createPage('Flickr Photo Search',rsp);
            console.log(rsp);
            res.write(s);
            res.end();
        });
    });

    steamReq.on('error', (e) => {
        console.error(e);
    });
    
    steamReq.end();
});

function createPage(title,rsp) {

    //Headers and opening body, then main content and close
    const str = '<!DOCTYPE html>' +
    '<html><head><title>Flickr JSON</title></head>' +
    '<body>' +
    '<h1>' + title + '</h1>' +
    'Total number of entries is: ' + rsp.apps + '</br>' +
    '</body></html>';
    return str;
   } 

module.exports = router;
