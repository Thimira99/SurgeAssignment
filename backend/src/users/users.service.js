
// import bycrypt to hash the password
const bcrypt = require('bcryptjs');

// jwt token service
const tokenService = require('../../services/tokenService');

// generate random password
const shortid = require('shortid');

// collection name for the errors
const collectionName = 'user';


// POST Login
module.exports.loginWithEmail = async (obj) => {
	return new Promise(async (resolve, reject) => {
		try {
			// check the user exist with given email
			const perviousUserData = await this.getByEmail(obj.email);

			// if there is no previous user found
			if (!perviousUserData || perviousUserData.length === 0) {
				reject(`Invalid email`);
			} else {
				const {
					_id,
					firstName,
					lastName,
					dateOfBirth,
					accountType,
					status,
					mobile,
					email,
					password,
				} = perviousUserData[0];

				// for the first time login
				if (!status && obj.password === password) {
					// return created token
					resolve(
						tokenService.toAuthJSON(
							_id,
							accountType,
							firstName,
							lastName,
							email,
							mobile,
							dateOfBirth,
							status
						)
					);
				}

				// compare password
				else if (bcrypt.compareSync(obj.password, password)) {
					// return created token
					resolve(
						tokenService.toAuthJSON(
							_id,
							accountType,
							firstName,
							lastName,
							email,
							mobile,
							dateOfBirth,
							status
						)
					);
				} else {
					reject('Invalid password');
				}
			}
		} catch (error) {
			reject(error);
		}
	});
};
