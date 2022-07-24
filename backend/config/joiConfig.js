const joi = require('joi');

const id = joi.object().keys({
	id: joi.string().alphanum().min(24).max(24).required(),
});

const pagination = {
	limit: joi.number().integer().min(0),
	offset: joi.number().integer().min(0),
};

module.exports = {
	id,
	pagination,
};
