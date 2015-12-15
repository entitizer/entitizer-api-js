'use strict';

var Joi = require('joi');
var errors = require('restify').errors;

var SCHEMAS = {
	entitybyid: Joi.object().keys({
		id: Joi.number().required()
	}),
	entitybyname: Joi.object().keys({
		name: Joi.string().required(),
		lang: Joi.string().trim().length(2).required(),
		country: Joi.string().trim().length(2).required()
	}),
	entitize: Joi.object().keys({
		text: Joi.string().required(),
		lang: Joi.string().trim().length(2).lowercase().required(),
		country: Joi.string().trim().length(2).lowercase().required(),
		options: Joi.object().keys({
			quotes: Joi.boolean()
		})
	})
};

module.exports = function(req, res, next) {
	var name = /^\/([\w\d_-]+)/i.exec(req.path());
	if (!name) {
		return next();
	}
	name = name[1].toLowerCase();

	var schema = SCHEMAS[name];

	if (schema) {
		Joi.validate(req.params, schema, {
			allowUnknown: true
		}, function(error, value) {
			if (error) {
				return next(new errors.BadRequestError(error.message));
			}
			req.params = value;
			next();
		});
	} else {
		next();
	}
};
