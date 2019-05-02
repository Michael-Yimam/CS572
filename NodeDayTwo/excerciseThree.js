var dns = require('dns');

dns.resolve4('www.mum.edu', async (err,x) => {
    console.log(await JSON.stringify(x))
});