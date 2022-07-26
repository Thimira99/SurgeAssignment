// import validator Schemas
const express = require('express');

const schema = require('./users.schema');
// import controllers
const controller = require('./users.controller');
// import Validator class
const validator = require('../../validators/validator');
// Import Express
// user router
const router = express.Router();
// import permission
const {
	users_create,
	users_get_all,
	users_get_by_id,
	users_login_email,
	users_remove,
	users_update,
} = require('./users.permission').permission_list;

// get all
router
	.route(users_get_all.path)
	.get(validator.validateHeader(users_get_all.granted), controller.getAll);

// get single object by id
router
	.route(users_get_by_id.path)
	.get(controller.getOne);

// create object
router.route(users_create.path).post(
	validator.validateHeader(users_create.granted),
	validator.validateBody(schema.create),
	controller.createUser
);

// login
router
	.route(users_login_email.path)
	.post(validator.validateBody(schema.login), controller.login);

// update object
router
	.route(users_update.path)
	.put(validator.validateBody(schema.put), controller.put);

// delete object
router
	.route(users_remove.path)
	.delete(validator.validateHeader(users_remove.granted), controller.delete);

module.exports = router;
