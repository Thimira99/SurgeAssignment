// import validator class
const joi = require('joi');
// import permission list
const permissionList = require('../../config/permissionConfig').userRoles;

// create object schema
module.exports.create = joi.object().keys({
	firstName: joi.string().required(),
	lastName: joi.string().required(),
	dateOfBirth: joi.string(),
	email: joi.string().required(),
	mobile: joi.string(),
	password: joi.string().required(),
	accountType: joi.string().valid(permissionList.admin, permissionList.student),
});

// update object schema
module.exports.put = joi.object().keys({
	id: joi.string().required().max(24).min(24),
	firstName: joi.string(),
	lastName: joi.string(),
	dateOfBirth: joi.string(),
	password: joi.string(),
	email: joi.string(),
	mobile: joi.string(),
	status: joi.boolean().required(),
	accountType: joi.string().valid(permissionList.admin, permissionList.student),
});

// login
module.exports.login = joi.object().keys({
	password: joi.string().required(),
	email: joi.string().required(),
});
