const http = require('http');
const fs = require('fs');
const { Subject } = require('rxjs');

const subject$ = new Subject();
const server = http.createServer();

function readFile(obj){

    const file = fs.createReadStream('./book.pdf');
    obj.res.writeHeader(200, {'Content-Type':'application/pdf'});

            file.pipe(obj.res);

}

subject$.subscribe(readFile);

server.on('request', (request, response) => {

    if(request.url === '/favicon.ico'){
        response.writeHeader(200, {'Content-Type': 'image/x-icon'});
        response.end();
        return;
    }

    subject$.next({req: request, res: response});

});

server.listen(3030);

// Time To First Byte
// 20ms in Chrome
// 10ms in Mozilla