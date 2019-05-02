var https = require('http');
var dns = require('dns');

dns.resolve4('www.mum.edu', (err,x) => {
    Promise.resolve(x).then(console.log(JSON.stringify(x)));
});