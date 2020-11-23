//Core
const contactModel = require('./contacts.model');

//Read: return contacts list
async function listContacts(req, res, next) {
	try {
		const contacts = await contactModel.find();

		return await res.status(200).json(contacts);
	} catch (error) {
		next(error);
	}
}

//Read: return contact by id
async function getContactById(req, res, next) {
	const { contactId } = req.params;

	try {
		await contactModel.findById(contactId, (err, contact) =>
			!err ? res.status(200).json(contact) : res.status(404).json({ message: 'Not found' }),
		);
	} catch (error) {
		next(error);
	}
}

//Create: received contact data and return created contact with id
async function addContact(req, res, next) {
	try {
		const contact = await contactModel.create(req.body);

		return await res.status(201).json(contact);
	} catch (error) {
		next(error);
	}
}

//Delete: remove contact by id
async function removeContact(req, res, next) {
	const { contactId } = req.params;

	try {
		await contactModel.findById(contactId, (err, contact) => {
			if (err) return res.status(404).json({ message: 'Not found' });

			contact.remove();
			res.status(200).json({ message: 'contact deleted' });
		});
	} catch (error) {
		next(error);
	}
}

//Update: update contact information by id
async function updateContact(req, res, next) {
	const { contactId } = req.params;

	try {
		await contactModel.findByIdAndUpdate(contactId, req.body, (err, contact) =>
			!err ? res.status(200).json(contact) : res.status(404).json({ message: 'Not found' }),
		);
	} catch (error) {
		next(error);
	}
}

module.exports = { listContacts, addContact, removeContact, getContactById, updateContact };
