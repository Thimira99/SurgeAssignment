

// generate random password
const shortid = require('shortid');

// jwt token service
const tokenService = require('../../services/tokenService');

//import model
const userModel = require('./users.model');

// import bycrypt to hash the password
const bcrypt = require('bcryptjs');



const createPasswordHash = (password) => {
	const salt = bcrypt.genSaltSync(10);
	const hash = bcrypt.hashSync(password, salt);
	return hash;
};

// GET all data set
module.exports.getAll = async (req, res) => {
	try {
		const data = await userModel.find();

		return res.json({
			status: true,
			data: {
				count: data.count,
				totalCount: data.totalCount || 0,
				statusCode: res.statusCode,
				value: data.value,
			},
			all: data
		});
	} catch (error) {
		return res.status(422).json({
			status: false,
			msg: error,
		});
	}
};

// GET single object
module.exports.getOne = async (req, res) => {
	try {
		const output = await userModel.findById(req.params.id);
		return res.json({
			status: true,
			data: output,
		});
	} catch (error) {
		return res.status(422).json({
			status: false,
			msg: error,
		});
	}
};


// CREATE single object
module.exports.createUser = async (req, res) => {
	try {
		const { firstName, lastName, email, dateOfBirth, mobile, status, password, accountType } = req.body;

		const data = new userModel({
			firstName,
			lastName,
			email,
			dateOfBirth,
			mobile,
			status,
			password,
			accountType
		});

		// const output = await service.create(req.body);
		const output = await userModel.findOne({ email: data.email });

		if (output) {
			return res.status(422).send({ message: "User exist", status: false });
		} else {
			if (data.accountType !== 'student') {
				data.password = createPasswordHash(data.password);
			} else {
				data.password = shortid.generate();
			}

			data.save();
		}
		return res.json({
			status: true,
			data: data,
		});
	} catch (error) {
		return res.status(422).json({
			status: false,
			msg: error,
		});
	}
};

// LOGIN
module.exports.login = async (req, res) => {
	try {
		const data = req.body;

		const perviousUserData = await userModel.find({ email: data.email });

		// if there is no previous user found
		if (!perviousUserData || perviousUserData.length === 0) {
			return res.status(422).json({
				status: false,
				msg: "Invalid Email",
			});
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
			if (!data.status && data.password === password) {
				// return created token
				return res.json({
					status: true,
					data: tokenService.toAuthJSON(
						_id,
						accountType,
						firstName,
						lastName,
						email,
						mobile,
						dateOfBirth,
						status
					),
				});
			}

			// compare password
			else if (bcrypt.compareSync(data.password, password)) {
				// return created token
				return res.json({
					status: true,
					data: tokenService.toAuthJSON(
						_id,
						accountType,
						firstName,
						lastName,
						email,
						mobile,
						dateOfBirth,
						status
					),
				});
			} else {
				return res.status(422).json({
					status: false,
					msg: "Invalid Password",
				});
			}
		}


	} catch (error) {
		return res.status(422).json({
			status: false,
			msg: error,
		});
	}
};

// PUT single object
module.exports.put = async (req, res) => {
	try {
		const data = req.body;

		if (!data.status) {
			if (!data.password) {
				res.status(422).json({
					status: false,
					msg: 'Password is required'
				});
			}
			data.status = true;
		}

		data.password = createPasswordHash(data.password);

		const output = await userModel.findOneAndUpdate({ _id: data.id }, data, { new: true, safe: true });

		if (!output) {
			res.status(422).json({
				status: false,
				msg: 'No data found from given user id'
			});
		} else {
			return res.json({
				status: true,
				data: output,
			})
		}
	} catch (error) {
		return res.status(422).json({
			status: false,
			msg: error,
		});
	}
};

// Delete single object
module.exports.delete = async (req, res) => {
	try {
		console.log("adee" + data);

		const data = await userModel.findOneAndDelete({ _id: req.params.id });

		if (!data) {
			return res.status(422).json({
				status: false,
				msg: "No data found from given user id",
			});
		} else {
			return res.json({
				status: true,
				data: data,
			})
		}
	} catch (error) {
		return res.status(422).json({
			status: false,
			msg: error,
		});
	}
};

