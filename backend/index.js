require('dotenv').config();

const cors = require('cors');

const express = require('express');

const mongoose = require('mongoose');

const http = require('http');

const config = require('./config/config');

const server = express();

server.use(cors());

//import nodemailer
const nodemailer = require('nodemailer');

// import admin data
const admins = require('./config/seed');

//import user Model
const userModel = require('./src/users/users.model');

// set routes
server.use('/api', require('./routes'));
server.use('/api', require('./routes'));

const PORT = config.web_port;

mongoose.connect(`mongodb+srv:${config.database}`, {
	useUnifiedTopology: true,
	useNewUrlParser: true,
});

// add admins
const addAdmins = async () => {

	//check admins are already created
	admins.forEach(async admin => {
		let user = await userModel.find({ email: admin.email });

		//check users
		if (!user[0]) {

			user = new userModel(admin);
			await user.save();

			//email handler
			var transporter = nodemailer.createTransport({
				service: 'gmail',
				auth: {
					user: 'thimiraamarakoon99@gmail.com',
					pass: 'uztixfovqeycjtvn'
				}
			});

			var mailOption = {
				from: 'thimiraamarakoon99@gmail.com',
				to: admin.email,
				subject: 'Sending Password and Link',
				html: `<h1>Sending Password and Link</h1>
					   <h3>Hi ${admin.firstName}</h3>
					   <p>Password: ${admin.password}</p>
					   <p>Login URL: http://localhost:3000/login</p>`
			};

			transporter.sendMail(mailOption, function (err, info) {
				if (err) {
					console.log(err)
				} else {
					console.log("Email Send")
				}
			})

		}
	})
};

//add admins function
addAdmins()
	.then(() => {
		console.log("Added Admins")
	})
	.catch((err) => console.log(err));

const httpServer = http.createServer(server);

// start server...
httpServer.listen(PORT, (err) => {
	if (err) {
		console.error(err);
	} else {
		console.log(`HTTP server listening on port : ${PORT}`);
	}
});

module.exports = server;
