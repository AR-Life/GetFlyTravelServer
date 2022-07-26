const Joi = require("joi");
const createHotel = Joi.object({
	id: Joi.allow(),
	info: Joi.object(),
	markets: Joi.array(),
	contract: Joi.object(),
	period: Joi.array(),
	room: Joi.array(),
	pricePerPerson: Joi.array(),
	accomodation: Joi.array(),
	pac: Joi.array(),
	country: Joi.array(),
	name: Joi.string(),
	companyName: Joi.string(),
	hostelType: Joi.string(),
	administration: Joi.string(),
	address: Joi.string(),
	tel: Joi.string(),
	web: Joi.string(),
	firstMail: Joi.string(),
	secondMail: Joi.string(),
});
module.exports = {
	createHotel
}