// import mongoose
const { Schema, model, default: mongoose } = require('mongoose');

// declare model name
const model_name = 'user';

// import permission list
const permissionList = require('../../config/permissionConfig').userRoles;

// users interface
// interface IUser {
// 	id: Number;
// 	firstName: string;
// 	lastName: string;
// 	email: string;
// 	dateOfBirth: Date;
// 	mobile: number;
// 	status: boolean;
// 	password: string;
// 	accountType: String;
// }

// create schema
const schema = new Schema(
	{
		firstName: {
			type: String,
			required: true,
			trim: true,
		},
		lastName: {
			type: String,
			required: true,
			trim: true,
		},
		password: {
			type: String,
			trim: true,
			required: true,
		},
		email: {
			type: String,
			lowercase: true,
			required: true,
			trim: true,
		},
		mobile: {
			type: String,
			required: true,
			trim: true,
		},
		accountType: {
			type: String,
			required: true,
			default: permissionList.admin,
			trim: true,
		},
		status: {
			type: Boolean,
			default: false,
			required: true,
			trim: true,
		},
		dateOfBirth: {
			type: Date,
			required: true,
			trim: true,
		},
	},
	{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

// create modal
const userModel = model(model_name, schema);
module.exports = userModel;
