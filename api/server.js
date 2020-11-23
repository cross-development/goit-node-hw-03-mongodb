//Core
const express = require('express');
const mongoose = require('mongoose');
//Middleware
const cors = require('cors');
require('dotenv').config();
//Routes
const contactRouter = require('./contacts/contacts.router');

class ContactsServer {
	//Initial server state
	constructor() {
		this.server = null;
	}

	//Server start
	async start() {
		this.initServer();
		this.initMiddleware();
		this.initRoutes();
		await this.initDatabase();
		this.startListening();
	}

	//Server init
	initServer() {
		this.server = express();
	}

	//Middleware init
	initMiddleware() {
		this.server.use(express.json());
		this.server.use(cors({ origin: 'http://localhost:3000' }));
	}

	//Routes init
	initRoutes() {
		this.server.use('/api/contacts', contactRouter);
	}

	//MongoDb init
	async initDatabase() {
		await mongoose.connect(process.env.MONGODB_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
	}

	//Start listening on port 2000
	startListening() {
		this.server.listen(process.env.PORT, () => {
			console.log('Server started listening on port', process.env.PORT);
		});
	}
}

module.exports = ContactsServer;
