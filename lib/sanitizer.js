'use strict';

var _ = require('lodash');

exports.concept = function(item) {
	item = _.omit(item, 'context', 'countWords', 'key');
	if (item.value === item.atonic) {
		delete item.atonic;
	}
	return item;
};

exports.concepts = function(items) {
	items = items || [];
	return items.map(exports.concept);
};

exports.entity = function(item) {
	item = _.omit(item, 'keys', 'wikiId_key', 'slug_key', 'culture');
	if (item.concepts) {
		item.concepts = exports.concepts(item.concepts);
	}
	return item;
};

exports.entities = function(items) {
	items = items || [];
	return items.map(exports.entity);
};

exports.entitize = function(result) {
	result = result || {};
	result.entities = exports.entities(result.entities);
	result.concepts = exports.concepts(result.concepts);

	return result;
};
