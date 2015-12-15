'use strict';

require('dotenv').load();

var PORT = process.env.PORT || 8080;

var restify = require('restify');
var routes = require('./routes');
var params = require('./params');

var server = restify.createServer({
	name: 'entitizer',
	version: '0.0.0'
});
server.use(restify.CORS());
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.jsonp());
// server.use(restify.gzipResponse());
server.use(params);

routes(server);

server.listen(PORT, function() {
	console.log('%s listening at %s', server.name, server.url);
});
