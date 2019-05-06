const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

async function getRandomUsers(){
    try{
        return await axios.get('https://randomuser.me/api/?results=10');
    }catch(err){
        console.log(err);
    }
}

app.set('x-powered-by', false);     // hide the platform from the clients
app.set('strict routing', true);    // trailing slashes create different url
app.enable('case sensitive routing');   // although not advised, this will make the url case sensitive

app.get('/users', function(request, response){

    /**
     *  private bypasses intermediaries like proxy servers
     *  maxage=86400 makes the browser to cache the response for a day
     *  s-maxage=0 will make proxies not to cache the response
     */
    response.setHeader('Cache-Control', 'private, maxage=86400, s-maxage=0');
    response.contentType('application/json');

    getRandomUsers()
        .then( data => {
            response.send(JSON.stringify(data.data));
        }).catch( err => {
            console.log(err);
        });

});

app.listen(port);