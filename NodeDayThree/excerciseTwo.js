const http = require('http');
const { fork } = require('child_process');
const server = http.createServer();

server.on('request', (req, res) => {

    const childProcess = fork('./fileReadOperation.js');
   childProcess.send('dimwit');
   childProcess.on('message', (sum) => {
       res.writeHead(200, {'Content-Type': 'text/plain'});
       res.write(sum);
       res.end();
   });
});

server.listen(3000);