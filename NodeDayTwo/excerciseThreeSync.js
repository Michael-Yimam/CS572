const http = require('http');
const fs = require('fs');

const server = http.createServer();

server.on('request', (request, response) => {

    if(request.url === '/favicon.ico'){
        response.writeHeader(200, {'Content-Type': 'image/x-icon'});
        response.end();
        return;
    }

    const file = fs.readFileSync('./book.pdf');
    response.writeHeader(200, {'Content-Type': 'application/pdf'});
    response.end(file);

});

server.listen(3000);

// Time To First Byte
// 100ms in Chrome
// 100ms in Mozilla