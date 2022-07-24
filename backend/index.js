require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const http = require('http');

const config = require('./config/config');
const server = express();
server.use(cors());

// set routes
server.use('/api', require('./routes'));
server.use('/api', require('./routes'));

const PORT = config.web_port;

mongoose.connect(`mongodb+srv:${config.database}`, {
	useUnifiedTopology: true,
	useNewUrlParser: true,
});

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
