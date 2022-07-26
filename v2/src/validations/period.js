const Joi = require("joi");
const createPeriod = Joi.object({
	id: Joi.string(),
	info: Joi.object(),
	markets: Joi.array(),
	period: Joi.array(),
	room: Joi.array(),
	pricePerPerson: Joi.array(),
	accomodationType: Joi.array(),
	pac: Joi.array(),
	country: Joi.array(),
	startDate: Joi.date(),
	endDate: Joi.date(),
	stayAndArrival: Joi.boolean(),
	minStay: Joi.number(),
	release: Joi.number(),
	hotel_id: Joi.string(),
	contract: Joi.array(),
	selectedContract: Joi.array(),
});
module.exports = {
	createPeriod
}