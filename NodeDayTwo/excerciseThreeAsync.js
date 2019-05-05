const http = require('http');
const fs = require('fs');
const { Subject } = require('rxjs');

const server = http.createServer();
const subject$ = new Subject();


function getFile(){
    return new Promise(function(resolve, reject){

        fs.readFile('./book.pdf', function(err, data){

            if(err)
            {
                reject(err);
                return;
            }

            resolve(data);
        });

    });
}

function sendFile(obj) {

    obj.res.writeHead(200, {'Content-Type': 'application/pdf'});
    getFile().then((data) => {obj.res.end(data)}).catch(err => {console.log(err)});
}

subject$.subscribe(sendFile);

server.on('request', (request, response) => {

    if(request.url === '/favicon.ico'){
        response.writeHead(200, {'Content-Type':'image/x-icon'});
        response.end();
        return;
    }

    subject$.next({req:request, res:response});

});

server.listen(1616);

// Time To First Byte
// 900ms in Chrome
// 400ms in Mozilla
