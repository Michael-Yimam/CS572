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

/**
 * What I believe caused the slow response ofr these way of reading a file is that;
 * since we are using synchronous way of reading file, the code that reads the file
 * have to wait for the stack to be empty, which might take long time if there are
 * lots of frames in the stack. But in synchronous file reading, the code will be
 * inserted to the stack frame without waiting.
 *
 */
