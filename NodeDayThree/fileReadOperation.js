const fs = require('fs');

process.on('message', (m) => {
    //console.log("inside child process " + m);
    let readFile = fs.createReadStream('./DATA.txt');

    let data = '';
    readFile
        .on('data', function(chunk){
            data += chunk.toString();
        })
        .on('end', function(){
            process.send(data);
        });

});
