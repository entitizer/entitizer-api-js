'use strict';

var entitizer = require('entitizer');
var sanitizer = require('./sanitizer');

function routeConcepts(req, res, next) {
	var context = {
		lang: req.params.lang,
		lang: req.params.country,
		text: req.params.text
	};
	var options = req.params.options;

	entitizer.concepts(context, options)
		.then(function(concepts) {
			concepts = sanitizer.concepts(concepts);
			res.send({
				concepts: concepts
			});
			next();
		}).catch(next);
}

function routeEntitize(req, res, next) {
	var context = {
		text: req.params.text,
		lang: req.params.lang,
		country: req.params.country
	};
	var options = req.params.options;

	entitizer.entitize(context, options)
		.then(function(result) {
			result = sanitizer.entitize(result);

			res.send(result);
			next();
		}).catch(next);
}

function routeFindEntity(req, res, next) {
	var name = req.params.name;
	var options = req.params.options;
	var lang = req.params.lang;

	entitizer.findEntity(name, lang, options)
		.then(function(entities) {
			entities = sanitizer.entities(entities);
			res.send({
				entities: entities
			});
			next();
		}).catch(next);
}

function routeCultures(req, res, next) {
	var cultures = entitizer.cultures();
	res.send({
		cultures: cultures
	});
	next();
}

function routeEntityById(req, res, next) {
	var id = req.params.id;
	var options = req.params.options;

	entitizer.entityById(id, options)
		.then(function(entity) {
			entity = entity && sanitizer.entity(entity) || null;
			if (entity) {
				res.send(entity);
				next();
			} else {
				res.status(404);
			}
		}).catch(next);
}

function routeEntityByName(req, res, next) {
	var name = req.params.name;
	var options = req.params.options;
	var context = {
		lang: req.params.lang,
		lang: req.params.country
	};

	entitizer.entityByName(name, context, options)
		.then(function(entity) {
			entity = entity && sanitizer.entity(entity) || null;
			if (entity) {
				res.send(entity);
				next();
			} else {
				res.status(404);
			}
		}).catch(next);
}

module.exports = function(server) {

	server.get({
		path: '/concepts',
		flags: 'i'
	}, routeConcepts);
	server.post({
		path: '/concepts',
		flags: 'i'
	}, routeConcepts);

	server.get({
		path: '/entitize',
		flags: 'i'
	}, routeEntitize);
	server.post({
		path: '/entitize',
		flags: 'i'
	}, routeEntitize);

	server.get({
		path: '/findEntity',
		flags: 'i'
	}, routeFindEntity);

	server.get({
		path: '/cultures',
		flags: 'i'
	}, routeCultures);

	server.get({
		path: '/entityById/:id',
		flags: 'i'
	}, routeEntityById);

	server.get({
		path: '/entityById',
		flags: 'i'
	}, routeEntityById);

	server.get({
		path: '/entityByName/:name',
		flags: 'i'
	}, routeEntityByName);

	server.get({
		path: '/entityByName',
		flags: 'i'
	}, routeEntityByName);

};
