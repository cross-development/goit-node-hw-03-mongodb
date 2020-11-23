//Core
const { Schema, model } = require('mongoose');

const contactSchema = new Schema({
	name: { type: String, required: true },
	email: { type: String, required: true },
	phone: { type: String, required: true },
	subscription: { type: String, required: true },
	password: { type: String, required: false },
	token: { type: String, required: false },
});

const contactModel = model('Contact', contactSchema);

module.exports = contactModel;
