const http = require('http');
const { Subject } = require('rxjs');
const { fork } = require('child_process');

const subject = new Subject();
const server = http.createServer();

function readFile(reqRes){
    const childProcess = fork('./fileReadOperation.js');
    childProcess.send('dimwit');
    childProcess.on('message', (file) => { writeResponse(reqRes, file)});
}

subject.subscribe(readFile);

function writeResponse(reqRes, file){
    console.log('document requested');
    reqRes.response.writeHead(200, {'Content-Type': 'text/plain'});
    reqRes.response.end(file);
}

server.on('request', (req, res) => {
    if(req.url === '/favicon.ico'){
        res.writeHead(200, {'Content-Type': 'image/x-icon'});
        res.end();
        console.log('favicon requested');
        return;
    }
    subject.next({request: req, response: res});

});

server.listen(3000);