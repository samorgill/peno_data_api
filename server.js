var restify = require('restify');

var config = require('./server.config');
var pkg = require('./package.json');

var server = restify.createServer({
    name: pkg.name,
    version: pkg.version
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
restify.CORS.ALLOW_HEADERS.push('accept');
restify.CORS.ALLOW_HEADERS.push('sid');
restify.CORS.ALLOW_HEADERS.push('lang');
restify.CORS.ALLOW_HEADERS.push('origin');
restify.CORS.ALLOW_HEADERS.push('withcredentials');
restify.CORS.ALLOW_HEADERS.push('x-requested-with');
server.use(restify.CORS());

server.post('/api/data');

server.listen(config.appPort, function(){
    logger.info({
        server: {
            name: server.name,
            url: server.url,
        }
    }, 'server started');

});