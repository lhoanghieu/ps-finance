let restify = require('restify');

let router = require('./router');


let server = restify.createServer();

server.get('/vcbf-tbf', router.vcbf_tbf);

server.listen(8080, function(){
    console.log('Server is running... - %s %s', server.name, server.url);
});