let restify = require('restify');

let router = require('./router');

let server = restify.createServer();

server.get('/vcbf', router.vcbf);

server.listen((process.env.PORT || 3000), function(){
    console.log('Server is running... - %s %s', server.name, server.url);
});