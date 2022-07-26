const Joi = require("joi");
const createRoom = Joi.object({
	id: Joi.string(),
	info: Joi.object(),
	period: Joi.array(),
	room: Joi.array(),
	pricePerPerson: Joi.array(),
	accomodation: Joi.array(),
	pac: Joi.array(),
	country: Joi.array(),
	contract: Joi.array(),
	selectedContract: Joi.array(),
});
module.exports = {
	createRoom
}