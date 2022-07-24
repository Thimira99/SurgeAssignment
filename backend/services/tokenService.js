const jwt = require('jsonwebtoken');

const { secret } = require('../config/secret');

module.exports = {
	// return jwt token
	toAuthJSON(
		id,
		accountType,
		firstName,
		lastName,
		email,
		mobile,
		dateOfBirth,
		status
	) {
		return jwt.sign(
			{
				id,
				firstName,
				lastName,
				dateOfBirth,
				accountType,
				status,
				mobile,
				email,
				exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60 * 365, // set token expiration time to one minute
			},
			secret
		);
	},
};
