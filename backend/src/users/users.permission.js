// import permission list
const { admin, student } = require('../../config/permissionConfig').userRoles;

module.exports.permission_list = {
	users_get_all: {
		path: '/',
		granted: [admin],
	},
	users_get_by_id: {
		path: '/:id',
		granted: [admin],
	},
	users_create: {
		path: '/create',
		granted: [admin],
	},
	users_login_email: {
		path: '/login',
	},
	users_update: {
		path: '/',
		granted: [admin, student],
	},
	users_remove: {
		path: '/:id',
		granted: [admin],
	},
};
