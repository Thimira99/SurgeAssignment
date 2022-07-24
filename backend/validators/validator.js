// import validator class
const joi = require('joi');

// import json web token library
const jwt = require('jsonwebtoken');

// import json web token secret
const { secret } = require('../config/secret');

// import permission class
const permission = require('../services/accessService');


// validate token
const getTokenFromHeader = (req) => {
	if (
		req.headers.authorization &&
		req.headers.authorization.split(' ')[0] === 'Token'
	) {
		return req.headers.authorization.split(' ')[1];
	}
	return null;
};

// validate the API request body according to the schema defined
module.exports.validateBody = function (schema) {
	return (req, res, next) => {
		// validate the API request body according to the schema defined
		const result = schema.validate(req.body);

		if (result.error) {
			return res.status(422).json({
				status: false,
				msg: result.error.details[0].message,
			});
		}
		next();
	};
};

// validate the API request header
module.exports.validateHeader = (grantedArray) => {
	return (req, res, next) => {
		// eslint-disable-next-line consistent-return
		return jwt.verify(getTokenFromHeader(req), secret, async (err, decoded) => {
			if (err) {
				return res.status(422).json({
					status: false,
					msg: 'Invalid Token',
				});
			}
			try {
				await permission.validity(decoded.accountType, grantedArray);
				next();
			} catch (error) {
				return res.status(422).json({
					status: false,
					msg: error,
				});
			}
		});
	};
};

