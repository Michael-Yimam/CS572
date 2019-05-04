const http = require('http');
const fs = require('fs');
const { Subject } = require('rxjs');

const subject$ = new Subject();

async function readFile(){
    const file = await fs.readFile('./book.pdf');
    return file;
}

function sendFile(obj){
    obj.res.writeHead(200, {'Content-Type': 'application/pdf'});
    obj.res.end(readFile());
}

subject$.subscribe(sendFile);

server.on('request', (request, response) => {

    if(request.url === '/favicon.ico'){
        response.writeHead(200, {'Content-Type':'image/x-icon'});
        response.end();
        return;
    }

    subject$.next({'req':request, 'res':response});

});

server.listen(1616);

subject$.subscribe();