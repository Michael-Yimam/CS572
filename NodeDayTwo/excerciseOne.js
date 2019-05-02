var dns = require('dns');
dns.resolve4('www.mum.edu', (err, x) => console.log(JSON.stringify(x)));



dns.resolve4('www.mum.edu', (err,x) => {
    Promise.resolve(x).then(console.log(JSON.stringify(x)));
});



dns.resolve4('www.mum.edu', async (err,x) => {
    console.log(await JSON.stringify(x))
});